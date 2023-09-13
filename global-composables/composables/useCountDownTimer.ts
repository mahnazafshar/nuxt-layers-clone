import { useIntervalFn } from "@vueuse/core";
interface CONFIG{
  withDay?:boolean;
  emit?:any
}
export const useCountDownTimer=(sec:Ref<number>|number,config:CONFIG={})=>{
  const now=ref(new Date());
  const endDate=computed(()=>{
    return new Date(Date.now() + unref(sec) * 1000)
  });
  const days=computed(()=>{
    if(!config?.withDay){
      return 0;
    }
    const d = Math.trunc((unref(endDate).valueOf() - unref(now).valueOf()) / 1000 / 86400)
    return d > 9 ? d : '0' + d
  })
  const hours=computed(()=>{
    let h
    if (config?.withDay) {
      h = Math.trunc((unref(endDate).valueOf() -  unref(now).valueOf()) / 1000 / 3600) % 24
    } else{
      h = Math.trunc((unref(endDate).valueOf() -  unref(now).valueOf()) / 1000 / 3600)
    }
    return h > 9 ? h : '0' + h
  })
  const minutes=computed(()=>{
    const m = Math.trunc((unref(endDate).valueOf() -  unref(now).valueOf()) / 1000 / 60) % 60
    return m > 9 ? m : '0' + m
  })
  const seconds=computed(()=>{
    const s = Math.trunc((unref(endDate).valueOf() -  unref(now).valueOf()) / 1000) % 60
    return s > 9 ? s : '0' + s
  })
  const {pause}=useIntervalFn(() => {
    now.value = new Date()
    if (unref(now) > unref(endDate)) {
      config?.emit?.('endTime')
      pause?.();
    }
  }, 1000)
  return {days,hours,minutes,seconds}
}
