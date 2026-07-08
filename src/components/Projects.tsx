import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import {
  projects as fallbackProjects,
  projectsIntro as fallbackIntro,
  profile as fallbackProfile,
} from "@/data/portfolio";

type ProjectItem = {
  number: string; name: string; category: string; blurb: string;
  href: string; background: string; foreground: string; arrowBg: string; arrowFg: string;
};

const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) { number, name, category, blurb, href, background, foreground, arrowBg, arrowFg }`;
const INTRO_QUERY    = `*[_type == "siteSettings"][0] { projectsIntro }.projectsIntro`;
const URL_QUERY      = `*[_type == "profile"][0] { portfolioUrl }.portfolioUrl`;

// In dev: fetch fresh on every request so Studio edits appear on the next reload.
// In prod: cache indefinitely, busted by the Sanity → /api/revalidate webhook.
const revalidate = process.env.NODE_ENV === "development" ? 0 : false;

export default async function Projects() {
  const [items, intro, portfolioUrl] = await Promise.all([
    sanityClient.fetch<ProjectItem[]>(PROJECTS_QUERY, {}, { next: { tags: ["project"], revalidate } }),
    sanityClient.fetch<string | null>(INTRO_QUERY, {}, { next: { tags: ["siteSettings"], revalidate } }),
    sanityClient.fetch<string | null>(URL_QUERY, {}, { next: { tags: ["profile"], revalidate } }),
  ]);
  const projects      = items.length ? items : fallbackProjects;
  const projectsIntro = intro ?? fallbackIntro;
  const portfolioUrl_ = portfolioUrl ?? fallbackProfile.portfolioUrl;

  // 9-card bento (B9):
  //   Row 1-2: Book it (2/3, 2 rows tall anchor) + Builder (1/3) + HMI (1/3) stacked
  //   Row 3:   Way Finder (1/2) + Clarity (1/2)
  //   Row 4:   One (1/3) + OTT News (1/3) + Digital Signage (1/3)
  //   Row 5:   Neer (full width — wide finale for the HTML build)
  const [
    bookit,
    builder,
    hmi,
    wayFinder,
    one,
    clarity,
    ottNews,
    signage,
    neer,
  ] = projects;

  return (
    <section
      id="projects"
      className="bg-background border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-24">
        <p className="text-xs tracking-widest text-foreground-soft">
          [ Projects ]
        </p>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]">
            Things I&apos;ve shipped.
          </h2>
          <div className="text-sm text-foreground-muted max-w-sm">
            <p>{projectsIntro}</p>
          </div>
        </div>

        <div className="mt-10 lg:mt-14 space-y-4 sm:space-y-5">
          {/* Rows 1-2: Book it (2/3, 2 rows tall) + Builder / HMI stacked (1/3 each) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:auto-rows-[360px]">
            {bookit && (
              <Card
                project={bookit}
                className="md:col-span-2 md:row-span-2 md:min-h-0"
              />
            )}
            {builder && <Card project={builder} className="md:min-h-0" />}
            {hmi && <Card project={hmi} className="md:min-h-0" />}
          </div>

          {/* Row 3: Way Finder + Clarity, equal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {wayFinder && <Card project={wayFinder} />}
            {clarity && <Card project={clarity} />}
          </div>

          {/* Row 4: One + OTT News + Digital Signage, thirds */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {one && <Card project={one} />}
            {ottNews && <Card project={ottNews} />}
            {signage && <Card project={signage} />}
          </div>

          {/* Row 5: Neer — wide finale for the HTML build */}
          {neer && (
            <div className="grid grid-cols-1">
              <Card project={neer} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Card({
  project,
  className = "",
}: {
  project: ProjectItem;
  className?: string;
}) {
  const isExternal = /^https?:\/\//i.test(project.href);

  const inner = (
    <>
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
        <h3 className="glitch-group mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.95]">
          {project.name}
        </h3>
        <p
          className="mt-4 text-sm sm:text-base leading-relaxed max-w-md"
          style={{ color: project.foreground, opacity: 0.85 }}
        >
          {project.blurb}
        </p>
      </div>
    </>
  );

  const sharedClass = `group relative overflow-hidden rounded-2xl p-7 sm:p-9 min-h-[420px] sm:min-h-[460px] flex flex-col transition-transform hover:-translate-y-0.5 ${className}`;
  const sharedStyle = { background: project.background, color: project.foreground };

  if (isExternal) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClass}
        style={sharedStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={project.href} className={sharedClass} style={sharedStyle}>
      {inner}
    </Link>
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
