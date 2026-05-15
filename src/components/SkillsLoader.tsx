import { sanityClient } from "@/sanity/client";
import { skills as fallbackSkills, skillsIntro as fallbackIntro } from "@/data/portfolio";
import Skills from "./Skills";

type SkillItem = { title: string; body: string; tags: string[] };

const SKILLS_QUERY = `*[_type == "skill"] | order(order asc) { title, body, tags }`;
const INTRO_QUERY  = `*[_type == "siteSettings"][0] { skillsIntro }.skillsIntro`;

export default async function SkillsLoader() {
  const [items, intro] = await Promise.all([
    sanityClient.fetch<SkillItem[]>(SKILLS_QUERY, {}, { next: { tags: ["skill"], revalidate: false } }),
    sanityClient.fetch<string | null>(INTRO_QUERY, {}, { next: { tags: ["siteSettings"], revalidate: false } }),
  ]);
  return (
    <Skills
      skills={items.length ? items : fallbackSkills}
      skillsIntro={intro ?? fallbackIntro}
    />
  );
}
