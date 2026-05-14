import { defineField, defineType } from "sanity";

export default defineType({
  name: "journeyItem",
  title: "Journey Item",
  type: "document",
  fields: [
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "period", title: "Period", type: "string" }),
    defineField({ name: "current", title: "Current role?", type: "boolean", initialValue: false }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "role", subtitle: "company" } },
});
