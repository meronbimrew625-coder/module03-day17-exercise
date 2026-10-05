import { redirect } from "next/navigation";
import OrderList from "./OrderList";
import { getSession } from "../../lib/auth";
import { listOrders } from "../../lib/orders";

export const revalidate = 60;

export default async function OrdersPage() {
  const session = await getSession();

  // Middleware is the first layer, but the page verifies the session again while rendering.
  if (!session) {
    redirect("/login?next=/orders");
  }

  const orders = listOrders(session.sub);

  return (
    <main>
      <h2>Orders</h2>
      <p>Orders for {session.name} only.</p>
      <OrderList initialOrders={orders} />
    </main>
  );
}
