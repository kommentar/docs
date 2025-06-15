import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";
import { sidebar } from "./src/astro.sidebar";

// https://astro.build/config
export default defineConfig({
  site: "https://kommentar.safwanyp.com",
  base: "/docs",
  trailingSlash: "never",
  integrations: [
    starlight({
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
