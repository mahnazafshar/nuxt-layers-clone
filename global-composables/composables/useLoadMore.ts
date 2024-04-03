import { WithPagination } from "../utils/WithPagination";
import { useIntersectInfiniteScroll } from "./useInfinitScroll";

export const useLoadMore=(data:Ref<WithPagination<any>>,getList:(page:number)=>Promise<Ref<WithPagination<any>>>)=>{
  const appending=ref(false);
  const isLastPage=computed(()=>unref(data)&&unref(data)._meta.currentPage>=unref(data)._meta.pageCount)
  const callback=()=>{
    if(appending.value){
      return;
    }
    if(!unref(data)?._meta){
      return;
    }
    if(unref(isLastPage)){
      return;
    }
    const page=unref(data)._meta.currentPage+1;
    appending.value=true;
    return getList(page).then((response)=>{
      if(response?.items){
        if(!data.value){
          data.value={}
          data.value.items=[]
        }
        data.value.items=[...data.value.items,...response.items]
        data.value._meta=response._meta
      }
    }).finally(()=>{
      appending.value=false
    })
  }
  const {target}=useIntersectInfiniteScroll(callback);
  return {target,appending,isLastPage}
}
