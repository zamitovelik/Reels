"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { TrendFormSchema } from "@/lib/validation";

export interface TrendFormState {
  error?: string;
}

function readTrendForm(formData: FormData) {
  return TrendFormSchema.safeParse({
    sourceUrl: formData.get("sourceUrl"),
    platform: formData.get("platform"),
    niche: formData.get("niche"),
    title: formData.get("title"),
    viewCount: formData.get("viewCount"),
    likeCount: formData.get("likeCount"),
    commentCount: formData.get("commentCount"),
    shareCount: formData.get("shareCount"),
    status: formData.get("status"),
    notes: formData.get("notes"),
    adaptationIdea: formData.get("adaptationIdea"),
  });
}

export async function createTrend(_prevState: TrendFormState, formData: FormData): Promise<TrendFormState> {
  await verifySession();

  const parsed = readTrendForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы." };
  }

  await prisma.trendEntry.create({
    data: {
      sourceUrl: parsed.data.sourceUrl,
      platform: parsed.data.platform,
      niche: parsed.data.niche,
      title: parsed.data.title,
      viewCount: parsed.data.viewCount,
      likeCount: parsed.data.likeCount,
      commentCount: parsed.data.commentCount,
      shareCount: parsed.data.shareCount,
      status: parsed.data.status,
      notes: parsed.data.notes || null,
      adaptationIdea: parsed.data.adaptationIdea || null,
    },
  });

  revalidatePath("/dashboard/trends");
  redirect("/dashboard/trends");
}

export async function updateTrend(
  id: number,
  _prevState: TrendFormState,
  formData: FormData,
): Promise<TrendFormState> {
  await verifySession();

  const parsed = readTrendForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы." };
  }

  await prisma.trendEntry.update({
    where: { id },
    data: {
      sourceUrl: parsed.data.sourceUrl,
      platform: parsed.data.platform,
      niche: parsed.data.niche,
      title: parsed.data.title,
      viewCount: parsed.data.viewCount,
      likeCount: parsed.data.likeCount,
      commentCount: parsed.data.commentCount,
      shareCount: parsed.data.shareCount,
      status: parsed.data.status,
      notes: parsed.data.notes || null,
      adaptationIdea: parsed.data.adaptationIdea || null,
    },
  });

  revalidatePath("/dashboard/trends");
  redirect("/dashboard/trends");
}

export async function deleteTrend(formData: FormData): Promise<void> {
  await verifySession();

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await prisma.trendEntry.delete({ where: { id } });
  revalidatePath("/dashboard/trends");
}
