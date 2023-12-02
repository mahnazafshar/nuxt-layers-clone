import {useScreen} from "./useScreen"
export const useScreenHydrationFriendly=()=>{
  const screen=useScreen()
  const {isMobile}=useDevice();
  const smallerThanLg=ref(unref(isMobile));
  onMounted(() => {
    watch(
      screen.smallerThanLg,
      (v) => {
        smallerThanLg.value = v
      },
      { immediate: true, flush: 'sync' },
    )
  })
  return {smallerThanLg}
}
