const ITEMS = [
  "TikTok",
  "Instagram Reels",
  "YouTube Shorts",
  "US Trends",
  "Hook Analysis",
  "RU Adaptation",
];

// Одна половина ленты. Дорожка состоит ровно из двух таких половин,
// поэтому сдвиг на -50% возвращает картинку в исходное положение —
// шва не видно.
const HALF = [...ITEMS, ...ITEMS, ...ITEMS];

export function Marquee() {
  return (
    <div className="marquee-viewport relative overflow-hidden border-y border-white/[0.06] py-5">
      {/* Затемнение по краям, чтобы лента уходила в фон, а не обрывалась */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#08080a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#08080a] to-transparent" />

      <div className="marquee-track flex w-max">
        {[0, 1].map((half) => (
          <div
            key={half}
            className="flex shrink-0 items-center gap-12 pr-12"
            // Вторая половина — визуальный дубль, для скринридера её нет
            aria-hidden={half === 1}
          >
            {HALF.map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-12">
                <span className="whitespace-nowrap text-sm font-medium tracking-tight text-[#5c5c63]">
                  {item}
                </span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-white/20" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
