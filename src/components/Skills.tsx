"use client";

import { useEffect, useRef } from "react";
import { skills, skillsIntro } from "@/data/portfolio";

const HEADING = "What I bring to the table.";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      section.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section bg-background border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-14 sm:pt-16 lg:pt-20 pb-16 lg:pb-24">
        <p className="skills-label text-xs tracking-widest text-foreground-soft">
          [ Skills ]
        </p>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]">
            {HEADING.split(" ").map((word, i, arr) => (
              <span
                key={i}
                className="reveal-word"
                style={{ ["--w" as never]: i }}
              >
                <span className="reveal-word__inner">{word}</span>
                {i < arr.length - 1 && " "}
              </span>
            ))}
          </h2>
          <p className="skills-intro text-sm text-foreground-muted max-w-sm">
            {skillsIntro}
          </p>
        </div>

        <ul className="mt-12 lg:mt-16 divide-y divide-[var(--border)]">
          {skills.map((s, i) => (
            <li
              key={s.title}
              className="skills-row relative grid gap-5 py-8 lg:grid-cols-[70px_1.1fr_1.5fr] lg:gap-12 lg:items-start"
              style={{ ["--r" as never]: i }}
            >
              <p className="skills-row__num hidden lg:block text-xs text-foreground-soft tracking-widest pt-2">
                {String(i + 1).padStart(2, "0")}
              </p>

              <h3 className="skills-row__title text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                <span className="lg:hidden text-foreground-soft text-sm font-medium mr-2 align-middle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <SplitTitle text={s.title} />
              </h3>

              <div>
                <p className="skills-row__body text-foreground/85 leading-relaxed max-w-2xl">
                  {s.body}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t, ti) => (
                    <span
                      key={t}
                      className="tag skills-row__tag"
                      style={{ ["--t" as never]: ti }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Splits a title into per-character spans so each letter can animate
// independently. Spaces collapse to non-breaking spaces so the layout doesn't
// re-flow mid-animation.
function SplitTitle({ text }: { text: string }) {
  const chars = Array.from(text);
  return (
    <span className="skills-row__title-inner" aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="skills-row__char"
          style={{ ["--c" as never]: i }}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}
