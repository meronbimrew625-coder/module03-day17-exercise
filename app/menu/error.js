"use client";

export default function MenuError({ error, reset }) {
  return (
    <main>
      <h2>Menu could not load</h2>
      <p>{error?.message || "Something went wrong while loading the menu."}</p>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
