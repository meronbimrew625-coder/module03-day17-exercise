"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  getAccountForSignIn,
  SESSION_MAX_AGE,
} from "./auth";

function safeNext(value) {
  const next = String(value || "/checkout");

  if (!next.startsWith("/") || next.startsWith("//")) {
    return "/checkout";
  }

  return next;
}

export async function signIn(formData) {
  const name = String(formData.get("name") || "").trim();
  const next = safeNext(formData.get("next"));
  const account = getAccountForSignIn(name);

  if (!account) {
    redirect(`/login?error=Unknown%20demo%20account&next=${encodeURIComponent(next)}`);
  }

  const token = createSessionToken(account);
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  redirect(next);
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
