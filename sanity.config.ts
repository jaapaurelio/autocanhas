import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { markdownSchema } from "sanity-plugin-markdown";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  name: "Auto_Canhas_Studio",
  title: "auto-canhas",

  projectId,
  dataset,

  plugins: [deskTool(), visionTool(), markdownSchema()],

  schema: {
    types: schemaTypes,
  },
});
