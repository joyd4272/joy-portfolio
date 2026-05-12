"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/portfolio";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect reduced-motion preference — skip the scroll animation entirely.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      // Progress: 0 when the section top is at the viewport top,
      // 1 when the section has fully scrolled past the viewport top.
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, rect.height))
      );
      section.style.setProperty("--hero-progress", progress.toFixed(4));
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
      id="about"
      ref={sectionRef}
      className="bg-background"
      style={{ ["--hero-progress" as never]: "0" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 pb-12 lg:pt-16 lg:pb-20">
        <p className="text-xs tracking-widest text-foreground-soft">
          [ I am ]
        </p>

        <h1 className="mt-6 font-extrabold leading-[0.9] tracking-[-0.02em] text-[clamp(72px,16vw,260px)] flex flex-col lg:flex-row lg:flex-wrap lg:items-baseline">
          <span className="hero-pane-left inline-block">Joy</span>
          <span className="hero-pane-right inline-block lg:ml-[0.12em]">Das</span>
        </h1>

        <div className="mt-10 grid gap-12 lg:gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div className="hero-pane-left">
            <p className="text-2xl sm:text-3xl leading-[1.15] tracking-tight font-medium">
              {profile.tagline}
            </p>
            <p className="mt-6 text-sm tracking-wide text-foreground">
              <span className="text-foreground-soft">[ </span>
              {profile.intro}
              <span className="text-foreground-soft"> ]</span>
            </p>
          </div>

          <dl className="hero-pane-right grid grid-cols-2 gap-x-8 gap-y-8 self-end lg:pb-1 text-sm">
            <Field label="Currently" value={profile.currentRole} />
            <Field label="At" value={profile.currentCompany} />
            <Field label="Based in" value={profile.location} />
            <Field
              label="Education"
              value={profile.education.school}
              short="GCAC, Kolkata"
            />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  short,
}: {
  label: string;
  value: string;
  short?: string;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.18em] text-foreground-soft">
        {label}
      </dt>
      <dd className="mt-2 font-semibold leading-snug">
        {short ? (
          <>
            <span className="hidden sm:inline">{value}</span>
            <span className="sm:hidden">{short}</span>
          </>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
