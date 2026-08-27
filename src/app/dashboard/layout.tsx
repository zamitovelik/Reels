import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { getSession } from "@/lib/session";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  await verifySession();

  async function logout() {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#08080a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="surface-hi flex h-9 w-9 items-center justify-center rounded-xl text-[11px] font-semibold text-white">
                RT
              </span>
              <span className="hidden text-[15px] font-medium tracking-tight text-white sm:block">
                Reels Trends
              </span>
            </Link>
            <DashboardNav />
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-[#86868b] transition-colors duration-300 hover:text-white"
            >
              Выйти
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
