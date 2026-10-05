import { getSession } from "../../lib/auth";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    return <main><h2>Unauthorized</h2><p>You must be signed in.</p></main>;
  }

  if (session.role !== "staff") {
    return <main><h2>Forbidden</h2><p>Staff access is required for the kitchen.</p></main>;
  }

  return (
    <main>
      <h2>Kitchen</h2>
      <p>Server-side staff check passed for {session.name}.</p>
    </main>
  );
}
