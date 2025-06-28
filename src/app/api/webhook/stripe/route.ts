import { prisma } from "@/lib/prisma.lib";
import { stripe } from "@/lib/stripe.lib";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const headersList = await headers();
  const stripeSignature = headersList.get("stripe-signature");
  const rawBody = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      stripeSignature!,
      process.env.STRIPE_WEBHOOK_KEY!
    );

    const eventTypes = [
      "checkout.session.completed",
      "checkout.session.async_payment_succeeded",
    ];

    if (eventTypes.includes(event.type)) {
      const { metadata, payment_status } = event.data.object as any;

      if (payment_status === "paid") {
        const orderId = parseInt(metadata.order_id);

        const { order_id } = metadata;

        if (order_id) {
          const order = await prisma.order.findUnique({
            where: { id: orderId },
          });

          if (order) {
            await prisma.order.update({
              where: { id: orderId },
              data: { status: "PAID" },
            });
          }
        }
      }
    }
  } catch (err: any) {
    return NextResponse.json({}, { status: 400 });
  }

  return NextResponse.json({});
}
