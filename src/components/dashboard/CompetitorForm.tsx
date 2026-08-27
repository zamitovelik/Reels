"use client";

import { useActionState } from "react";
import { PLATFORMS, PLATFORM_LABELS } from "@/types/trend";
import { REGIONS, REGION_LABELS } from "@/types/competitor";
import { FIELD, LABEL, PRIMARY_BUTTON } from "./ui";
import type { CompetitorFormState } from "@/app/dashboard/competitors/actions";

const initialState: CompetitorFormState = {};

interface CompetitorFormProps {
  action: (state: CompetitorFormState, formData: FormData) => Promise<CompetitorFormState>;
  defaultValues?: {
    name: string;
    profileUrl: string;
    platform: string;
    niche: string;
    region: string;
    followers: number | null;
    avgViews: number | null;
    notes: string | null;
  };
  submitLabel: string;
}

export function CompetitorForm({ action, defaultValues, submitLabel }: CompetitorFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Название / @аккаунт
          </label>
          <input
            id="name"
            name="name"
            defaultValue={defaultValues?.name}
            placeholder="@cleanwithme"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="niche" className={LABEL}>
            Ниша
          </label>
          <input
            id="niche"
            name="niche"
            defaultValue={defaultValues?.niche}
            placeholder="ASMR-уборка"
            className={FIELD}
          />
        </div>
      </div>

      <div>
        <label htmlFor="profileUrl" className={LABEL}>
          Ссылка на профиль
        </label>
        <input
          id="profileUrl"
          name="profileUrl"
          defaultValue={defaultValues?.profileUrl}
          placeholder="https://www.tiktok.com/@..."
          className={FIELD}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="platform" className={LABEL}>
            Платформа
          </label>
          <select
            id="platform"
            name="platform"
            defaultValue={defaultValues?.platform ?? PLATFORMS[0]}
            className={FIELD}
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {PLATFORM_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="region" className={LABEL}>
            Рынок
          </label>
          <select
            id="region"
            name="region"
            defaultValue={defaultValues?.region ?? REGIONS[0]}
            className={FIELD}
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {REGION_LABELS[r]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="followers" className={LABEL}>
            Подписчики
          </label>
          <input
            id="followers"
            name="followers"
            type="number"
            min={0}
            defaultValue={defaultValues?.followers ?? undefined}
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="avgViews" className={LABEL}>
            Средние просмотры
          </label>
          <input
            id="avgViews"
            name="avgViews"
            type="number"
            min={0}
            defaultValue={defaultValues?.avgViews ?? undefined}
            className={FIELD}
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={LABEL}>
          Заметки
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues?.notes ?? undefined}
          placeholder="Что у них работает, что можно забрать"
          className={`${FIELD} resize-none`}
        />
      </div>

      {state?.error && (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className={PRIMARY_BUTTON}>
        {pending ? "Сохранение…" : submitLabel}
      </button>
    </form>
  );
}
