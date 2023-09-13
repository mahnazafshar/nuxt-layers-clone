import { ClassConstructor,plainToInstance, instanceToPlain } from "class-transformer";
import { FetchOptions } from "ofetch"
import qs from "qs";
import { useAuthStore } from "../auth/Auth.store";
export const useFetchApi = <R, T = {}>(classTransformer: ClassConstructor<T> = null as unknown as ClassConstructor<T>) => {
   const authStore=useAuthStore();
   const {$baseUrl}=useNuxtApp();
   const {showToast:toastMessage}=useToast();
   const showToast=(message:string)=>{
    toastMessage({message,type:ToastEnum.error})
   }
     const getValidationErrors = (e:Record<string,any>) => {
                    const errors = {} as Record<string, string>
                    if (e?.response?._data && Array.isArray(e.response._data)) {
                       //@ts-ignore
                        e.response._data.forEach(item => {
                            errors[item.field] = item.message;
                        });
                    }
                    return errors;
    }
    const fetchData= baseUseFetchApi<R>(authStore,{showToast,getValidationErrors,authRoute:"/auth",baseURL:$baseUrl.fullPath});
    return (url: string, config: FetchOptions = {}, customConfig: FetchCustomConfig = {})=>{
        if (customConfig.setToken) {
            if (!config.headers) {
                config.headers = {}
            }
            //@ts-ignore
            config.headers['Authorization'] = `Bearer ${authStore.getToken}`
        }
        if (config.params) {
            url = url + '?' + qs.stringify(config.params)
            delete config.params;
        }
        return fetchData(url,config,customConfig).then((response)=>{
            if (classTransformer != null) {
                const instance = plainToInstance(classTransformer, response, { excludeExtraneousValues: true })
                return instanceToPlain(instance, { excludeExtraneousValues: true }) as unknown as R
            }
            return response
        });
    }

}
