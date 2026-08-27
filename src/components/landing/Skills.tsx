import { Reveal } from "@/components/motion/Reveal";

const SKILL_BARS = [
  { name: "Trend Research", ru: "поиск вирусных форматов", value: 95 },
  { name: "Hook Writing", ru: "крючки в первые 3 секунды", value: 90 },
  { name: "Script Adaptation", ru: "перенос идеи на RU-контекст", value: 88 },
  { name: "Short-form Editing", ru: "монтаж под вертикаль", value: 82 },
  { name: "Analytics", ru: "разбор метрик и гипотез", value: 78 },
];

const SKILL_CARDS = [
  { title: "Research", text: "Каждый день смотрим ленты US-аудитории и ловим форматы на старте роста." },
  { title: "Strategy", text: "Разбираем, за счёт чего ролик сработал, и делаем из этого повторяемую механику." },
  { title: "Copy & Script", text: "Пишем сценарий под русскоязычного зрителя — с локальными реалиями, а не калькой." },
  { title: "Growth", text: "Смотрим, подтвердилась ли гипотеза, и докручиваем формат по реальным цифрам." },
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-16 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5c5c63]">
            Our skills
          </p>
          <h2 className="mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[46px]">
            Что мы умеем
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-[#86868b]">
            Пять навыков, из которых складывается путь от чужого вирусного
            ролика до вашего собственного.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <div className="surface hover-lift h-full rounded-3xl p-8">
              <div className="space-y-7">
                {SKILL_BARS.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium tracking-tight text-white">
                          {skill.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-[#5c5c63]">{skill.ru}</p>
                      </div>
                      <span className="shrink-0 text-sm tabular-nums text-[#86868b]">
                        {skill.value}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                      <div
                        className="animate-grow-bar h-full rounded-full bg-gradient-to-r from-white/40 to-white"
                        style={{ width: `${skill.value}%`, animationDelay: `${i * 120}ms` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {SKILL_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="surface hover-lift group h-full rounded-3xl p-7">
                  <span className="surface-hi flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold text-white transition-transform duration-500 group-hover:scale-110">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-lg font-medium tracking-tight text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#86868b]">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
