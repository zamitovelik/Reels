import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";

const PROBLEMS = [
  { label: "Крючок", score: 4, text: "Первые 2 секунды — заставка с логотипом. Зритель уходит до сути." },
  { label: "Темп", score: 6, text: "Одна статичная склейка на 9 секунд. В US-формате смена кадра каждые 1.5–2 сек." },
  { label: "Звук", score: 3, text: "Оригинальный звук без трендового аудио — алгоритм не подхватывает." },
];

const FIXES = [
  "Начать сразу с результата: показать «до/после» в первом кадре",
  "Нарезать на склейки по 1.5 секунды, убрать заставку",
  "Взять трендовый звук из US-подборки под эту нишу",
];

export function BreakdownSample() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5c5c63]">
            Sample output
          </p>
          <h2 className="mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[46px]">
            Вот так выглядит разбор
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-[#86868b]">
            Не «снимайте интереснее», а конкретные пункты с оценками и тем, что
            делать дальше.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="surface hover-lift h-full rounded-3xl p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#5c5c63]">
                    Разбор ролика
                  </p>
                  <p className="mt-1.5 truncate text-sm text-white">
                    tiktok.com/@example/video/7291…
                  </p>
                </div>
                <div className="surface-hi flex items-baseline gap-1.5 rounded-full px-5 py-2.5">
                  <span className="text-2xl font-semibold leading-none tracking-tight text-white">
                    <Counter value={4.3} decimals={1} />
                  </span>
                  <span className="text-xs text-[#5c5c63]">/10</span>
                </div>
              </div>

              <div className="mt-7 space-y-7">
                {PROBLEMS.map((item, i) => (
                  <div key={item.label}>
                    <div className="mb-2.5 flex items-center justify-between gap-3">
                      <span className="text-sm font-medium tracking-tight text-white">
                        {item.label}
                      </span>
                      <span className="text-sm tabular-nums text-[#86868b]">
                        {item.score}/10
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                      <div
                        className="animate-grow-bar h-full rounded-full bg-white/85"
                        style={{ width: `${item.score * 10}%`, animationDelay: `${i * 160}ms` }}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#86868b]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="surface-hi glow-soft hover-lift h-full rounded-3xl p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#86868b]">
                Что делать
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                План на пересъёмку
              </h3>
              <ul className="mt-8 space-y-5">
                {FIXES.map((fix, i) => (
                  <li key={fix} className="flex gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-[#08080a]">
                      {i + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed text-[#d4d4d8]">{fix}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/[0.08] pt-6 text-sm text-[#86868b]">
                + подборка из 3 US-роликов в этой нише, на которые стоит опереться
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
