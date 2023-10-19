import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))
export default defineNuxtConfig({
  extends: ["@avapardaz/global-composables"],
  alias: {
    '@forms': join(currentDir, './')
  },
});
