import { watchDebounced } from '@vueuse/core'
interface ValueToRoutesConfig{
    mergeParams?:boolean,
    mergeQuery?:boolean,
    removeQueryOnParamsChange?:boolean,
    pushOnParamsChange?:boolean,
    queryKeysToKeep?:string[]
}

const removeEmpty = (obj:Record<string, any>) => {
    let newObj:Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
        else if (obj[key] !== undefined) newObj[key] = obj[key];
    });
    //removeRemainedEmptyObjects
   for(const key in newObj){
    const value=newObj[key]
    if(typeof value=='object'&&Object.keys(value).length === 0){
        delete newObj[key]
    }
   }
    return newObj;
};
const sortObject = (o:Record<string,any>) => Object.keys(o).sort().reduce((r:any, k) => (r[k] = o[k], r), {})
const isEqualObjects=(o1:Record<string,any>,o2:Record<string,any>)=>{
    // console.log("sortObject(o1)",sortObject(o1))
    // console.log("sortObject(o2)",sortObject(o2))
    // console.log("isEqual****************",JSON.stringify(sortObject(o1))===JSON.stringify(sortObject(o2)))
    return JSON.stringify(sortObject(o1))===JSON.stringify(sortObject(o2))
}
export const useRouteForm=(onChange=()=>{},initialValues:Record<string|number,any>={})=>{
    const route=useRoute();
    const routeParams=Object.keys(route.params)
    const initial=computed(()=>({...initialValues,...route.query,...route.params}))
    const { handleSubmit, values,setValues,resetForm,setFieldValue,meta } = useForm({initialValues:unref(initial)});
   const resetToInitial=()=>{
       resetForm({values:unref(initial)},{force:true})
   }
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

    let changeRouteOutSideTheForm=true;
    const setValuesToRoute=(navigateConfig={replace:true},config:ValueToRoutesConfig={}):Promise<boolean>=>{
       changeRouteOutSideTheForm=false
        config={mergeParams:true,mergeQuery:false,removeQueryOnParamsChange:true,pushOnParamsChange:true,...config}
        const newParams:Record<string,any>=config.mergeParams?{...route.params,...unref(splitQueryAndParams).params}:unref(splitQueryAndParams).params
        let newQuery:Record<string,any>=config.mergeQuery?{...route.query,...unref(splitQueryAndParams).query}:unref(splitQueryAndParams).query;
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
        for(const key in initialValues){//remove initialValues to prevent extra navigation
            if(newQuery[key]&&JSON.stringify(newQuery[key])==JSON.stringify(initialValues[key])){
                delete newQuery[key];
            }
            if(newParams[key]&&JSON.stringify(newParams[key])==JSON.stringify(initialValues[key])){
                delete newParams[key];
            }
        }
        const queryChanged=!isEqualObjects(route.query,newQuery);
        if(!paramsChanged&&!queryChanged){
            return new Promise((resolve)=>{
                resolve(false)
            });
        }
        return new Promise((resolve)=>{
            navigateTo({
                params:newParams,
                query:newQuery
            },{...navigateConfig,...(paramsChanged&&config.pushOnParamsChange?{replace:false}:{})}).then((response:any)=>{
                changeRouteOutSideTheForm=true;
                resolve(response==undefined)
            })
        })

    }
    watch(()=>route.query,()=>{
        if(changeRouteOutSideTheForm){
            resetToInitial()
        }
    })

    watchDebounced(
        values,
        () => {
            // console.log("changeRouteOutSideTheForm",changeRouteOutSideTheForm)
            if(meta.value.dirty){
                onChange();
            }
        },
        { deep: true,debounce:200 }
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



    return {handleSubmit,values,setValues,setFieldValue,setValuesToRoute,resetForm,resetValues,resetToInitial}
}
