import { watchDebounced } from '@vueuse/core'
export const useWatchQuery=(onChange:Function,{ignore}:{ignore:string[]}={ignore:[]})=>{
  const route=useRoute();
  const getQuery=computed(()=>{
    const query={...route.query}
    ignore.forEach((item)=>{
      if(query[item]){
        delete query[item]
      }
    })
    return query;
  })
  watchDebounced(getQuery,(value,oldValue)=>{
    if(JSON.stringify(value)!=JSON.stringify(oldValue)){
      onChange(value,oldValue);
    }
  },{debounce:200,deep:true})
}
