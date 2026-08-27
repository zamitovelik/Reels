import { notFound } from "next/navigation";
import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { ReviewForm } from "@/components/dashboard/ReviewForm";
import { saveReview } from "@/app/dashboard/leads/actions";
import { PLATFORM_LABELS, type Platform } from "@/types/trend";
import { CARD, PAGE_TITLE } from "@/components/dashboard/ui";

export default async function LeadReviewPage(props: PageProps<"/dashboard/leads/[id]">) {
  await verifySession();

  const { id: idParam } = await props.params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) notFound();

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  const boundSaveReview = saveReview.bind(null, id);

  return (
    <div>
      <Link
        href="/dashboard/leads"
        className="text-sm font-bold text-[#86868b] hover:text-white"
      >
        ← Все заявки
      </Link>
      <h1 className={`${PAGE_TITLE} mt-3 mb-7`}>Разбор заявки</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className={`${CARD} h-fit p-6`}>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-[#5c5c63]">
                Клиент
              </dt>
              <dd className="mt-1 font-bold text-white">{lead.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-[#5c5c63]">
                Контакт
              </dt>
              <dd className="mt-1 font-medium text-white">{lead.contact}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-[#5c5c63]">
                Ролик
              </dt>
              <dd className="mt-1 break-all font-medium">
                {lead.videoUrl ? (
                  <a
                    href={lead.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {lead.videoUrl} ↗
                  </a>
                ) : (
                  <span className="text-[#5c5c63]">ссылка не приложена</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-[#5c5c63]">
                Площадка
              </dt>
              <dd className="mt-1 font-medium text-white">
                {lead.platform
                  ? (PLATFORM_LABELS[lead.platform as Platform] ?? lead.platform)
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-[#5c5c63]">
                Контекст от клиента
              </dt>
              <dd className="mt-1 whitespace-pre-wrap font-medium text-white">
                {lead.message || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-[#5c5c63]">
                Получено
              </dt>
              <dd className="mt-1 font-medium text-white">
                {new Date(lead.createdAt).toLocaleString("ru-RU")}
              </dd>
            </div>
          </dl>
        </div>

        <ReviewForm
          action={boundSaveReview}
          defaultValues={{ status: lead.status, feedback: lead.feedback }}
        />
      </div>
    </div>
  );
}
