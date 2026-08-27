import type { Platform } from "@/types/trend";

// Определяем площадку по ссылке, чтобы клиенту не приходилось выбирать её руками.
// Возвращаем null, если ссылка непохожа ни на одну из известных площадок —
// разбор всё равно принимаем, просто без метки платформы.
export function detectPlatform(url: string): Platform | null {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }

  if (host === "tiktok.com" || host.endsWith(".tiktok.com")) return "tiktok";
  if (host === "instagram.com" || host.endsWith(".instagram.com")) return "reels";
  if (host === "youtube.com" || host.endsWith(".youtube.com") || host === "youtu.be") {
    return "shorts";
  }
  return null;
}
