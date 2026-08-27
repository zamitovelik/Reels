"use client";

import { useActionState } from "react";
import { PLATFORMS, PLATFORM_LABELS, STATUSES, STATUS_LABELS } from "@/types/trend";
import { FIELD, LABEL, PRIMARY_BUTTON } from "./ui";
import type { TrendFormState } from "@/app/dashboard/trends/actions";

const initialState: TrendFormState = {};

interface TrendFormProps {
  action: (state: TrendFormState, formData: FormData) => Promise<TrendFormState>;
  defaultValues?: {
    sourceUrl: string;
    platform: string;
    niche: string;
    title: string;
    viewCount: number | null;
    likeCount: number | null;
    commentCount: number | null;
    shareCount: number | null;
    status: string;
    notes: string | null;
    adaptationIdea: string | null;
  };
  submitLabel: string;
}

export function TrendForm({ action, defaultValues, submitLabel }: TrendFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div>
        <label htmlFor="sourceUrl" className={LABEL}>
          Ссылка на видео
        </label>
        <input
          id="sourceUrl"
          name="sourceUrl"
          defaultValue={defaultValues?.sourceUrl}
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
          <label htmlFor="status" className={LABEL}>
            Статус
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues?.status ?? STATUSES[0]}
            className={FIELD}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
        <div>
          <label htmlFor="title" className={LABEL}>
            Название / описание
          </label>
          <input
            id="title"
            name="title"
            defaultValue={defaultValues?.title}
            className={FIELD}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {(
          [
            ["viewCount", "Просмотры", defaultValues?.viewCount],
            ["likeCount", "Лайки", defaultValues?.likeCount],
            ["commentCount", "Комментарии", defaultValues?.commentCount],
            ["shareCount", "Репосты", defaultValues?.shareCount],
          ] as const
        ).map(([name, label, value]) => (
          <div key={name}>
            <label htmlFor={name} className={LABEL}>
              {label}
            </label>
            <input
              id={name}
              name={name}
              type="number"
              min={0}
              defaultValue={value ?? undefined}
              className={FIELD}
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="adaptationIdea" className={LABEL}>
          Идея адаптации под RU
        </label>
        <textarea
          id="adaptationIdea"
          name="adaptationIdea"
          rows={3}
          defaultValue={defaultValues?.adaptationIdea ?? undefined}
          className={`${FIELD} resize-none`}
        />
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
