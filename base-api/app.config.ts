export default defineAppConfig({
  'base-api': {
    defaultErrorMessage: 'internal server error'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    'base-api'?: {
      defaultErrorMessage?: string
    }
  }
}
