"use client";

import { useContext } from "react";
import { CartContext } from "../../components/Providers";

export default function AddToCartButton({ dish }) {
  const { setCart } = useContext(CartContext);

  function addToCart() {
    setCart((current) => {
      const existing = current.find((item) => item.id === dish.id);

      if (existing) {
        return current.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...dish, quantity: 1 }];
    });
  }

  return (
    <button type="button" onClick={addToCart}>
      Add to cart
    </button>
  );
}
