import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  alias: {
    '@core': join(currentDir, './')
  },
  modulesDir: [
    '../node-modules'
  ],
  build: {
    transpile: ['gsap'],
  }
})
