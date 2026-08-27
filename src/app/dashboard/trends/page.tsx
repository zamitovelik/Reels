import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { TrendsTable } from "@/components/dashboard/TrendsTable";
import { PLATFORMS, PLATFORM_LABELS, STATUSES, STATUS_LABELS } from "@/types/trend";
import { FIELD, PRIMARY_BUTTON, SECONDARY_BUTTON } from "@/components/dashboard/ui";
import type { Prisma } from "@/generated/prisma/client";

const SORT_OPTIONS = {
  dateFound_desc: { dateFound: "desc" as const },
  dateFound_asc: { dateFound: "asc" as const },
  viewCount_desc: { viewCount: "desc" as const },
  viewCount_asc: { viewCount: "asc" as const },
};

type SortKey = keyof typeof SORT_OPTIONS;

export default async function TrendsPage(props: PageProps<"/dashboard/trends">) {
  await verifySession();

  const sp = await props.searchParams;
  const platform = typeof sp.platform === "string" ? sp.platform : undefined;
  const status = typeof sp.status === "string" ? sp.status : undefined;
  const sort: SortKey =
    typeof sp.sort === "string" && sp.sort in SORT_OPTIONS ? (sp.sort as SortKey) : "dateFound_desc";

  const where: Prisma.TrendEntryWhereInput = {
    ...(platform ? { platform } : {}),
    ...(status ? { status } : {}),
  };

  const trends = await prisma.trendEntry.findMany({
    where,
    orderBy: SORT_OPTIONS[sort],
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white">Тренды</h1>
          <p className="mt-1 text-sm text-[#86868b]">
            Найденные форматы и их статус адаптации
          </p>
        </div>
        <Link href="/dashboard/trends/new" className={PRIMARY_BUTTON}>
          Добавить тренд
        </Link>
      </div>

      <form method="get" className="mb-5 flex flex-wrap gap-3">
        <select name="platform" defaultValue={platform ?? ""} className={`${FIELD} w-auto`}>
          <option value="">Все платформы</option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {PLATFORM_LABELS[p]}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={status ?? ""} className={`${FIELD} w-auto`}>
          <option value="">Все статусы</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <select name="sort" defaultValue={sort} className={`${FIELD} w-auto`}>
          <option value="dateFound_desc">Сначала новые</option>
          <option value="dateFound_asc">Сначала старые</option>
          <option value="viewCount_desc">Просмотры: по убыванию</option>
          <option value="viewCount_asc">Просмотры: по возрастанию</option>
        </select>
        <button
          type="submit"
          className={SECONDARY_BUTTON}
        >
          Применить
        </button>
      </form>

      <TrendsTable trends={trends} />
    </div>
  );
}
