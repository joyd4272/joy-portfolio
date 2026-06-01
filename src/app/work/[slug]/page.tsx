import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Each entry = one case study page.
// Images are served from /public/work/{slug}/ and stacked top-to-bottom.
// To add or reorder shots: drop files into public/work/{slug}/ and update `images`.
const CASE_STUDIES = {
  builder: {
    title: "Builder",
    category: "Product design — SaaS",
    images: Array.from({ length: 22 }, (_, i) =>
      `${String(i + 1).padStart(2, "0")}.png`
    ),
  },
  "way-finder": {
    title: "Way Finder",
    category: "Wayfinding system",
    images: Array.from({ length: 10 }, (_, i) =>
      `${String(i + 1).padStart(2, "0")}.png`
    ),
  },
  clarity: {
    title: "Clarity",
    category: "Brand & identity",
    images: ["01.png"],
  },
  "digital-signage": {
    title: "Digital Signage",
    category: "Content management",
    images: Array.from({ length: 18 }, (_, i) =>
      `${String(i + 1).padStart(2, "0")}.png`
    ),
  },
  one: {
    title: "One",
    category: "Mobile product",
    images: ["01-one.png"],
  },
} as const satisfies Record<
  string,
  { title: string; category: string; images: readonly string[] }
>;

type Slug = keyof typeof CASE_STUDIES;

export function generateStaticParams() {
  return (Object.keys(CASE_STUDIES) as Slug[]).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES[slug as Slug];
  if (!study) return { title: "Work — Joy Das" };
  return {
    title: `${study.title} — Joy Das`,
    description: `${study.title}: ${study.category}.`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug as Slug];
  if (!study) notFound();

  return (
    <main className="bg-black text-white">
      {/* Single CTA — back to the portfolio home */}
      <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/75 bg-black/90 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 sm:py-5">
          <Link
            href="/"
            className="cta-link inline-flex items-center text-sm sm:text-base font-medium text-white"
          >
            <span className="cta-link__arrow mr-1" aria-hidden>
              ←
            </span>
            Back to home
          </Link>
        </div>
      </div>

      {/* Tiny title block so the page has a label */}
      <header className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 pb-6 sm:pb-10">
        <p className="text-xs tracking-widest uppercase text-white/60">
          {study.category}
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
          {study.title}
        </h1>
      </header>

      {/* Vertical image stack */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-20 sm:pb-28 space-y-4 sm:space-y-6">
        {study.images.map((file, i) => (
          <figure
            key={file}
            className="overflow-hidden rounded-xl bg-neutral-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/work/${slug}/${file}`}
              alt={`${study.title} — frame ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="block w-full h-auto"
            />
          </figure>
        ))}
      </div>
    </main>
  );
}
