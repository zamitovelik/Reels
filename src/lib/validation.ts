import * as z from "zod";
import { PLATFORMS, STATUSES } from "@/types/trend";
import { REGIONS } from "@/types/competitor";
import { LEAD_STATUSES } from "@/types/lead";

// Empty form field -> null (not tracked), rather than zod's coerce.number()
// silently turning "" into 0.
const optionalCount = z
  .string()
  .optional()
  .transform((val, ctx) => {
    if (!val || val.trim() === "") return null;
    const n = Number(val);
    if (!Number.isInteger(n) || n < 0) {
      ctx.addIssue({ code: "custom", message: "Должно быть целым неотрицательным числом." });
      return z.NEVER;
    }
    return n;
  });

export const TrendFormSchema = z.object({
  sourceUrl: z.url({ error: "Введите корректную ссылку." }),
  platform: z.enum(PLATFORMS, { error: "Выберите платформу." }),
  niche: z.string().trim().min(1, { error: "Укажите нишу." }),
  title: z.string().trim().min(1, { error: "Укажите название/описание." }),
  viewCount: optionalCount,
  likeCount: optionalCount,
  commentCount: optionalCount,
  shareCount: optionalCount,
  status: z.enum(STATUSES),
  notes: z.string().trim().optional(),
  adaptationIdea: z.string().trim().optional(),
});

export const CompetitorFormSchema = z.object({
  name: z.string().trim().min(1, { error: "Укажите название аккаунта." }),
  profileUrl: z.url({ error: "Введите корректную ссылку на профиль." }),
  platform: z.enum(PLATFORMS, { error: "Выберите платформу." }),
  niche: z.string().trim().min(1, { error: "Укажите нишу." }),
  region: z.enum(REGIONS, { error: "Выберите рынок." }),
  followers: optionalCount,
  avgViews: optionalCount,
  notes: z.string().trim().optional(),
});

export const LeadFormSchema = z.object({
  name: z.string().trim().min(1, { error: "Укажите имя." }),
  contact: z.string().trim().min(1, { error: "Укажите контакт (email, телефон или @телеграм)." }),
  // Ссылку на ролик принимаем и пустой — заявка без неё тоже валидна.
  videoUrl: z
    .string()
    .trim()
    .optional()
    .transform((val, ctx) => {
      if (!val) return null;
      const parsed = z.url().safeParse(val);
      if (!parsed.success) {
        ctx.addIssue({ code: "custom", message: "Ссылка на видео выглядит некорректно." });
        return z.NEVER;
      }
      return parsed.data;
    }),
  message: z.string().trim().optional(),
  // Honeypot: real visitors never fill this hidden field.
  company: z.string().max(0).optional(),
});

export const LeadReviewSchema = z.object({
  status: z.enum(LEAD_STATUSES, { error: "Выберите статус." }),
  feedback: z.string().trim().optional(),
});

export const LoginFormSchema = z.object({
  passphrase: z.string().min(1, { error: "Введите пароль." }),
});
