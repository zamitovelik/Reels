import { verifySession } from "@/lib/dal";
import { TrendForm } from "@/components/dashboard/TrendForm";
import { createTrend } from "@/app/dashboard/trends/actions";

export default async function NewTrendPage() {
  await verifySession();

  return (
    <div>
      <h1 className="mb-7 text-3xl font-semibold tracking-[-0.03em] text-white">Новый тренд</h1>
      <TrendForm action={createTrend} submitLabel="Добавить" />
    </div>
  );
}
