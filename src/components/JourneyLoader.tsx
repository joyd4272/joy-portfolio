import { sanityClient } from "@/sanity/client";
import { journey as fallbackJourney, journeySubtitle as fallbackSubtitle } from "@/data/portfolio";
import Journey from "./Journey";

type JourneyItem = {
  role: string; company: string; location: string;
  period: string; current?: boolean; bullets: string[];
};

const JOURNEY_QUERY  = `*[_type == "journeyItem"] | order(order asc) { role, company, location, period, current, bullets }`;
const SUBTITLE_QUERY = `*[_type == "siteSettings"][0] { journeySubtitle }.journeySubtitle`;

export default async function JourneyLoader() {
  const [items, subtitle] = await Promise.all([
    sanityClient.fetch<JourneyItem[]>(JOURNEY_QUERY, {}, { next: { tags: ["journeyItem"], revalidate: false } }),
    sanityClient.fetch<string | null>(SUBTITLE_QUERY, {}, { next: { tags: ["siteSettings"], revalidate: false } }),
  ]);
  return (
    <Journey
      journey={items.length ? items : fallbackJourney}
      journeySubtitle={subtitle ?? fallbackSubtitle}
    />
  );
}
