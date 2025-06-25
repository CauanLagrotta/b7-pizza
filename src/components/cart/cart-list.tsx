"use client";

import { useCart } from "@/store/cart";
import { Button } from "../ui/button";
import { useProducts } from "@/store/products";
import { useEffect, useState } from "react";
import { CartProduct } from "./cart-product";
import { decimalToMoney } from "@/lib/utils.lib";

export const CartList = () => {
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
        <div className="font-bold"> Total: {decimalToMoney(subTotal + shippingCost)} </div>
      </div>

      <Button>Finalizar compra</Button>
    </>
  );
};
