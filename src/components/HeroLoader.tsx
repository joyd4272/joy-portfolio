import { sanityClient } from "@/sanity/client";
import { profile as fallback } from "@/data/portfolio";
import Hero from "./Hero";

type HeroProfile = {
  tagline: string; intro: string;
  currentRole: string; currentCompany: string;
  location: string; educationSchool: string;
};

const QUERY = `*[_type == "profile"][0] {
  tagline,
  intro,
  currentRole,
  currentCompany,
  location,
  "educationSchool": education.school
}`;

export default async function HeroLoader() {
  const data = await sanityClient.fetch<HeroProfile | null>(
    QUERY, {}, { next: { revalidate: 0 } }
  );
  const profile: HeroProfile = {
    tagline:         data?.tagline         ?? fallback.tagline,
    intro:           data?.intro           ?? fallback.intro,
    currentRole:     data?.currentRole     ?? fallback.currentRole,
    currentCompany:  data?.currentCompany  ?? fallback.currentCompany,
    location:        data?.location        ?? fallback.location,
    educationSchool: data?.educationSchool ?? fallback.education.school,
  };
  return <Hero profile={profile} />;
}
