export const REGIONS = ["us", "ru"] as const;
export type Region = (typeof REGIONS)[number];

export const REGION_LABELS: Record<Region, string> = {
  us: "США / EN",
  ru: "Россия / RU",
};
