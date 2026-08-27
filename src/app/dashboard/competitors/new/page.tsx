import { verifySession } from "@/lib/dal";
import { CompetitorForm } from "@/components/dashboard/CompetitorForm";
import { createCompetitor } from "@/app/dashboard/competitors/actions";

export default async function NewCompetitorPage() {
  await verifySession();

  return (
    <div>
      <h1 className="mb-7 text-3xl font-semibold tracking-[-0.03em] text-white">
        Новый конкурент
      </h1>
      <CompetitorForm action={createCompetitor} submitLabel="Добавить" />
    </div>
  );
}
