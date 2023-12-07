import {useScreen} from "./useScreen"
export const useScreenHydrationFriendly=()=>{
  const screen=useScreen()
  const {isMobile,isMobileOrTablet}=useDevice();
  const smallerThanLg=ref(unref(isMobile));
  const lgAndSmaller=ref(unref(isMobileOrTablet));
  onMounted(() => {
    watch(
      screen.smallerThanLg,
      (v) => {
        smallerThanLg.value = v
      },
      { immediate: true, flush: 'sync' },
    )
    watch(
      screen.lgAndSmaller,
      (v) => {
        lgAndSmaller.value = v
      },
      { immediate: true, flush: 'sync' },
    )
  })
  return {smallerThanLg,lgAndSmaller}
}
