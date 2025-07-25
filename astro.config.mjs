import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";
import { sidebar } from "./src/astro.sidebar";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.kommentar.dev",
  trailingSlash: "never",
  integrations: [
    starlight({
      editLink: {
        baseUrl: "https://github.com/kommentar/docs/edit/main",
      },
      plugins: [
        catppuccin({
          dark: {
            flavor: "mocha",
            accent: "lavender",
          },
          light: {
            flavor: "latte",
            accent: "lavender",
          },
        }),
      ],
      pagefind: {
        ranking: {
          termSimilarity: 20,
        },
      },
      title: "Kommentar",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/kommentar",
        },
      ],
      sidebar,
    }),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "one-dark-pro",
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        },
      ],
    ],
  },
});
