import { useIntersectionObserver } from '@vueuse/core'
export const useIntersectInfiniteScroll=(callback:Function)=>{
  const target = ref(null)
  const targetIsVisible = ref(false)

  const { stop,isActive, pause, resume  } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      targetIsVisible.value = isIntersecting
    },
  )
  pause();
  onMounted(() => {
    setTimeout(()=>{
      resume()
    },2000)
  })
  watch(targetIsVisible,(value)=>{
    if(value){
      callback();
    }
  })
  return {
    target,
    stop,
    resume,
    isActive
  }
}
