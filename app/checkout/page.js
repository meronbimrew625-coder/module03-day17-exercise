import CheckoutForm from "./CheckoutForm";
import { getSession } from "../../lib/auth";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const session = await getSession();

  return (
    <main>
      <h2>Checkout</h2>
      <p>Signed in as {session.name}</p>
      <CheckoutForm />
    </main>
  );
}
