import { defineField, defineType } from "sanity";

export default defineType({
  name: "marqueeItem",
  title: "Marquee Item",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label", subtitle: "order" } },
});
