"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [active, setActive] = useState("all");

  return (
    <div className="filter-shell">
      <div className="filter-controls">
        <button onClick={() => setActive("all")}>All</button>
        <button onClick={() => setActive("main")}>Main Dishes</button>
        <button onClick={() => setActive("drinks")}>Drinks</button>
      </div>
      {children}
    </div>
  );
}
