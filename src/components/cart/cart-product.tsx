"use client";

import { decimalToMoney } from "@/lib/utils.lib";
import { useProducts } from "@/store/products";
import { CartItem } from "@/types/cart-item";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { useCart } from "@/store/cart";

type Props = {
  data: CartItem;
};

export const CartProduct = ({ data }: Props) => {
  const [quantity, setQuantity] = useState(data.quantity);

  const cart = useCart();
  const products = useProducts();
  let product = products.products.find((item) => item.id === data.productId);

  if (!product) return null;

  const handleMinusClick = () => {
    if (quantity - 1 <= 0) {
      cart.removeItem(data.productId);
    } else {
      cart.addItem({ productId: data.productId, quantity: -1 });
      setQuantity(quantity - 1);
    }
  };

  const handlePlusClick = () => {
    cart.addItem({ productId: product.id, quantity: 1 });
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-10">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="w-full"
        />
      </div>

      <div className="flex-1">
        <div>{product.name}</div>
        <div className="text-sm">{decimalToMoney(product.price)}</div>
      </div>

      <div className="flex items-center bg-secondary p-2 rounded-md">
        <Button size="sm" variant="ghost" onClick={handleMinusClick}>
          -
        </Button>
        <span className="mx-3">{quantity}</span>
        <Button size="sm" variant="ghost" onClick={handlePlusClick}>
          +
        </Button>
      </div>
    </div>
  );
};
