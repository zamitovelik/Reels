"use client";

import { useActionState } from "react";
import { LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/types/lead";
import { CARD, FIELD, LABEL, PRIMARY_BUTTON } from "./ui";
import type { LeadReviewState } from "@/app/dashboard/leads/actions";

const initialState: LeadReviewState = {};

interface ReviewFormProps {
  action: (state: LeadReviewState, formData: FormData) => Promise<LeadReviewState>;
  defaultValues: { status: string; feedback: string | null };
}

export function ReviewForm({ action, defaultValues }: ReviewFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className={`${CARD} space-y-5 p-6`}>
      <div>
        <label htmlFor="status" className={LABEL}>
          Статус
        </label>
        <select id="status" name="status" defaultValue={defaultValues.status} className={FIELD}>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="feedback" className={LABEL}>
          Текст разбора
        </label>
        <textarea
          id="feedback"
          name="feedback"
          rows={16}
          defaultValue={defaultValues.feedback ?? undefined}
          placeholder="Крючок: ...&#10;Темп: ...&#10;Звук: ...&#10;&#10;Что делать:&#10;1. ...&#10;2. ..."
          className={`${FIELD} resize-y font-normal`}
        />
        <p className="mt-2 text-xs text-[#86868b]">
          Пока заполняется вручную. Позже сюда будет писать ИИ-агент, а вы —
          проверять перед отправкой клиенту.
        </p>
      </div>

      {state?.error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className={PRIMARY_BUTTON}>
        {pending ? "Сохраняем…" : "Сохранить разбор"}
      </button>
    </form>
  );
}
