import { getSession } from "../../../../lib/auth";
import { getOrderByIdForOwner } from "../../../../lib/orders";

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) return Response.json({ error: { code: "UNAUTHORIZED", message: "Sign in required." } }, { status: 401 });

  const { id } = await params;
  const order = getOrderByIdForOwner(id, session.sub);

  if (!order) {
    return Response.json({ error: { code: "ORDER_NOT_FOUND", message: "Order not found." } }, { status: 404 });
  }

  return Response.json(order);
}
