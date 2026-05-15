"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = { value: string; label: string };

export default function Stats({ stats }: { stats: StatItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-16 lg:py-20">
        <ul className="grid grid-cols-2 gap-y-10 gap-x-8 sm:grid-cols-3 sm:gap-x-12">
          {stats.map((s, i) => (
            <li
              key={s.label}
              className={
                i === 0
                  ? "sm:text-left"
                  : i === 1
                  ? "sm:text-center"
                  : "sm:text-right"
              }
            >
              <p className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none tabular-nums">
                <Counter value={s.value} triggered={triggered} delay={i * 180} />
              </p>
              <p className="mt-4 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-foreground-soft">
                {s.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Parses "10+", "08", "07" into { target, suffix, padWidth }.
function parseStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: "", padWidth: 0 };
  const numStr = match[1];
  return {
    target: parseInt(numStr, 10),
    suffix: match[2] || "",
    padWidth: numStr.startsWith("0") ? numStr.length : 0,
  };
}

function Counter({
  value,
  triggered,
  delay = 0,
}: {
  value: string;
  triggered: boolean;
  delay?: number;
}) {
  const { target, suffix, padWidth } = parseStatValue(value);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    let raf = 0;
    let timeout = 0;
    let startTime = 0;
    const duration = 1600;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease-out cubic — slows down nicely as it approaches the target.
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    timeout = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [triggered, target, delay]);

  const displayed =
    padWidth > 0 ? String(current).padStart(padWidth, "0") : String(current);

  return (
    <span>
      {displayed}
      {suffix}
    </span>
  );
}
