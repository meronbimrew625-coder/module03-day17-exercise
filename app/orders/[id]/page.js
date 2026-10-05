import { notFound, redirect } from "next/navigation";
import { getSession } from "../../../lib/auth";
import { getOrderByIdForOwner } from "../../../lib/orders";
import OrderStatus from "./OrderStatus";

export const dynamic = "force-dynamic";

export default async function OrderStatusPage({ params }) {
  const { id } = await params;
  const session = await getSession();

  // Private pages must verify the session themselves, not rely only on middleware.
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(`/orders/${id}`)}`);
  }

  const order = getOrderByIdForOwner(id, session.sub);

  if (!order) notFound();

  return (
    <main>
      <h2>Order status</h2>
      <OrderStatus order={order} />
    </main>
  );
}
