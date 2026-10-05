"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../../components/Providers";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link href="/menu">Browse the menu</Link>
        </>
      ) : (
        <>
          {cart.map((item) => (
            <article className="dish-card" key={item.id}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <button type="button" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </article>
          ))}
          <p>
            <Link href="/checkout">Continue to checkout</Link>
          </p>
        </>
      )}
    </main>
  );
}
