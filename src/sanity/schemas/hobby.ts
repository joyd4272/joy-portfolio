import { defineField, defineType } from "sanity";

export default defineType({
  name: "hobby",
  title: "Hobby",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "note", title: "Note", type: "string" }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Pencil", value: "pencil" },
          { title: "Music", value: "music" },
          { title: "Play", value: "play" },
          { title: "Mountain", value: "mountain" },
          { title: "Plane", value: "plane" },
          { title: "Star", value: "star" },
        ],
      },
    }),
    defineField({ name: "highlight", title: "Highlight?", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "note" } },
});
