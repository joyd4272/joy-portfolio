import { defineField, defineType } from "sanity";

export default defineType({
  name: "dockTool",
  title: "Dock Tool",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "note", title: "Note", type: "string" }),
    defineField({ name: "primary", title: "Primary?", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "note" } },
});
