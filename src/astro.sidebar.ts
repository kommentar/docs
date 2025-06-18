import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const sidebar = [
  {
    label: "Getting Started",
    slug: "getting-started",
  },
  {
    label: "Reference",
    autogenerate: { directory: "reference" },
  },
  {
    label: "Deploy",
    autogenerate: { directory: "deploy" },
  },
  {
    label: "Under the Hood",
    autogenerate: { directory: "under-the-hood" },
  },
] satisfies StarlightUserConfig["sidebar"];
