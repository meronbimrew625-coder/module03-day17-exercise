import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h2>Welcome to Addis Eats</h2>
      <p>Explore Ethiopian dishes, add them to your cart, and place an order.</p>
      <p>
        <Link href="/menu">View menu</Link>
      </p>
      <p>
        <Link href="/orders">View orders</Link>
      </p>
    </main>
  );
}
