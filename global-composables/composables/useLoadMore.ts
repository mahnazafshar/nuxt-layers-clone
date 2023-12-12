import { WithPagination } from "../utils/WithPagination";
import { useIntersectInfiniteScroll } from "./useInfinitScroll";

export const useLoadMore=(data:Ref<WithPagination<any>>,getList:(page:number)=>Promise<Ref<WithPagination<any>>>)=>{
  const appending=ref(false);
  const callback=()=>{
    if(appending.value){
      return;
    }
    if(!unref(data)?._meta){
      return;
    }
    if(unref(data)._meta.currentPage>=unref(data)._meta.pageCount){
      return;
    }
    const page=unref(data)._meta.currentPage+1;
    appending.value=true;
    return getList(page).then((response)=>{
      if(response?.items){
        data.value.items=[...data.value.items,...response.items]
        data.value._meta=response._meta
      }
    }).finally(()=>{
      appending.value=false
    })
  }
  const {target}=useIntersectInfiniteScroll(callback);

  return {target,appending}
}
