import { sanityClient } from "@/sanity/client";
import { stats as fallback } from "@/data/portfolio";
import Stats from "./Stats";

type StatItem = { value: string; label: string };

const QUERY = `*[_type == "stat"] | order(order asc) { value, label }`;

export default async function StatsLoader() {
  const items = await sanityClient.fetch<StatItem[]>(QUERY, {}, { next: { tags: ["stat"], revalidate: false } });
  const stats = items.length ? items : fallback;
  return <Stats stats={stats} />;
}
