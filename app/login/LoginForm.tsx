"use client";

import React, { useState, useTransition } from "react";
import { createBrowserClient } from "@supabase/ssr";

/** Client-side Supabase email/password sign-in. On success the session cookie
 *  is set and middleware lets the user into their role's portal.
 */
export function LoginForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    start(async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErr("Invalid email or password.");
      else window.location.href = next;
    });
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-lg border border-gft-gray100 p-6">
      <label htmlFor="login-email" className="text-xs font-semibold text-gft-black font-body block mb-1">Email</label>
      <input id="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2.5 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body mb-4" />
      <label htmlFor="login-password" className="text-xs font-semibold text-gft-black font-body block mb-1">Password</label>
      <input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2.5 text-sm rounded-sm border border-gft-gray300 outline-none focus:border-gft-black font-body mb-4" />
      <button type="submit" disabled={pending}
        className="w-full px-4 py-2.5 text-sm font-semibold rounded-sm bg-gft-red text-white disabled:opacity-60 font-body">
        {pending ? "Signing in…" : "Sign In"}
      </button>
      {err && <p role="alert" className="text-xs text-gft-error font-body mt-3">{err}</p>}
    </form>
  );
}
