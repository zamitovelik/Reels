export const LEAD_STATUSES = ["new", "in_review", "done"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Новая",
  in_review: "В разборе",
  done: "Разбор готов",
};
