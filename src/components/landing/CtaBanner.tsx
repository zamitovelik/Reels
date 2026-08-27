import { Reveal } from "@/components/motion/Reveal";

export function CtaBanner() {
  return (
    <section className="px-5 pb-24">
      <Reveal className="mx-auto max-w-6xl">
        <div className="surface-hi relative overflow-hidden rounded-[36px] px-8 py-20 text-center sm:px-14">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-white/[0.09] blur-[110px] animate-pulse-glow" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[34px] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-[52px]">
              Готовы узнать,
              <br />
              почему не залетает?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-[#86868b]">
              Вставьте ссылку на ролик — вернёмся с разбором в течение суток.
              Первый разбор бесплатный.
            </p>

            <form
              action="/zayavka"
              method="get"
              className="mx-auto mt-10 w-full max-w-xl"
            >
              <div className="surface flex flex-col gap-2 rounded-[26px] p-2 transition-all duration-500 focus-within:border-white/25 focus-within:shadow-[0_0_60px_-18px_rgba(255,255,255,0.35)] sm:flex-row sm:rounded-full">
                <input
                  type="url"
                  name="url"
                  required
                  placeholder="Ссылка на ваш ролик"
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
          </div>
        </div>
      </Reveal>
    </section>
  );
}
