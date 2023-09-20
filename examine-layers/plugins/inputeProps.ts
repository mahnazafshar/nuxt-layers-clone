import { NuxtApp } from "nuxt/schema"

export default defineNuxtPlugin(({ $t }) => {
    const getInputProps = (name: string) => {
        return {
            placeholder: $t('placeholder', { field: $t(name) }),
            name,
            label: $t(name)
        }
    }
    return {
        provide: {
            getInputProps
        }
    }
})