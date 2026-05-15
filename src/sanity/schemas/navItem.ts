import { defineField, defineType } from "sanity";

export default defineType({
  name: "navItem",
  title: "Nav Item",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href", title: "Href", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "label", subtitle: "href" } },
});
