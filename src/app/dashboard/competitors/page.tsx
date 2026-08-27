import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { CompetitorsTable } from "@/components/dashboard/CompetitorsTable";
import { PLATFORMS, PLATFORM_LABELS } from "@/types/trend";
import { REGIONS, REGION_LABELS } from "@/types/competitor";
import { FIELD, PRIMARY_BUTTON, SECONDARY_BUTTON } from "@/components/dashboard/ui";
import type { Prisma } from "@/generated/prisma/client";

export default async function CompetitorsPage(props: PageProps<"/dashboard/competitors">) {
  await verifySession();

  const sp = await props.searchParams;
  const platform = typeof sp.platform === "string" ? sp.platform : undefined;
  const region = typeof sp.region === "string" ? sp.region : undefined;

  const where: Prisma.CompetitorWhereInput = {
    ...(platform ? { platform } : {}),
    ...(region ? { region } : {}),
  };

  const [competitors, usCount, ruCount] = await Promise.all([
    prisma.competitor.findMany({ where, orderBy: { followers: "desc" } }),
    prisma.competitor.count({ where: { region: "us" } }),
    prisma.competitor.count({ where: { region: "ru" } }),
  ]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white">Конкуренты</h1>
          <p className="mt-1 text-sm text-[#86868b]">
            Аккаунты, за которыми следим: {usCount} в США · {ruCount} в RU
          </p>
        </div>
        <Link href="/dashboard/competitors/new" className={PRIMARY_BUTTON}>
          Добавить конкурента
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
        <select name="region" defaultValue={region ?? ""} className={`${FIELD} w-auto`}>
          <option value="">Все рынки</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {REGION_LABELS[r]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className={SECONDARY_BUTTON}
        >
          Применить
        </button>
      </form>

      <CompetitorsTable competitors={competitors} />
    </div>
  );
}
