"use client";

import { useCart } from "@/store/cart";
import { Button } from "../ui/button";

export const CartButton = () => {
  const cart = useCart();

  return <Button onClick={() => cart.setOpen(true)} className="cursor-pointer">Carrinho</Button>;
};
