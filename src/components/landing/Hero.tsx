const CHECKS = ["Ответ за 24 часа", "Разбор человеком", "Бесплатно для первого ролика"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Мягкие световые пятна — медленно дышат и плывут */}
      <div className="pointer-events-none absolute left-1/2 top-[-14rem] h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-white/[0.07] blur-[130px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-white/[0.04] blur-[110px] animate-float-slow" />
      <div
        className="pointer-events-none absolute -right-32 top-24 h-80 w-80 rounded-full bg-white/[0.035] blur-[110px] animate-float-slow"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-20 text-center sm:pt-28">
        <span
          className="surface animate-fade-up inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-[#c9c9ce]"
          style={{ animationDelay: "60ms" }}
        >
          <span className="animate-blink-dot h-1.5 w-1.5 rounded-full bg-white" />
          AI video breakdown
        </span>

        <h1
          className="animate-fade-up mt-8 text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[76px]"
          style={{ animationDelay: "140ms" }}
        >
          <span className="block text-white">Кинь ссылку</span>
          <span className="block text-white">на видео —</span>
          <span className="text-shimmer block">получи разбор</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-[#86868b]"
          style={{ animationDelay: "220ms" }}
        >
          Вставьте ссылку на TikTok, Reels или Shorts — вернёмся с разбором:
          почему ролик заходит или не заходит, что чинить в первые 3 секунды и
          какой формат из США под это подходит.
        </p>

        {/* Обычная GET-форма: работает без JS, ссылка уезжает на страницу разбора */}
        <form
          action="/zayavka"
          method="get"
          className="animate-fade-up group mx-auto mt-11 w-full max-w-2xl"
          style={{ animationDelay: "300ms" }}
        >
          <div className="surface flex flex-col gap-2 rounded-[26px] p-2 transition-all duration-500 focus-within:border-white/25 focus-within:shadow-[0_0_60px_-18px_rgba(255,255,255,0.35)] sm:flex-row sm:rounded-full">
            <input
              type="url"
              name="url"
              required
              placeholder="https://www.tiktok.com/@user/video/..."
              aria-label="Ссылка на видео"
              className="w-full flex-1 rounded-full bg-transparent px-6 py-3.5 text-[15px] text-white outline-none placeholder:text-[#5c5c63]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-white px-8 py-3.5 text-[15px] font-medium text-[#08080a] transition-all duration-300 hover:shadow-[0_0_32px_-4px_rgba(255,255,255,0.6)] active:scale-[0.98]"
            >
              Разобрать
            </button>
          </div>
        </form>

        <div
          className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          style={{ animationDelay: "380ms" }}
        >
          {CHECKS.map((check) => (
            <span key={check} className="flex items-center gap-2 text-sm text-[#86868b]">
              <span className="surface-hi flex h-4 w-4 items-center justify-center rounded-full text-[9px] text-white">
                ✓
              </span>
              {check}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
