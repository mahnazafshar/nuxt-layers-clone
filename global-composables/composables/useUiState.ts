import { Ref } from "vue"
export const useUiState = (sharedKey = '',config:{closeOnUnmounted?:boolean,handleBackButton?:boolean}={}) => {
  const defineRef = <K>(defaultValue: K, prefix = '') => {
    if (sharedKey) {
      return useState<K>(prefix + sharedKey, () => defaultValue) as Ref<K>
    }
    return ref<K>(defaultValue)
  }
  const model = defineRef<boolean>(false)
  const resetKey = defineRef<number>(0,'-component-key-')
  const open = () => {
    model.value = true
  }

 onBeforeRouteLeave(()=>{
    if(config.handleBackButton&&unref(model)){
        close();
        return false;
    }
    return true;
 })

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
  const openWithReset=()=>{
    resetKey.value++;
    open();
  }
  const closeWithReset=()=>{
    resetKey.value++
    close();
  }
  onUnmounted(() => {
    if(config.closeOnUnmounted){
      close();
    }
  })
  return { model, open, close, toggle,openWithReset,closeWithReset, setState,resetKey }
}
