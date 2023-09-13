// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url);
export default defineNuxtConfig({
  alias: {
    '@core': resolve('./')
  },
  modulesDir: [
    '../node-modules'
  ],
  build: {
    transpile: ['gsap'],
  }
})
