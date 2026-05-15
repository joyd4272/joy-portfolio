import { defineField, defineType } from "sanity";

export default defineType({
  name: "stat",
  title: "Stat",
  type: "document",
  fields: [
    defineField({ name: "value", title: "Value", type: "string" }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "value", subtitle: "label" } },
});
