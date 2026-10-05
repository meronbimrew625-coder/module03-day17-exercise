"use client";

import { createContext, useState } from "react";

export const CartContext = createContext(null);

export default function Providers({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
