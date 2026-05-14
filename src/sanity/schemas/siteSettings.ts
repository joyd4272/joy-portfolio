import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "skillsIntro", title: "Skills section intro", type: "text", rows: 2 }),
    defineField({ name: "journeySubtitle", title: "Journey section subtitle", type: "text", rows: 2 }),
    defineField({ name: "projectsIntro", title: "Projects section intro", type: "text", rows: 2 }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
