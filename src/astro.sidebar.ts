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
    label: "Inner Workings",
    autogenerate: { directory: "inner-workings" },
  },
] satisfies StarlightUserConfig["sidebar"];
