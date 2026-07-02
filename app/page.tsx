"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";

export default function Home() {
  const isConfigured = hasSupabaseConfig();
  const supabase = useMemo(() => (isConfigured ? createClient() : null), [isConfigured]);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setMessage("Add Supabase environment variables to enable auth.");
      return;
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, [supabase]);

  async function sendMagicLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setMessage("Supabase is not configured yet.");
      return;
    }

    setBusy(true);
    setMessage("Sending sign-in link...");

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    setBusy(false);
    setMessage(error ? error.message : "Check your email for the sign-in link.");
  }

  async function signOut() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signOut();
    setBusy(false);
    setMessage(error ? error.message : "You are signed out.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Hello v0
        </p>

        {session?.user ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">You are signed in.</h1>
              <p className="mt-3 break-all text-zinc-600 dark:text-zinc-400">{session.user.email}</p>
            </div>
            <button
              type="button"
              onClick={signOut}
              disabled={busy}
              className="h-12 w-full rounded-full bg-zinc-950 px-5 font-medium text-white disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950"
            >
              {busy ? "Working..." : "Sign out"}
            </button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={sendMagicLink}>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                Enter your email and Supabase will send you a magic sign-in link.
              </p>
            </div>

            <label className="block space-y-2 text-sm font-medium">
              <span>Email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-base outline-none dark:border-zinc-800 dark:bg-black"
              />
            </label>

            <button
              type="submit"
              disabled={busy || !isConfigured}
              className="h-12 w-full rounded-full bg-zinc-950 px-5 font-medium text-white disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950"
            >
              {busy ? "Sending..." : "Send sign-in link"}
            </button>
          </form>
        )}

        {message ? <p className="mt-6 rounded-2xl bg-zinc-100 px-4 py-3 text-sm dark:bg-zinc-900">{message}</p> : null}
      </section>
    </main>
  );
}
