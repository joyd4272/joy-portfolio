import { profile } from "@/data/portfolio";

export default function CTA() {
  return (
    <section
      id="contact"
      className="bg-[var(--dark-bg)] text-[var(--dark-foreground)]"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-24 sm:py-32 lg:py-40 text-center">
        <p className="text-xs tracking-widest text-[var(--dark-muted)]">
          [ Contact ]
        </p>

        <h2 className="mt-8 sm:mt-10 font-extrabold tracking-tight leading-[0.95] text-[clamp(56px,11vw,160px)]">
          <span className="block">Found my work</span>
          <span className="block italic text-[var(--accent)]">interesting?</span>
        </h2>

        <p className="mt-8 sm:mt-10 text-base sm:text-lg text-[var(--dark-muted)] max-w-2xl mx-auto">
          Let&apos;s make something that solves problems and looks good doing it.
        </p>

        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="cta-talk inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[var(--dark-foreground)] text-[var(--dark-bg)] pl-7 pr-3 py-3 text-base font-semibold"
          >
            Let&apos;s talk
            <span className="cta-talk__chip inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dark-bg)] text-[var(--dark-foreground)]">
              <span className="cta-talk__arrow inline-flex">
                <ArrowRight />
              </span>
            </span>
          </a>

          <a
            href={profile.resumeUrl}
            download
            className="cta-download inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-[var(--dark-border)] px-7 py-3 text-base font-semibold"
          >
            Download résumé.pdf
            <span className="cta-download__arrow-wrap">
              <ArrowDown />
              <ArrowDown className="is-incoming" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      fill="none"
    >
      <path
        d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      fill="none"
      className={className}
    >
      <path
        d="M7 3V11M7 11L10.5 7.5M7 11L3.5 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
