import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { PAGE_TITLE } from "@/components/dashboard/ui";

export default async function LeadsPage() {
  await verifySession();

  const [leads, newCount, doneCount] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.lead.count({ where: { status: "done" } }),
  ]);

  return (
    <div>
      <div className="mb-7">
        <h1 className={PAGE_TITLE}>Заявки на разбор</h1>
        <p className="mt-2 text-sm font-medium text-[#86868b]">
          {leads.length === 0
            ? "Пока пусто"
            : `Всего ${leads.length} · новых ${newCount} · готово ${doneCount}`}
        </p>
      </div>
      <LeadsTable leads={leads} />
    </div>
  );
}
