import { Reveal } from "@/components/motion/Reveal";

// Плейсхолдеры: замените на реальные отзывы, когда они появятся.
const REVIEWS = [
  {
    initials: "АК",
    name: "Артём К.",
    role: "блогер, 40к подписчиков",
    text: "Скинул ролик, который не залетел. Вернулись с разбором по секундам — оказалось, крючок начинался только на 4-й секунде. Переснял, следующий сделал 300к.",
  },
  {
    initials: "МС",
    name: "Марина С.",
    role: "SMM, бьюти-ниша",
    text: "Ценно, что показывают не общие советы, а конкретный US-формат, который под нашу нишу подходит. Мы бы сами его не нашли.",
  },
  {
    initials: "ДЛ",
    name: "Дмитрий Л.",
    role: "владелец студии",
    text: "Пользуемся как внешним взглядом на монтаж. Разбор приходит быстро и по делу, без воды.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-16 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5c5c63]">Reviews</p>
          <h2 className="mt-4 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[46px]">
            Что говорят
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={i * 120}>
              <figure className="surface hover-lift flex h-full flex-col rounded-3xl p-8">
                <div className="flex gap-1 text-[11px] text-white/70">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s}>★</span>
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-[#d4d4d8]">
                  {review.text}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3.5 border-t border-white/[0.06] pt-6">
                  <span className="surface-hi flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-semibold text-white">
                    {review.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium tracking-tight text-white">{review.name}</p>
                    <p className="mt-0.5 text-xs text-[#5c5c63]">{review.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
