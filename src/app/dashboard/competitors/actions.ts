"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { CompetitorFormSchema } from "@/lib/validation";

export interface CompetitorFormState {
  error?: string;
}

function readCompetitorForm(formData: FormData) {
  return CompetitorFormSchema.safeParse({
    name: formData.get("name"),
    profileUrl: formData.get("profileUrl"),
    platform: formData.get("platform"),
    niche: formData.get("niche"),
    region: formData.get("region"),
    followers: formData.get("followers"),
    avgViews: formData.get("avgViews"),
    notes: formData.get("notes"),
  });
}

export async function createCompetitor(
  _prevState: CompetitorFormState,
  formData: FormData,
): Promise<CompetitorFormState> {
  await verifySession();

  const parsed = readCompetitorForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы." };
  }

  await prisma.competitor.create({
    data: {
      name: parsed.data.name,
      profileUrl: parsed.data.profileUrl,
      platform: parsed.data.platform,
      niche: parsed.data.niche,
      region: parsed.data.region,
      followers: parsed.data.followers,
      avgViews: parsed.data.avgViews,
      notes: parsed.data.notes || null,
    },
  });

  revalidatePath("/dashboard/competitors");
  redirect("/dashboard/competitors");
}

export async function updateCompetitor(
  id: number,
  _prevState: CompetitorFormState,
  formData: FormData,
): Promise<CompetitorFormState> {
  await verifySession();

  const parsed = readCompetitorForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы." };
  }

  await prisma.competitor.update({
    where: { id },
    data: {
      name: parsed.data.name,
      profileUrl: parsed.data.profileUrl,
      platform: parsed.data.platform,
      niche: parsed.data.niche,
      region: parsed.data.region,
      followers: parsed.data.followers,
      avgViews: parsed.data.avgViews,
      notes: parsed.data.notes || null,
    },
  });

  revalidatePath("/dashboard/competitors");
  redirect("/dashboard/competitors");
}

export async function deleteCompetitor(formData: FormData): Promise<void> {
  await verifySession();

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await prisma.competitor.delete({ where: { id } });
  revalidatePath("/dashboard/competitors");
}
