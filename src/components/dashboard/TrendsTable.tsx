import Link from "next/link";
import type { TrendEntry } from "@/generated/prisma/client";
import { PLATFORM_LABELS, STATUS_LABELS, type Platform, type Status } from "@/types/trend";
import { deleteTrend } from "@/app/dashboard/trends/actions";
import { CARD, EMPTY_STATE, TABLE_HEAD_CELL } from "./ui";

const STATUS_TONE: Record<string, string> = {
  idea: "bg-white/[0.06] text-[#86868b]",
  in_progress: "bg-white/[0.14] text-white",
  adapted: "bg-white/[0.28] text-white",
  published: "bg-white text-[#08080a]",
};

export function TrendsTable({ trends }: { trends: TrendEntry[] }) {
  if (trends.length === 0) {
    return (
      <div className={CARD}>
        <p className={EMPTY_STATE}>Пока нет ни одного тренда. Добавьте первый.</p>
      </div>
    );
  }

  return (
    <div className={`${CARD} overflow-x-auto`}>
      <table className="w-full min-w-[840px] text-sm">
        <thead className="border-b border-white/[0.08]">
          <tr>
            <th className={TABLE_HEAD_CELL}>Ниша</th>
            <th className={TABLE_HEAD_CELL}>Платформа</th>
            <th className={TABLE_HEAD_CELL}>Просмотры</th>
            <th className={TABLE_HEAD_CELL}>Статус</th>
            <th className={TABLE_HEAD_CELL}>Найдено</th>
            <th className={TABLE_HEAD_CELL} />
          </tr>
        </thead>
        <tbody>
          {trends.map((trend) => (
            <tr key={trend.id} className="border-b border-white/[0.05] last:border-0">
              <td className="px-4 py-3.5">
                <a
                  href={trend.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white"
                >
                  {trend.niche}
                </a>
                <p className="mt-0.5 max-w-xs truncate text-xs text-[#5c5c63]">{trend.title}</p>
              </td>
              <td className="px-4 py-3.5 text-[#86868b]">
                {PLATFORM_LABELS[trend.platform as Platform] ?? trend.platform}
              </td>
              <td className="px-4 py-3.5 tabular-nums text-[#86868b]">
                {trend.viewCount !== null ? trend.viewCount.toLocaleString("ru-RU") : "—"}
              </td>
              <td className="px-4 py-3.5">
                <span
                  className={`rounded-full border border-white/[0.12] px-2.5 py-1 text-xs font-medium ${
                    STATUS_TONE[trend.status] ?? "bg-white/[0.06] text-[#86868b]"
                  }`}
                >
                  {STATUS_LABELS[trend.status as Status] ?? trend.status}
                </span>
              </td>
              <td className="px-4 py-3.5 text-[#5c5c63]">
                {new Date(trend.dateFound).toLocaleDateString("ru-RU")}
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/dashboard/trends/${trend.id}/edit`}
                    className="font-medium text-[#86868b] transition-colors hover:text-white"
                  >
                    Изменить
                  </Link>
                  <form action={deleteTrend}>
                    <input type="hidden" name="id" value={trend.id} />
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
