import { notFound } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { TrendForm } from "@/components/dashboard/TrendForm";
import { updateTrend } from "@/app/dashboard/trends/actions";

export default async function EditTrendPage(props: PageProps<"/dashboard/trends/[id]/edit">) {
  await verifySession();

  const { id: idParam } = await props.params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) notFound();

  const trend = await prisma.trendEntry.findUnique({ where: { id } });
  if (!trend) notFound();

  const boundUpdateTrend = updateTrend.bind(null, id);

  return (
    <div>
      <h1 className="mb-7 text-3xl font-semibold tracking-[-0.03em] text-white">
        Редактировать тренд
      </h1>
      <TrendForm action={boundUpdateTrend} defaultValues={trend} submitLabel="Сохранить" />
    </div>
  );
}
