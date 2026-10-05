import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const accounts = {
  "addis-user": { id: "addis-user", role: "customer", name: "Addis User" },
  chef: { id: "chef", role: "staff", name: "Kitchen Staff" },
};

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is required.");
  }
  return secret;
}

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function sign(value) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createSessionToken(account) {
  const payload = encode({
    sid: randomUUID(),
    sub: account.id,
    role: account.role,
    name: account.name,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  });

  return `${payload}.${sign(payload)}`;
}

export function getAccountForSignIn(name) {
  const normalized = String(name || "").trim().toLowerCase();
  return accounts[normalized] || null;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));

    if (!session.sub || !session.sid || !session.role || !session.exp) {
      return null;
    }

    if (session.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get("session")?.value);
}

export { SESSION_MAX_AGE };
