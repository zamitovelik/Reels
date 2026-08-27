"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { LeadReviewSchema } from "@/lib/validation";

export interface LeadReviewState {
  error?: string;
}

// Разбор пока пишется руками; когда появится ИИ-агент, он будет
// заполнять те же поля status/feedback этой же записи.
export async function saveReview(
  id: number,
  _prevState: LeadReviewState,
  formData: FormData,
): Promise<LeadReviewState> {
  await verifySession();

  const parsed = LeadReviewSchema.safeParse({
    status: formData.get("status"),
    feedback: formData.get("feedback"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы." };
  }

  await prisma.lead.update({
    where: { id },
    data: {
      status: parsed.data.status,
      feedback: parsed.data.feedback || null,
    },
  });

  revalidatePath("/dashboard/leads");
  redirect("/dashboard/leads");
}

export async function deleteLead(formData: FormData): Promise<void> {
  await verifySession();

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await prisma.lead.delete({ where: { id } });
  revalidatePath("/dashboard/leads");
}
