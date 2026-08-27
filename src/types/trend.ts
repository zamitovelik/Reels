export const PLATFORMS = ["tiktok", "reels", "shorts", "other"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: "TikTok",
  reels: "Instagram Reels",
  shorts: "YouTube Shorts",
  other: "Другое",
};

export const STATUSES = ["idea", "in_progress", "adapted", "published"] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  idea: "Идея",
  in_progress: "В работе",
  adapted: "Адаптировано",
  published: "Опубликовано",
};
