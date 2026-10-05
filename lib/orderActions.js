"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import { createOrder, cancelOrderById, getOrderByIdForOwner } from "./orders";
import { validateOrder } from "./orderSchema";

function formDataToValues(formData) {
  return {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  };
}

export async function placeOrder(previousState, formData) {
  const session = await getSession();

  if (!session) {
    return { status: 401, fieldErrors: {}, message: "Please sign in first.", order: null };
  }

  const validation = validateOrder(formDataToValues(formData));

  if (!validation.valid) {
    return {
      status: 422,
      fieldErrors: validation.fieldErrors,
      message: "Please correct the highlighted fields.",
      order: null,
    };
  }

  const order = createOrder({ ownerId: session.sub, values: validation.values });
  revalidatePath("/orders");
  revalidatePath("/checkout");

  return { status: 201, fieldErrors: {}, message: "Order submitted successfully.", order };
}

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) return { status: 401, error: "You must be signed in to cancel an order." };

  const order = getOrderByIdForOwner(orderId, session.sub);
  if (!order) return { status: 404, error: "Order not found." };

  const cancelledOrder = cancelOrderById(orderId);
  revalidatePath("/orders");
  return { status: 200, order: cancelledOrder };
}
