"use client";

import { useCallback, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Страховочный срок: если IntersectionObserver почему-то не сработал,
// контент всё равно проявится, а не останется невидимым навсегда.
const FAILSAFE_MS = 2500;

// Появление блока при прокрутке. Наблюдатель подключается через callback-ref,
// поэтому эффект не нужен. На случай выключенного JS в layout лежит
// <noscript>-стиль, снимающий скрытие.
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const [visible, setVisible] = useState(false);

  const observeRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Блок уже в зоне видимости на момент монтирования — показываем сразу.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    const failsafe = setTimeout(() => setVisible(true), FAILSAFE_MS);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={observeRef}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
