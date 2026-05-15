"use client";

import { useEffect, useRef } from "react";

type JourneyItem = {
  role: string; company: string; location: string;
  period: string; current?: boolean; bullets: string[];
};

export default function Journey({
  journey,
  journeySubtitle,
}: {
  journey: JourneyItem[];
  journeySubtitle: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      // Progress: 0 when section top is at viewport top, 1 when section
      // has fully scrolled past the viewport top.
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, rect.height))
      );
      section.style.setProperty("--journey-progress", progress.toFixed(4));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bg-[var(--dark-bg)] text-[var(--dark-foreground)]"
      style={{ ["--journey-progress" as never]: "0" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-24">
        <p className="text-xs tracking-widest text-[var(--dark-muted)]">
          [ Experience ]
        </p>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]">
            A journey through pixels.
          </h2>
          <p className="text-sm text-[var(--dark-muted)] max-w-sm">
            {journeySubtitle}
          </p>
        </div>

        <ul className="mt-12 lg:mt-16 divide-y divide-[var(--dark-border)]">
          {journey.map((j) => (
            <article
              key={`${j.role}-${j.period}`}
              className="grid gap-6 py-8 lg:grid-cols-[160px_1.2fr_1.6fr] lg:gap-10"
            >
              <div className="journey-pane-left lg:pt-2">
                <p className="text-xs uppercase tracking-widest text-[var(--dark-muted)]">
                  {j.period}
                </p>
                {j.current && (
                  <p className="mt-2 inline-flex items-center gap-2 text-xs text-[var(--accent)] font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                    </span>
                    Currently
                  </p>
                )}
              </div>

              <div className="journey-pane-left">
                <h3 className="text-xl sm:text-2xl font-semibold">{j.role}</h3>
                <p className="mt-2 text-[var(--accent)]">{j.company}</p>
                <p className="mt-1 text-xs text-[var(--dark-muted)]">
                  {j.location}
                </p>
              </div>

              <ul className="journey-pane-right space-y-2">
                {j.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-[var(--dark-foreground)]/85 leading-relaxed"
                  >
                    <ArrowRight className="mt-1.5 h-3.5 w-3.5 text-[var(--accent)] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M2.5 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
