import Link from "next/link";
import CancelOrderButton from "./CancelOrderButton";

export default function OrderList({ initialOrders }) {
  if (initialOrders.length === 0) return <p>No orders yet.</p>;

  return (
    <div>
      {initialOrders.map((order) => (
        <article className="dish-card" key={order.id}>
          <h3>Order {order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Name: {order.name}</p>
          <p>Phone: {order.phone}</p>
          <div className="dish-actions">
            <Link href={`/orders/${order.id}`}>Track status</Link>
            {order.status !== "cancelled" && <CancelOrderButton orderId={order.id} />}
          </div>
        </article>
      ))}
    </div>
  );
}
