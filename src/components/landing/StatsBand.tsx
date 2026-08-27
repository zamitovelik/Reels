import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";

const STATS = [
  { value: 500, suffix: "+", label: "роликов в разборе каждый месяц" },
  { value: 24, suffix: "ч", label: "средний срок ответа" },
  { value: 3, suffix: "", label: "площадки: TikTok, Reels, Shorts" },
  { value: 17.6, suffix: "M", decimals: 1, label: "суммарный охват отслеживаемых ниш" },
];

export function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[110px]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100}>
            <p className="text-[44px] font-semibold leading-none tracking-[-0.04em] text-white">
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
            </p>
            <p className="mt-3.5 text-sm leading-relaxed text-[#86868b]">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
