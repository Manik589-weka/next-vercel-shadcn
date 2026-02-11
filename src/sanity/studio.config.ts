import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "@/sanity/schema";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your_project_id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema,
});
