// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      sentry: {
        dsn: '',
        environment: 'development',
        serverOptions:{},
        clientOptions:{}
      }
    }
  },
  devtools: { enabled: true },
  build:{transpile:['@sentry/vue']}
})
