// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dansbeedesigns.com',

  // 'server' mode: all routes go through the Cloudflare Worker.
  // This avoids the reserved ASSETS binding conflict in Pages prerender configs.
  // Static files in /public and built assets are still served directly by the CDN.
  output: 'server',
  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});