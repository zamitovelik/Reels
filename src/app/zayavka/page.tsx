import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactForm } from "@/components/landing/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Разбор видео — Reels Trends",
  description: "Пришлите ссылку на ролик — вернёмся с разбором и планом, что переснять.",
};

const WHAT_YOU_GET = [
  {
    n: "01",
    title: "Оценка по пунктам",
    text: "Крючок, темп, звук, структура — каждый пункт с баллом и объяснением, что именно не работает.",
  },
  {
    n: "02",
    title: "План на пересъёмку",
    text: "Конкретные действия: что вырезать, где начать иначе, какой звук взять.",
  },
  {
    n: "03",
    title: "US-референсы",
    text: "Три ролика из США в вашей нише, на механику которых стоит опереться.",
  },
];

export default async function ZayavkaPage(props: PageProps<"/zayavka">) {
  const sp = await props.searchParams;
  const url = typeof sp.url === "string" ? sp.url : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <Header ctaHref="/" ctaLabel="На главную" showNav={false} />

      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[-12rem] h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[120px] animate-pulse-glow" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="surface animate-fade-up inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-[#c9c9ce]">
              <span className="animate-blink-dot h-1.5 w-1.5 rounded-full bg-white" />
              Первый разбор бесплатно
            </span>
            <h1
              className="animate-fade-up mt-7 text-[40px] font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-[56px]"
              style={{ animationDelay: "100ms" }}
            >
              Получить разбор
            </h1>
            <p
              className="animate-fade-up mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-[#86868b]"
              style={{ animationDelay: "180ms" }}
            >
              {url
                ? "Ссылку подхватили — осталось указать, куда прислать разбор."
                : "Оставьте ссылку на ролик и контакт — вернёмся с разбором в течение суток."}
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 lg:grid-cols-[1.15fr_1fr]">
            <Reveal>
              <ContactForm defaultVideoUrl={url} />
            </Reveal>

            <div className="space-y-4">
              <Reveal delay={120}>
                <div className="surface-hi rounded-3xl p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#86868b]">
                    What you get
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                    Что придёт в ответ
                  </h2>
                  <div className="mt-8 space-y-7">
                    {WHAT_YOU_GET.map((item) => (
                      <div key={item.n} className="flex gap-4">
                        <span className="text-sm font-medium tracking-widest text-[#5c5c63]">
                          {item.n}
                        </span>
                        <div>
                          <p className="font-medium tracking-tight text-white">{item.title}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[#86868b]">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="surface rounded-3xl p-7">
                  <p className="text-[15px] leading-relaxed text-[#86868b]">
                    Сейчас разбор пишет человек — поэтому берём ограниченное
                    число роликов в день. ИИ-агент в разработке.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
