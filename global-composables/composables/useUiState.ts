import { Ref } from "vue"
export const useUiState = (sharedKey = '',config:{closeOnUnmounted?:boolean,handleBackButton?:boolean}={}) => {
  const defineRef = <K>(defaultValue: K, prefix = '') => {
    if (sharedKey) {
      return useState<K>(prefix + sharedKey, () => defaultValue) as Ref<K>
    }
    return ref<K>(defaultValue)
  }
  const model = defineRef<boolean>(false)
  const routerState=defineRef<number>(0,'-router-state')
  const resetKey = defineRef<number>(0,'-component-key-')
  const open = () => {
    model.value = true
    if(config.handleBackButton){
      routerState.value+=2
    window.history.pushState('backPressed', null, null);
    window.history.pushState('dummy', null, null);
    window.addEventListener('popstate', hide, { once: true });
    }
  }

  const hide = function(event:any) {
    if (event.state == 'backPressed') {
      routerState.value--
     close();
    }
  };
  watch(model,(value)=>{
    // console.log("unref(routerState)",unref(routerState))
    if(unref(routerState)>0&&!value){
      // console.log("back**********")
      window.history.go(-1*unref(routerState))
      routerState.value=0
    }
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
