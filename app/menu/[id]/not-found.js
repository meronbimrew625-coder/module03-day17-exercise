import Link from "next/link";

export default function DishNotFound() {
  return (
    <main>
      <h2>Dish not found</h2>
      <p>The requested dish does not exist.</p>
      <Link href="/menu">Back to menu</Link>
    </main>
  );
}
