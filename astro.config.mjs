import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { sidebar } from "./src/astro.sidebar";

// https://astro.build/config
export default defineConfig({
  site: "https://kommentar.safwanyp.com",
  base: "/docs",
  trailingSlash: "never",
  integrations: [
    starlight({
      title: "Kommentar",
      social: {
        github: "https://github.com/kommentar",
      },
      sidebar,
    }),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "one-dark-pro",
      langs: ["javascript", "typescript"],
    },
    rehypePlugins: [
      [
        "rehype-external-links",
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        },
      ],
    ],
  },
});
