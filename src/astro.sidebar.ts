import type { StarlightUserConfig } from "@astrojs/starlight/types";

export const sidebar = [
  {
    label: "Getting Started",
    slug: "getting-started",
  },
  {
    label: "Deploy",
    autogenerate: { directory: "deploy" },
  },
  {
    label: "Reference",
    autogenerate: { directory: "reference" },
  },
  {
    label: "Under the Hood",
    autogenerate: { directory: "under-the-hood" },
  },
] satisfies StarlightUserConfig["sidebar"];
