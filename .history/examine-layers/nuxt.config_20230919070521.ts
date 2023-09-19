// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [
    "../base-diasy-ui",
    "../base",
    "../global-composables",
    "../diasy-forms",
    "../logic-sample",
  ],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        dir: "rtl",
      },
      title: "title",
      charset: "utf-8",
      meta: [],
      link: [],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
