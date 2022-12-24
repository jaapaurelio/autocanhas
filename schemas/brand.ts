import { defineType } from "sanity";

const brand = defineType({
  name: "brand",
  type: "document",
  title: "Marcas",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Título",
      description: "ex: Renault",
    },
    {
      name: "image",
      type: "image",
      title: "Logotipo",
    },
  ],
});

export default brand;
