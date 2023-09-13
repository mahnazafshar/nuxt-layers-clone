import { PROXY_CONFIG } from "./composables/api/api.config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: [
    "../global-composables",
    "../base-api",
  ],
  modules: [
    '@pinia/nuxt',
  ],
  nitro: {
    devProxy: PROXY_CONFIG,
    compressPublicAssets: true,
    prerender: {
        crawlLinks: true
    }
}
})
