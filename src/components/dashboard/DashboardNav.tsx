"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/dashboard/leads", label: "Разборы" },
  { href: "/dashboard/trends", label: "Тренды" },
  { href: "/dashboard/competitors", label: "Конкуренты" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="surface flex gap-1 rounded-full p-1">
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
              active
                ? "bg-white text-[#08080a]"
                : "text-[#86868b] hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
