"use client";

import { useActionState } from "react";
import { placeOrder } from "../../lib/orderActions";

const initialState = {
  status: null,
  fieldErrors: {},
  message: "",
  order: null,
};

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(
    placeOrder,
    initialState
  );

  const errors = state?.fieldErrors || {};

  return (
    <form action={formAction} noValidate>
      <div>
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" />
        {errors.phone && <p>{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="address">Delivery Address</label>
        <textarea id="address" name="address" rows="5" />
        {errors.address && <p>{errors.address}</p>}
      </div>

      {state?.message && <p>{state.message}</p>}

      {state?.status === 201 && state.order && (
        <p>Order ID: {state.order.id}</p>
      )}

      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Place Order"}
      </button>
    </form>
  );
}
