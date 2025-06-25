"use client";

import { Button } from "../ui/button";
import { useCart } from "@/store/cart";

export const CartEmpty = () => {
  const { setOpen } = useCart();

  return (
    <div className="my-10 text-center">
      <p className="mb-4">Carrinho vazio.</p>

      <Button onClick={() => setOpen(false)}>Fechar</Button>
    </div>
  );
};
