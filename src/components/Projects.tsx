import { projects, projectsIntro, profile } from "@/data/portfolio";

type Project = (typeof projects)[number];

export default function Projects() {
  // Editorial rhythm matches the Figma:
  //   Row 1: Builder (2/3) + Book it (1/3)
  //   Row 2: Way Finder + Clarity (50/50)
  //   Row 3: Digital Signage (1/3) + One (2/3)
  const [builder, bookit] = projects.slice(0, 2);
  const row2 = projects.slice(2, 4);
  const [signage, one] = projects.slice(4, 6);

  return (
    <section
      id="projects"
      className="bg-background border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-24">
        <p className="text-xs tracking-widest text-foreground-soft">
          [ Selected work ]
        </p>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]">
            Things I&apos;ve shipped.
          </h2>
          <div className="text-sm text-foreground-muted max-w-sm">
            <p>{projectsIntro}</p>
            <a
              href={profile.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link mt-3 inline-flex items-center text-foreground font-medium"
            >
              View full portfolio
              <span className="cta-link__arrow ml-1" aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="mt-10 lg:mt-14 space-y-4 sm:space-y-5">
          {/* Row 1: Builder 2/3 + Book it 1/3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <Card project={builder} className="md:col-span-2" />
            <Card project={bookit} className="md:col-span-1" />
          </div>

          {/* Row 2: Way Finder + Clarity, equal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {row2.map((p) => (
              <Card key={p.number} project={p} />
            ))}
          </div>

          {/* Row 3: Digital Signage 1/3 + One 2/3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <Card project={signage} className="md:col-span-1" />
            <Card project={one} className="md:col-span-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden rounded-2xl p-7 sm:p-9 min-h-[420px] sm:min-h-[460px] flex flex-col transition-transform hover:-translate-y-0.5 ${className}`}
      style={{ background: project.background, color: project.foreground }}
    >
      <div className="flex items-start justify-between">
        <span
          className="text-xs font-medium tracking-widest"
          style={{ color: project.foreground, opacity: 0.7 }}
        >
          {project.number}
        </span>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:rotate-12"
          style={{ background: project.arrowBg, color: project.arrowFg }}
        >
          <ArrowUpRight />
        </span>
      </div>

      <div className="mt-auto">
        <p
          className="text-xs tracking-widest"
          style={{ color: project.foreground, opacity: 0.7 }}
        >
          {project.category}
        </p>
        <h3 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.95]">
          {project.name}
        </h3>
        <p
          className="mt-4 text-sm sm:text-base leading-relaxed max-w-md"
          style={{ color: project.foreground, opacity: 0.85 }}
        >
          {project.blurb}
        </p>
      </div>
    </a>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
