import { FetchError, FetchOptions } from "ofetch"
import { FetchCustomConfig } from "../utils/FetchCustomConfig.interface";
type ShowToast =(message:string)=>void
type GetValidationErrors=(e:{response?:{_data?:any},[key:string]:any})=>Record<string,string>
interface BaseConfig{
  showToast:ShowToast;
  getValidationErrors:GetValidationErrors;
  baseURL:string;
  authRoute:string;
}
interface AuthStore{
 clearStore:()=>void;
 isLoggedIn:boolean;
 isRefreshing:boolean;
 isRefreshSuccess:boolean;
 doRefreshToken:()=>void;
 addTokenToConfig:(config:Record<string,any>)=>Record<string,any>;
}
export const baseUseFetchApi = <R>(authStore:AuthStore,{showToast,getValidationErrors,baseURL="",authRoute="/auth"}:BaseConfig) => {
    const router = useRouter();
    const myCustomFetch = (url: string, config: FetchOptions = {}, customConfig: FetchCustomConfig = {}) => {
        config = { baseURL,retry: 0, ...config }
        customConfig = { goToLogin: true, toastError: true, ...customConfig }
        //@ts-ignore
        return $fetch<R>(url, config)
            .then((res) => {
                const response = (customConfig.beforeResponse ? customConfig.beforeResponse(res) : res);
                return response as unknown as R
            })
            .catch((e) => {
                if (customConfig.debug && process.dev) {
                    throw Error(e);
                }
                customConfig.onError?.(e)
                if (customConfig.ignoreErrors&&  e.response.status !== 401) {
                    return;
                }

                if (e.response && e.response.status === 401) {
                    return handleRefreshToken(e, url, config, customConfig)?.catch((e) => {
                        // console.error("error in refresh", e)
                        authStore.clearStore();
                        goToLoginIfYouShould(customConfig);
                    }) as unknown as R;

                } else if (e.response && e.response.status == 422) {
                    // console.log("setErrors", customConfig.setErrors);
                    // console.log("getValidationErrors()", getValidationErrors())
                    if (customConfig.setErrors) {
                        customConfig.setErrors(getValidationErrors(e))
                    }
                    if (customConfig.onValidationFailed) {
                        customConfig.onValidationFailed(getValidationErrors(e), e);
                    }
                    if (customConfig.toastValidationFields) {
                        customConfig.toastValidationFields.forEach((item) => {
                            if (getValidationErrors(e)[item]) {
                                showToast(getValidationErrors(e)[item])
                            }
                        })
                    }
                    return;
                }
                else {
                  if(e.response && e.response.status && customConfig.messageByStatus?.[e.response.status]!=undefined){
                    showToast(customConfig.messageByStatus?.[e.response.status])
                  }else if ((config.method || '').toLowerCase() == 'get' || !config.method) {
                        showError({
                            statusMessage: e?.response?.statusText || 'خطای دریافت اطلاعات از سرور',
                            statusCode: e?.response?.status || 500,
                        })
                    } else if (customConfig.toastError) {
                        showToast(e?.response?.statusText || 'خطای دریافت اطلاعات از سرور')
                    }
                }
            })
    }
    function goToLoginIfYouShould(fetchCustomConfig: FetchCustomConfig) {
        if (fetchCustomConfig.goToLogin != false) {
            router.replace(authRoute);
        }
    }


    async function handleRefreshToken(e: FetchError, url: string, config: FetchOptions, customConfig: FetchCustomConfig) {

      if (!authStore.isLoggedIn) {
            console.error("send request that needs token while user is not logged in : ", url)
            return new Promise((_, reject) => {
                reject(e);
            })
        }
        if (!authStore.isRefreshing && !authStore.isRefreshSuccess) {
            authStore.doRefreshToken();
        }

        return new Promise((resolve, reject) => {
            if (authStore.isRefreshSuccess) {

                resolve(myCustomFetch(url, authStore.addTokenToConfig(config), customConfig))
            } else {
                watch(() => authStore.isRefreshing, (isRefreshing) => {
                    if (isRefreshing == false) {
                        if (authStore.isRefreshSuccess) {
                            resolve(myCustomFetch(url, authStore.addTokenToConfig(config), customConfig))
                        } else {
                            reject(e)
                        }
                    }
                })
            }

        })
    }
    return myCustomFetch
}
