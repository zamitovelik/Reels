import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#08080a]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-12 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="surface-hi flex h-9 w-9 items-center justify-center rounded-xl text-[11px] font-semibold text-white">
            RT
          </span>
          <div>
            <p className="text-sm font-medium tracking-tight text-white">Reels Trends</p>
            <p className="text-xs text-[#86868b]">Разбор коротких видео и тренд-разведка</p>
          </div>
        </div>
        <Link
          href="/zayavka"
          className="surface rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_28px_-8px_rgba(255,255,255,0.4)]"
        >
          Разобрать видео →
        </Link>
      </div>
    </footer>
  );
}
