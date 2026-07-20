// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dansbeedesigns.com',

  // Pages are statically pre-rendered by default.
  // API routes and server pages opt in with: export const prerender = false
  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});