import Link from "next/link";

interface HeaderProps {
  ctaHref?: string;
  ctaLabel?: string;
  showNav?: boolean;
}

export function Header({
  ctaHref = "/zayavka",
  ctaLabel = "Разобрать видео",
  showNav = true,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08080a]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="surface-hi flex h-9 w-9 items-center justify-center rounded-xl text-[11px] font-semibold tracking-tight text-white transition-transform duration-500 group-hover:scale-110">
            RT
          </span>
          <span className="text-[15px] font-medium tracking-tight text-white">Reels Trends</span>
        </Link>

        {showNav && (
          <nav className="hidden items-center gap-8 md:flex">
            {[
              ["#how", "Как работает"],
              ["#skills", "Skills"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="relative text-sm text-[#86868b] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-white hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </nav>
        )}

        <Link
          href={ctaHref}
          className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#08080a] transition-all duration-300 hover:shadow-[0_0_28px_-4px_rgba(255,255,255,0.55)]"
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}
