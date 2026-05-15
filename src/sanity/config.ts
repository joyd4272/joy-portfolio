import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const singletons = new Set(["profile", "siteSettings"]);

export default defineConfig({
  name: "joy-portfolio",
  title: "Joy Das — Portfolio",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Profile").id("profile")
              .child(S.document().schemaType("profile").documentId("profile")),
            S.listItem().title("Site Settings").id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            ...S.documentTypeListItems().filter((i) => !singletons.has(i.getId() ?? "")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
