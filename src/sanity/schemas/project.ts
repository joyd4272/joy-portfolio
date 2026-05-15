import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Number", type: "string" }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "blurb", title: "Blurb", type: "text", rows: 2 }),
    defineField({ name: "href", title: "Case study URL", type: "url" }),
    defineField({ name: "background", title: "Background color", type: "string" }),
    defineField({ name: "foreground", title: "Foreground color", type: "string" }),
    defineField({ name: "arrowBg", title: "Arrow background color", type: "string" }),
    defineField({ name: "arrowFg", title: "Arrow foreground color", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "category" } },
});
