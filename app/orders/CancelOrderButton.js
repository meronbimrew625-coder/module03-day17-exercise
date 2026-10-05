"use client";

import { useState } from "react";
import { cancelOrder } from "../../lib/orderActions";

export default function CancelOrderButton({ orderId }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleCancel() {
    setPending(true);
    const result = await cancelOrder(orderId);
    setMessage(result.status === 200 ? "Cancelled." : result.error);
    setPending(false);
  }

  return (
    <div>
      <button type="button" onClick={handleCancel} disabled={pending}>
        {pending ? "Cancelling..." : "Cancel order"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
