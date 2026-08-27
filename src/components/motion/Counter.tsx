"use client";

import { useCallback, useState } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

// Если наблюдатель не сработал, всё равно показываем итоговое число.
const FAILSAFE_MS = 2500;

// Число, которое «набегает» при попадании в экран.
export function Counter({ value, suffix = "", decimals = 0, duration = 1600 }: CounterProps) {
  const [display, setDisplay] = useState(0);

  const observeRef = useCallback(
    (el: HTMLSpanElement | null) => {
      if (!el) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced || typeof IntersectionObserver === "undefined") {
        setDisplay(value);
        return;
      }

      let frame = 0;
      let start = 0;
      let running = false;

      const step = (now: number) => {
        if (!start) start = now;
        const progress = Math.min((now - start) / duration, 1);
        // easeOutExpo — быстрый старт, мягкая остановка
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(value * eased);
        if (progress < 1) frame = requestAnimationFrame(step);
      };

      const run = () => {
        if (running) return;
        running = true;
        frame = requestAnimationFrame(step);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            run();
            observer.disconnect();
          }
        },
        { threshold: 0.4 },
      );

      observer.observe(el);
      const failsafe = setTimeout(run, FAILSAFE_MS);

      return () => {
        observer.disconnect();
        clearTimeout(failsafe);
        cancelAnimationFrame(frame);
      };
    },
    [value, duration],
  );

  return (
    <span ref={observeRef} className="tabular-nums">
      {display.toLocaleString("ru-RU", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
