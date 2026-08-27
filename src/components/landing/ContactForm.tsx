"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitLead, type LeadFormState } from "@/app/actions";

const initialState: LeadFormState = {};

const FIELD =
  "w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-3.5 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-[#5c5c63] focus:border-white/25 focus:bg-white/[0.06] focus:shadow-[0_0_40px_-14px_rgba(255,255,255,0.35)]";

const LABEL = "mb-2.5 block text-xs font-medium uppercase tracking-[0.14em] text-[#86868b]";

export function ContactForm({ defaultVideoUrl }: { defaultVideoUrl?: string }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state?.success) {
    return (
      <div className="surface-hi glow-soft animate-fade-up rounded-3xl p-12 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl text-[#08080a]">
          ✓
        </span>
        <h2 className="mt-7 text-3xl font-semibold tracking-tight text-white">Приняли</h2>
        <p className="mt-3 text-[#86868b]">
          Разбор пришлём на указанный контакт в течение суток.
        </p>
        <Link
          href="/"
          className="surface mt-9 inline-block rounded-full px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/25"
        >
          На главную
        </Link>
      </div>
    );
  }

  return (
    <div className="surface rounded-3xl p-7 sm:p-9">
      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="videoUrl" className={LABEL}>
            Ссылка на видео
          </label>
          <input
            id="videoUrl"
            name="videoUrl"
            type="url"
            defaultValue={defaultVideoUrl}
            placeholder="https://www.tiktok.com/@user/video/..."
            className={FIELD}
          />
          <p className="mt-2.5 text-xs text-[#5c5c63]">
            TikTok, Reels или Shorts. Площадку определим сами.
          </p>
        </div>

        <div>
          <label htmlFor="name" className={LABEL}>
            Как вас зовут
          </label>
          <input id="name" name="name" placeholder="Иван" className={FIELD} />
        </div>

        <div>
          <label htmlFor="contact" className={LABEL}>
            Куда прислать разбор
          </label>
          <input
            id="contact"
            name="contact"
            placeholder="email, телефон или @телеграм"
            className={FIELD}
          />
        </div>

        <div>
          <label htmlFor="message" className={LABEL}>
            Контекст <span className="normal-case tracking-normal text-[#5c5c63]">— необязательно</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Ниша, что уже пробовали, какая была цель у ролика"
            className={`${FIELD} resize-none`}
          />
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Компания</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        {state?.error && (
          <p className="animate-fade-up rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3.5 text-sm text-red-300">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-white px-6 py-4 text-[15px] font-medium text-[#08080a] transition-all duration-300 hover:shadow-[0_0_36px_-6px_rgba(255,255,255,0.6)] active:scale-[0.99] disabled:opacity-50"
        >
          {pending ? "Отправляем…" : "Получить разбор"}
        </button>

        <p className="text-center text-xs text-[#5c5c63]">
          Первый разбор бесплатный · ответ в течение 24 часов
        </p>
      </form>
    </div>
  );
}
