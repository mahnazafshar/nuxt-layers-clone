// import { watchPausable } from '@vueuse/core'
interface ValueToRoutesConfig{
  mergeParams?:boolean,
  mergeQuery?:boolean,
  removeQueryOnParamsChange?:boolean,
  pushOnParamsChange?:boolean,
  queryKeysToKeep?:string[]
}

const removeEmpty = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
};
export const useRouteForm=(onChange=()=>{})=>{
  const route=useRoute();
  const routeParams=Object.keys(route.params)
  const { handleSubmit, values,setValues,setFieldValue,meta,resetForm } = useForm({initialValues:{...route.query,...route.params}});
  const resetValues=()=>{
    Object.keys(unref(values)).forEach((value)=>{
      setFieldValue(value,undefined)
    })
  }
  const splitQueryAndParams=computed(()=>{
    const params:Record<string,any>={}
    const query:Record<string,any>={}
    for(const key in unref(values)){
      if(routeParams.includes(key)){
        params[key]=unref(values)[key]
      }else{
        query[key]=unref(values)[key]
      }
    }

    return {params:removeEmpty(params),query:removeEmpty(query)}
  })

  const setValuesToRoute=(navigateConfig={replace:true},config:ValueToRoutesConfig={}):Promise<boolean>=>{
    config={mergeParams:true,mergeQuery:false,removeQueryOnParamsChange:true,pushOnParamsChange:true,...config}
    const newParams=config.mergeParams?{...route.params,...unref(splitQueryAndParams).params}:unref(splitQueryAndParams).params
    let newQuery=config.mergeQuery?{...route.query,...unref(splitQueryAndParams).query}:unref(splitQueryAndParams).query;
    const paramsChanged=JSON.stringify(route.params)!==JSON.stringify(newParams);
    if(paramsChanged&&config.removeQueryOnParamsChange){
      newQuery={}
    }
    if(config.queryKeysToKeep){
      config.queryKeysToKeep.forEach((item)=>{
        if(route.query[item]){
          newQuery[item]=route.query[item]
        }
      })
    }
    // console.log("setValues called",newParams)
   return new Promise((resolve)=>{
    navigateTo({
      params:newParams,
      query:newQuery
    },{...navigateConfig,...(paramsChanged&&config.pushOnParamsChange?{replace:false}:{})}).then((response)=>{
      // console.log("resolved")
      resolve(response==undefined)
    })
   })

  }
     watch(
        values,
        () => {
         if(meta.value.dirty){
           onChange();
         }
        },
        { deep: true }
      );

      // const initialPath=useState(route.name+'--pause-route',()=>route.path)
      // if(initialPath.value==route.path){
      //   pause();
      // }
        // if(!pausedOnce.value){
        //   pausedOnce.value=true;
        // }

    //  watch(meta,()=>{
    //   console.log("dirty",meta.value.dirty)
    //   if(meta.value.dirty){
    //     resume();
    //   }
    //  })



  return {handleSubmit,values,setValues,setFieldValue,setValuesToRoute,resetForm,resetValues}
}
