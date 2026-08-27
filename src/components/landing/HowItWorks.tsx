import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Кидаете ссылку",
    text: "Вставляете ссылку на любой короткий ролик — свой или чужой. Площадку определяем сами.",
  },
  {
    n: "02",
    title: "Разбираем ролик",
    text: "Смотрим крючок, темп, структуру, звук и подачу. Сверяем с тем, что сейчас растёт у аудитории в США.",
  },
  {
    n: "03",
    title: "Получаете обратную связь",
    text: "Присылаем конкретику: что мешает ролику залететь, что переснять и какой формат взять следующим.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-16 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5c5c63]">
            How it works
          </p>
          <h2 className="mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[46px]">
            Три шага — и у вас
            <br />
            есть разбор
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 120}>
              <div className="surface hover-lift group h-full rounded-3xl p-8">
                <span className="block text-[13px] font-medium tracking-widest text-[#5c5c63] transition-colors duration-500 group-hover:text-white">
                  {step.n}
                </span>
                <h3 className="mt-6 text-xl font-medium tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#86868b]">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
