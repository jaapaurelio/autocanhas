import { defineType } from "sanity";

export const extra = defineType({
  name: "extra",
  type: "document",
  title: "Extras",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Extra",
    },
  ],
});

export default extra;
