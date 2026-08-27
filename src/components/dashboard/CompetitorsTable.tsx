import Link from "next/link";
import type { Competitor } from "@/generated/prisma/client";
import { PLATFORM_LABELS, type Platform } from "@/types/trend";
import { REGION_LABELS, type Region } from "@/types/competitor";
import { deleteCompetitor } from "@/app/dashboard/competitors/actions";
import { CARD, EMPTY_STATE, TABLE_HEAD_CELL } from "./ui";

const REGION_TONE: Record<string, string> = {
  us: "bg-white/[0.14] text-white",
  ru: "bg-white text-[#08080a]",
};

function formatCount(value: number | null) {
  return value !== null ? value.toLocaleString("ru-RU") : "—";
}

export function CompetitorsTable({ competitors }: { competitors: Competitor[] }) {
  if (competitors.length === 0) {
    return (
      <div className={CARD}>
        <p className={EMPTY_STATE}>
          Пока нет ни одного конкурента. Добавьте первый аккаунт для отслеживания.
        </p>
      </div>
    );
  }

  return (
    <div className={`${CARD} overflow-x-auto`}>
      <table className="w-full min-w-[820px] text-sm">
        <thead className="border-b border-white/[0.08]">
          <tr>
            <th className={TABLE_HEAD_CELL}>Аккаунт</th>
            <th className={TABLE_HEAD_CELL}>Платформа</th>
            <th className={TABLE_HEAD_CELL}>Рынок</th>
            <th className={TABLE_HEAD_CELL}>Подписчики</th>
            <th className={TABLE_HEAD_CELL}>Ср. просмотры</th>
            <th className={TABLE_HEAD_CELL} />
          </tr>
        </thead>
        <tbody>
          {competitors.map((competitor) => (
            <tr key={competitor.id} className="border-b border-white/[0.05] last:border-0">
              <td className="px-4 py-3.5">
                <a
                  href={competitor.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white"
                >
                  {competitor.name}
                </a>
                <p className="mt-0.5 text-xs text-[#5c5c63]">{competitor.niche}</p>
              </td>
              <td className="px-4 py-3.5 text-[#86868b]">
                {PLATFORM_LABELS[competitor.platform as Platform] ?? competitor.platform}
              </td>
              <td className="px-4 py-3.5">
                <span
                  className={`rounded-full border border-white/[0.12] px-2.5 py-1 text-xs font-medium ${
                    REGION_TONE[competitor.region] ?? "bg-white/[0.06] text-[#86868b]"
                  }`}
                >
                  {REGION_LABELS[competitor.region as Region] ?? competitor.region}
                </span>
              </td>
              <td className="px-4 py-3.5 tabular-nums text-[#86868b]">
                {formatCount(competitor.followers)}
              </td>
              <td className="px-4 py-3.5 tabular-nums text-[#86868b]">
                {formatCount(competitor.avgViews)}
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/dashboard/competitors/${competitor.id}/edit`}
                    className="font-medium text-[#86868b] transition-colors hover:text-white"
                  >
                    Изменить
                  </Link>
                  <form action={deleteCompetitor}>
                    <input type="hidden" name="id" value={competitor.id} />
                    <button type="submit" className="font-medium text-red-400/80 transition-colors hover:text-red-300">
                      Удалить
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
