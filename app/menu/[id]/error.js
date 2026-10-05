"use client";

export default function DishError({ reset }) {
  return (
    <main>
      <h2>Dish could not load</h2>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
