import Link from "next/link";
import type { Lead } from "@/generated/prisma/client";
import { PLATFORM_LABELS, type Platform } from "@/types/trend";
import { LEAD_STATUS_LABELS, type LeadStatus } from "@/types/lead";
import { deleteLead } from "@/app/dashboard/leads/actions";
import { CARD, EMPTY_STATE, TABLE_HEAD_CELL } from "./ui";

const STATUS_TONE: Record<string, string> = {
  new: "bg-white text-[#08080a]",
  in_review: "bg-white/[0.16] text-white",
  done: "bg-white/[0.06] text-[#86868b]",
};

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className={CARD}>
        <p className={EMPTY_STATE}>Заявок на разбор пока нет.</p>
      </div>
    );
  }

  return (
    <div className={`${CARD} overflow-x-auto`}>
      <table className="w-full min-w-[860px] text-sm">
        <thead className="border-b border-white/[0.08]">
          <tr>
            <th className={TABLE_HEAD_CELL}>Клиент</th>
            <th className={TABLE_HEAD_CELL}>Ролик</th>
            <th className={TABLE_HEAD_CELL}>Площадка</th>
            <th className={TABLE_HEAD_CELL}>Статус</th>
            <th className={TABLE_HEAD_CELL}>Дата</th>
            <th className={TABLE_HEAD_CELL} />
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-white/[0.05] last:border-0">
              <td className="px-4 py-4">
                <p className="font-medium text-white">{lead.name}</p>
                <p className="mt-0.5 text-xs text-[#5c5c63]">{lead.contact}</p>
              </td>
              <td className="px-4 py-4">
                {lead.videoUrl ? (
                  <a
                    href={lead.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {hostOf(lead.videoUrl)} ↗
                  </a>
                ) : (
                  <span className="text-[#5c5c63]">без ссылки</span>
                )}
              </td>
              <td className="px-4 py-4 text-[#86868b]">
                {lead.platform
                  ? (PLATFORM_LABELS[lead.platform as Platform] ?? lead.platform)
                  : "—"}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`rounded-full border border-white/[0.12] px-2.5 py-1 text-xs font-medium ${
                    STATUS_TONE[lead.status] ?? "bg-white/[0.06] text-[#86868b]"
                  }`}
                >
                  {LEAD_STATUS_LABELS[lead.status as LeadStatus] ?? lead.status}
                </span>
              </td>
              <td className="px-4 py-4 text-[#5c5c63]">
                {new Date(lead.createdAt).toLocaleDateString("ru-RU")}
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/dashboard/leads/${lead.id}`}
                    className="font-medium text-[#86868b] transition-colors hover:text-white"
                  >
                    Разбор
                  </Link>
                  <form action={deleteLead}>
                    <input type="hidden" name="id" value={lead.id} />
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
