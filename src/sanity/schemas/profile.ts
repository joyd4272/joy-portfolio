import { defineField, defineType } from "sanity";

export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 3 }),
    defineField({ name: "intro", title: "Intro line", type: "string" }),
    defineField({ name: "currentRole", title: "Current role", type: "string" }),
    defineField({ name: "currentCompany", title: "Current company", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "availability", title: "Availability text", type: "string" }),
    defineField({ name: "resumeUrl", title: "Résumé URL / path", type: "string" }),
    defineField({ name: "portfolioUrl", title: "Portfolio URL", type: "url" }),
    defineField({
      name: "education",
      title: "Education",
      type: "object",
      fields: [
        defineField({ name: "school", title: "School", type: "string" }),
        defineField({ name: "degree", title: "Degree", type: "string" }),
        defineField({ name: "discipline", title: "Discipline", type: "string" }),
        defineField({ name: "period", title: "Period", type: "string" }),
      ],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});
