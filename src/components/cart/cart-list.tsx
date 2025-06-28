"use client";

import { useCart } from "@/store/cart";
import { Button } from "../ui/button";
import { useProducts } from "@/store/products";
import { useEffect, useState } from "react";
import { CartProduct } from "./cart-product";
import { decimalToMoney } from "@/lib/utils.lib";
import { useAuth } from "@/store/auth";
import { apiWithAuth } from "@/lib/axios.lib";

export const CartList = () => {
  const auth = useAuth();
  const cart = useCart();
  const products = useProducts();

  const [subTotal, setSubTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(10);

  const calculateSubTotal = () => {
    let sub = 0;
    for (let item of cart.items) {
      const prod = products.products.find(
        (pItem) => pItem.id === item.productId
      );
      if (prod) sub += item.quantity * parseFloat(prod.price.toString());

      setSubTotal(sub);
    }
  };

  useEffect(calculateSubTotal, [cart]);

  const handleFinish = async () => {
    if (cart.items.length > 0) {
      const orderReq = await apiWithAuth.post("/order/new", {
        cart: cart.items,
      });

      if (orderReq.status === 201) {
        window.location.href = orderReq.data.url;
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 my-5">
        {cart.items.map((item) => (
          <CartProduct key={item.productId} data={item} />
        ))}
      </div>

      <div className="my-4 text-right">
        <div> Sub-total: {decimalToMoney(subTotal)} </div>
        <div> Frete: {decimalToMoney(shippingCost)} </div>
        <div className="font-bold">
          {" "}
          Total: {decimalToMoney(subTotal + shippingCost)}{" "}
        </div>
      </div>

      {auth.token && (
        <Button
          onClick={handleFinish}
          className="bg-green-700 hover:bg-green-900"
        >
          Finalizar compra
        </Button>
      )}

      {!auth.token && (
        <Button onClick={() => auth.setOpen(true)}>Finalizar compra</Button>
      )}
    </>
  );
};
