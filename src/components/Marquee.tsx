import { sanityClient } from "@/sanity/client";
import { marquee as fallback } from "@/data/portfolio";

const QUERY = `*[_type == "marqueeItem"] | order(order asc) { label }`;

export default async function Marquee() {
  const items = await sanityClient.fetch<{ label: string }[]>(QUERY, {}, { next: { revalidate: 0 } });
  const labels = items.length ? items.map((i) => i.label) : fallback;

  return (
    <div className="bg-foreground text-background">
      <div className="marquee-viewport py-6 sm:py-7">
        <div className="marquee-track">
          <Row labels={labels} />
          <Row labels={labels} aria-hidden />
        </div>
      </div>
    </div>
  );
}

function Row({ labels, "aria-hidden": ariaHidden }: { labels: string[]; "aria-hidden"?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex items-center gap-10 sm:gap-14 pr-10 sm:pr-14 text-sm tracking-[0.28em] uppercase whitespace-nowrap"
    >
      {labels.map((label, i) => (
        <li
          key={`${label}-${i}`}
          className="inline-flex items-center gap-10 sm:gap-14"
        >
          <span className="text-background font-medium">{label}</span>
          <Star className="h-3 w-3 text-[var(--accent)] shrink-0" />
        </li>
      ))}
    </ul>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M12 2 L14.5 9 L22 9 L16 13.5 L18.3 21 L12 16.6 L5.7 21 L8 13.5 L2 9 L9.5 9 Z"
        fill="currentColor"
      />
    </svg>
  );
}
