import { signIn } from "../../lib/authActions";

function safeNext(value) {
  const next = String(value || "/checkout");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/checkout";
}

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const next = safeNext(params?.next);
  const error = params?.error;

  return (
    <main>
      <h2>Sign in</h2>
      <p>Demo accounts: <strong>addis-user</strong> for customer access, <strong>chef</strong> for staff access.</p>
      {error && <p>{error}</p>}
      <form action={signIn}>
        <label htmlFor="name">Account</label>
        <input id="name" name="name" required />
        <input type="hidden" name="next" value={next} />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
