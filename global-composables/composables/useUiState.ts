import { Ref } from "vue"
export const useUiState = (sharedKey = '') => {
    const defineRef = <K>(defaultValue: K, prefix = '') => {
        if (sharedKey) {
            return useState<K>(prefix + sharedKey, () => defaultValue) as Ref<K>
        }
        return ref<K>(defaultValue)
    }
    const model = defineRef<boolean>(false)
    const open = () => {
        model.value = true
    }
    const close = () => {
        model.value = false
    }
    const toggle = () => {
        if (model.value) {
            close()
        } else {
            open()
        }
    }
    const setState = (state: boolean) => {
        model.value = state
    }
    return { model, open, close, toggle, setState }
}