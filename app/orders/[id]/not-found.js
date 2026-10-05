import Link from "next/link";

export default function OrderNotFound() {
  return (
    <main>
      <h2>Order not found</h2>
      <Link href="/orders">Back to orders</Link>
    </main>
  );
}
