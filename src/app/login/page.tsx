"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="pointer-events-none absolute left-1/2 top-[-10rem] h-[26rem] w-[36rem] -translate-x-1/2 rounded-full bg-white/[0.07] blur-[120px] animate-pulse-glow" />

      <div className="relative w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="surface-hi flex h-9 w-9 items-center justify-center rounded-xl text-[11px] font-semibold text-white">
            RT
          </span>
          <span className="text-[15px] font-medium tracking-tight text-white">Reels Trends</span>
        </Link>

        <div className="surface animate-fade-up rounded-3xl p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Вход в дашборд</h1>
          <p className="mt-2 text-sm text-[#86868b]">Внутренний инструмент. Введите пароль.</p>

          <form action={formAction} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="passphrase"
                className="mb-2.5 block text-xs font-medium uppercase tracking-[0.14em] text-[#86868b]"
              >
                Пароль
              </label>
              <input
                id="passphrase"
                name="passphrase"
                type="password"
                autoFocus
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-white/25 focus:bg-white/[0.06] focus:shadow-[0_0_40px_-14px_rgba(255,255,255,0.35)]"
              />
            </div>

            {state?.error && (
              <p className="animate-fade-up rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-white px-5 py-3.5 text-sm font-medium text-[#08080a] transition-all duration-300 hover:shadow-[0_0_32px_-4px_rgba(255,255,255,0.55)] active:scale-[0.99] disabled:opacity-50"
            >
              {pending ? "Проверяем…" : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
