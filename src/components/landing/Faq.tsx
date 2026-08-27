import { Reveal } from "@/components/motion/Reveal";

const QUESTIONS = [
  {
    q: "Сколько стоит разбор?",
    a: "Первый ролик разбираем бесплатно — чтобы вы поняли, насколько это полезно. Дальше обсуждаем формат работы под задачу.",
  },
  {
    q: "Разбор делает ИИ или человек?",
    a: "Сейчас разбор пишет человек вручную. ИИ-агент в разработке — он возьмёт на себя первичный анализ, а финальную обратную связь всё равно будет проверять человек.",
  },
  {
    q: "Какие ссылки подходят?",
    a: "TikTok, Instagram Reels и YouTube Shorts. Площадку определяем автоматически по ссылке — выбирать вручную не нужно.",
  },
  {
    q: "Можно прислать чужой ролик?",
    a: "Да. Часто так и делают: присылают чужой ролик, который залетел, и просят объяснить, за счёт чего он сработал и как повторить механику у себя.",
  },
  {
    q: "Вы предлагаете копировать чужие видео?",
    a: "Нет. Мы разбираем механику — крючок, структуру, темп — и помогаем сделать на её основе свой оригинальный ролик под русскоязычную аудиторию.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5c5c63]">FAQ</p>
          <h2 className="mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[46px]">
            Частые вопросы
          </h2>
        </Reveal>

        <div className="space-y-3">
          {QUESTIONS.map((item, i) => (
            <Reveal key={item.q} delay={i * 70}>
              <details className="surface group rounded-2xl px-6 py-5 transition-colors duration-300 hover:border-white/[0.14] [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-[16px] font-medium tracking-tight text-white">
                  {item.q}
                  <span className="relative h-4 w-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-[#86868b] transition-colors duration-300 group-open:bg-white" />
                    <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-[#86868b] transition-all duration-300 group-open:rotate-90 group-open:bg-white" />
                  </span>
                </summary>
                <p className="mt-4 text-[15px] leading-relaxed text-[#86868b]">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
