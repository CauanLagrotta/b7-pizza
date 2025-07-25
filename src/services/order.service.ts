import { prisma } from "@/lib/prisma.lib";
import { CartItem } from "@/types/cart-item";

export const createNewOrder = async (userId: number, cart: CartItem[]) => {
  const orderProduct = [];
  let subtotal = 0;

  for (let item of cart) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    if (product) {
      orderProduct.push({
        productId: product.id,
        price: parseFloat(product.price.toString()),
        quantity: item.quantity,
      });
      subtotal += item.quantity * parseFloat(product.price.toString());
    }
  }

  const newOrder = await prisma.order.create({
    data: {
      userId,
      subtotal,
      orderProducts: {
        createMany: {
          data: orderProduct,
        },
      },
    },
    include: {
      orderProducts: {
        select: {
          quantity: true,
          product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });

  return newOrder;
};
