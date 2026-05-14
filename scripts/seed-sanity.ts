/**
 * One-time seed script. Run with:
 *   npx tsx scripts/seed-sanity.ts
 *
 * Safe to rerun — documents that already exist are skipped with a warning.
 */

import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Load .env.local without requiring dotenv as a dependency
function loadEnv() {
  try {
    const content = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (key && !(key in process.env)) process.env[key] = val;
    }
  } catch { /* rely on actual env vars */ }
}
loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

import {
  profile, marquee, stats, skillsIntro, skills,
  journeySubtitle, journey, projectsIntro, projects,
  dock, hobbies, socials, nav,
} from "../src/data/portfolio";

type SeedDoc = { _type: string; [key: string]: unknown };

async function seedSingleton(doc: SeedDoc & { _id: string }) {
  const id = doc._id;
  if (await client.getDocument(id)) {
    console.warn(`⚠  Skipping "${id}" — already exists.`);
    return;
  }
  await client.create(doc);
  console.log(`✓  Created singleton "${id}".`);
}

async function seedCollection(typeName: string, docs: SeedDoc[]) {
  const count: number = await client.fetch(`count(*[_type == $type])`, { type: typeName });
  if (count > 0) {
    console.warn(`⚠  Skipping "${typeName}" — ${count} doc(s) already exist.`);
    return;
  }
  for (const doc of docs) await client.create(doc);
  console.log(`✓  Seeded ${docs.length} "${typeName}" doc(s).`);
}

async function main() {
  console.log("Seeding Sanity…\n");

  await seedSingleton({ _id: "profile", _type: "profile", ...profile });

  await seedSingleton({
    _id: "siteSettings", _type: "siteSettings",
    skillsIntro, journeySubtitle, projectsIntro,
  });

  await seedCollection("marqueeItem",
    marquee.map((label, i) => ({ _type: "marqueeItem", label, order: (i + 1) * 10 })));

  await seedCollection("stat",
    stats.map((s, i) => ({ _type: "stat", ...s, order: (i + 1) * 10 })));

  await seedCollection("skill",
    skills.map((s, i) => ({ _type: "skill", ...s, order: (i + 1) * 10 })));

  await seedCollection("journeyItem",
    journey.map((j, i) => ({ _type: "journeyItem", ...j, order: (i + 1) * 10 })));

  await seedCollection("project",
    projects.map((p, i) => ({ _type: "project", ...p, order: (i + 1) * 10 })));

  await seedCollection("dockTool",
    dock.map((d, i) => ({ _type: "dockTool", ...d, order: (i + 1) * 10 })));

  await seedCollection("hobby",
    hobbies.map((h, i) => ({ _type: "hobby", ...h, order: (i + 1) * 10 })));

  await seedCollection("socialLink",
    socials.map((s, i) => ({ _type: "socialLink", label: s.label, href: s.href, order: (i + 1) * 10 })));

  await seedCollection("navItem",
    nav.map((n, i) => ({ _type: "navItem", ...n, order: (i + 1) * 10 })));

  console.log("\nDone.");
}

main().catch((err) => { console.error(err); process.exit(1); });
