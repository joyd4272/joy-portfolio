import { sanityClient } from "@/sanity/client";
import { nav as fallback } from "@/data/portfolio";
import Header from "./Header";

type NavItem = { label: string; href: string };

const QUERY = `*[_type == "navItem"] | order(order asc) { label, href }`;

export default async function HeaderLoader() {
  const items = await sanityClient.fetch<NavItem[]>(
    QUERY, {}, { next: { tags: ["navItem"], revalidate: false } }
  );
  return <Header nav={items.length ? items : fallback} />;
}
