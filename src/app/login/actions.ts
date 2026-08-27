"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { LoginFormSchema } from "@/lib/validation";

export interface LoginState {
  error?: string;
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = LoginFormSchema.safeParse({
    passphrase: formData.get("passphrase"),
  });

  if (!parsed.success) {
    return { error: "Введите пароль." };
  }

  const expected = process.env.DASHBOARD_PASSPHRASE;
  if (!expected || parsed.data.passphrase !== expected) {
    return { error: "Неверный пароль." };
  }

  const session = await getSession();
  session.isLoggedIn = true;
  await session.save();

  redirect("/dashboard");
}
