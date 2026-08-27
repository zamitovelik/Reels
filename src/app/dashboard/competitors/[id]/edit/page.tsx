import { notFound } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { CompetitorForm } from "@/components/dashboard/CompetitorForm";
import { updateCompetitor } from "@/app/dashboard/competitors/actions";

export default async function EditCompetitorPage(
  props: PageProps<"/dashboard/competitors/[id]/edit">,
) {
  await verifySession();

  const { id: idParam } = await props.params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) notFound();

  const competitor = await prisma.competitor.findUnique({ where: { id } });
  if (!competitor) notFound();

  const boundUpdateCompetitor = updateCompetitor.bind(null, id);

  return (
    <div>
      <h1 className="mb-7 text-3xl font-semibold tracking-[-0.03em] text-white">
        Редактировать конкурента
      </h1>
      <CompetitorForm
        action={boundUpdateCompetitor}
        defaultValues={competitor}
        submitLabel="Сохранить"
      />
    </div>
  );
}
