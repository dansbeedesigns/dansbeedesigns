// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Fully static build. Dynamic API endpoints are handled by Cloudflare Pages Functions
// in the /functions directory — no adapter needed.
export default defineConfig({
  site: 'https://dansbeedesigns.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});