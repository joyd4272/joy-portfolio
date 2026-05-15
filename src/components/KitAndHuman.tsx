import { sanityClient } from "@/sanity/client";
import {
  dock as fallbackDock,
  hobbies as fallbackHobbies,
  profile as fallbackProfile,
} from "@/data/portfolio";

type DockItem  = { name: string; note: string; primary?: boolean };
type HobbyItem = { name: string; note: string; icon: string; highlight?: boolean };
type Education = { degree: string; discipline: string; school: string; period: string };

const DOCK_QUERY  = `*[_type == "dockTool"] | order(order asc) { name, note, primary }`;
const HOBBY_QUERY = `*[_type == "hobby"] | order(order asc) { name, note, icon, highlight }`;
const EDU_QUERY   = `*[_type == "profile"][0] { education }`;

export default async function KitAndHuman() {
  const [dockItems, hobbyItems, profileData] = await Promise.all([
    sanityClient.fetch<DockItem[]>(DOCK_QUERY, {}, { next: { revalidate: 0 } }),
    sanityClient.fetch<HobbyItem[]>(HOBBY_QUERY, {}, { next: { revalidate: 0 } }),
    sanityClient.fetch<{ education: Education } | null>(EDU_QUERY, {}, { next: { revalidate: 0 } }),
  ]);
  const dock    = dockItems.length ? dockItems : fallbackDock;
  const hobbies = hobbyItems.length ? hobbyItems : fallbackHobbies;
  const edu     = profileData?.education ?? fallbackProfile.education;

  return (
    <section className="bg-background border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-24">
        <p className="text-xs tracking-widest text-foreground-soft">
          [ Toolbox & beyond ]
        </p>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]">
            The kit &amp; the human.
          </h2>
          <p className="text-sm text-foreground-muted max-w-sm">
            The tools I reach for, the place I studied, and the things that fill
            my weekends.
          </p>
        </div>

        {/* Top row: Dock (wide) + Education (narrow) */}
        <div className="mt-10 lg:mt-14 grid gap-4 sm:gap-5 lg:grid-cols-[1.6fr_1fr]">
          {/* What's in my dock */}
          <div className="relative rounded-2xl bg-[var(--dark-bg)] text-[var(--dark-foreground)] p-7 sm:p-9 min-h-[300px] sm:min-h-[360px] flex flex-col overflow-hidden">
            <p className="text-xs uppercase tracking-widest text-[var(--dark-muted)]">
              [ Tools of trade ]
            </p>
            <h3 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              What&apos;s in my dock.
            </h3>
            <div className="mt-auto pt-12 overflow-hidden">
              <div className="dock-track flex gap-2 whitespace-nowrap">
                {[...dock, ...dock].map((d, i) => (
                  <span
                    key={`${d.name}-${i}`}
                    aria-hidden={i >= dock.length}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm border ${
                      d.primary
                        ? "bg-[var(--accent)] text-black border-transparent font-semibold"
                        : "bg-white/[0.06] text-[var(--dark-foreground)] border-white/10"
                    }`}
                  >
                    <span className="font-medium">{d.name}</span>
                    <span
                      className={
                        d.primary ? "text-black/70" : "text-[var(--dark-muted)]"
                      }
                    >
                      · {d.note}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="rounded-2xl bg-[var(--card-builder)] p-7 sm:p-9 min-h-[300px] sm:min-h-[360px] flex flex-col text-black">
            <p className="text-xs uppercase tracking-widest text-black/60">
              [ Education ]
            </p>
            <div className="mt-3">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {edu.degree}
              </h3>
              <p className="mt-3 text-sm sm:text-base font-medium text-black/85">
                {edu.discipline}
              </p>
            </div>
            <div className="mt-auto pt-8">
              <p className="text-sm font-semibold">
                {edu.school.replace(", Kolkata", "")}
              </p>
              <p className="text-xs text-black/60 mt-1">
                Kolkata · {edu.period}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row: Beyond work (narrow) + Hobby grid (wide) */}
        <div className="mt-4 sm:mt-5 grid gap-4 sm:gap-5 lg:grid-cols-[1fr_2fr]">
          {/* Beyond work */}
          <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-7 sm:p-9 min-h-[260px] flex flex-col">
            <p className="text-xs uppercase tracking-widest text-foreground-soft">
              [ Beyond work ]
            </p>
            <h3 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
              When I&apos;m not pushing pixels.
            </h3>
            <p className="mt-auto pt-8 text-sm text-foreground-muted">
              Five rituals that keep the creative engine running →
            </p>
          </div>

          {/* Hobby grid — 2 cols mobile, 4 cols × 2 rows desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
            {hobbies.map((h) => (
              <HobbyTile key={h.name} hobby={h} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HobbyTile({ hobby }: { hobby: HobbyItem }) {
  return (
    <div
      className={`rounded-2xl p-5 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between ${
        hobby.highlight
          ? "bg-[var(--card-signage)] text-black"
          : "bg-[var(--surface)] border border-[var(--border)] text-foreground"
      }`}
    >
      <HobbyIcon name={hobby.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
      <div>
        <p className="text-sm font-bold leading-tight">{hobby.name}</p>
        <p
          className={`text-xs mt-1 leading-tight ${
            hobby.highlight ? "text-black/70" : "text-foreground-muted"
          }`}
        >
          {hobby.note}
        </p>
      </div>
    </div>
  );
}

function HobbyIcon({ name, className = "" }: { name: string; className?: string }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true as const,
    className,
  };
  switch (name) {
    case "pencil":
      return <svg {...common}><path d="M3 21l3.5-1L19 7.5 16.5 5 4 17.5 3 21zm15-15.5L20.5 8 22 6.5 17.5 2 16 3.5l2 2z" /></svg>;
    case "music":
      return <svg {...common}><path d="M11 4v11.55A4 4 0 1 0 13 19V7h5V4h-7z" /></svg>;
    case "play":
      return <svg {...common}><path d="M6 4v16l14-8L6 4z" /></svg>;
    case "mountain":
      return <svg {...common}><path d="M12 3l10 18H2L12 3z" /></svg>;
    case "plane":
      return <svg {...common} viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5L21 16z" /></svg>;
    case "star":
      return <svg {...common}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
    default:
      return null;
  }
}
