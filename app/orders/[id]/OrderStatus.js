"use client";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

export default function OrderStatus({ order }) {
  const { data, error, isValidating } = useSWR(
    `/api/orders/${order.id}`,
    fetcher,
    {
      fallbackData: order,
      refreshInterval: 5000,
    }
  );

  const currentOrder = data || order;

  return (
    <article className="dish-card">
      <h3>Order {currentOrder.id}</h3>
      <p>Status: {currentOrder.status}</p>
      <p>Name: {currentOrder.name}</p>
      <p>Phone: {currentOrder.phone}</p>
      {error && <p>Could not refresh the order status.</p>}
      {isValidating && <p>Checking for an updated status...</p>}
    </article>
  );
}
