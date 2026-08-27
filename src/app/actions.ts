"use server";

import { prisma } from "@/lib/prisma";
import { LeadFormSchema } from "@/lib/validation";
import { detectPlatform } from "@/lib/platform";

export interface LeadFormState {
  error?: string;
  success?: boolean;
}

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const parsed = LeadFormSchema.safeParse({
    name: formData.get("name"),
    contact: formData.get("contact"),
    videoUrl: formData.get("videoUrl"),
    message: formData.get("message"),
    company: formData.get("company"), // honeypot
  });

  if (!parsed.success) {
    // Honeypot filled -> silently report success, don't reveal the trap or persist spam.
    if (formData.get("company")) {
      return { success: true };
    }
    const message = parsed.error.issues[0]?.message ?? "Проверьте поля формы.";
    return { error: message };
  }

  const videoUrl = parsed.data.videoUrl;

  await prisma.lead.create({
    data: {
      name: parsed.data.name,
      contact: parsed.data.contact,
      videoUrl,
      platform: videoUrl ? detectPlatform(videoUrl) : null,
      message: parsed.data.message || null,
    },
  });

  return { success: true };
}
