# Nuxt fetch with automatic error handling

**Features**

- integration with vee-validate version 4
- handle api errors simply
- handle refresh_token on 401 (with support parallel requests)

## install

First install it:

```bash
npm i @avapardaz/base-api
```

## config your store
your store should implement this functionality:
```javascript
interface AuthStore{
 clearStore:()=>void;
 isLoggedIn:boolean;
 isRefreshing:boolean;
 isRefreshSuccess:boolean;
 doRefreshToken:()=>void;
 addTokenToConfig:(config:Record<string,any>)=>Record<string,any>;
}
```
we recommend [Pinia](https://pinia.vuejs.org/)

here it's an example:
```javascript
import { defineStore } from 'pinia'
import { AuthState, AuthTokens } from '../../composables/auth/Auth.interface';
import { useRefreshTokenService } from './useRefreshToken.service';
import { useStorage } from '@vueuse/core';
const defaultState = (): AuthState => ({
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  isRefreshing: false,
  isRefreshSuccess: false,
})
export const useAuthStore = defineStore('auth', {
  state: defaultState,
  getters: {
    isLoggedIn(state) {
      // return false
      return state.accessToken !== null
    },
    getToken(state) {
      return state.accessToken
    },
    getRefreshToken(state) {
      return state.refreshToken
    },
    getExpiresIn(state) {
      return state.expiresIn
    },
  },
  actions: {
    initialStateFromLocalStore() {
      const token = localStorage.getItem(this.getLocalStorageKey)
      if (token) {
        this.setToken(JSON.parse(token), false)
      }
    },
    
    setToken({ accessToken, refreshToken, expiresIn }: AuthTokens, setLocalStorage = true) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.expiresIn = expiresIn||0
      setLocalStorage && localStorage.setItem(this.getLocalStorageKey, JSON.stringify({ accessToken, refreshToken, expiresIn }))
    },
    clearStore() {
      Object.assign(this, defaultState())
      localStorage.removeItem(this.getLocalStorageKey);
      this.decrementActiveAccountIndexIfShould();
    },
   
    doRefreshToken() {
      this.isRefreshing = true;
      const service = useRefreshTokenService();
      return service(this.refreshToken!).then((response) => {
        if (response != undefined) {
          this.setToken(response.tokens, true);
          this.isRefreshSuccess = true;
          return response;
        }
      }).finally(() => {
        this.isRefreshing = false;
      })
    },
    addTokenToConfig(config: Record<string, any>) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers['Authorization'] = `Bearer ${this.getToken}`
      return config
    }
  },
})

```
## load token to user store
we strongly recommend avoid load token server side, you don't need it in the server, the reason for this is you can cache any page you want without concerning about caching specific user token for all users!
create a client plugin:
```javascript
//auth.client.ts
import { useAuthStore } from "../composables/auth/Auth.store"
export default defineNuxtPlugin(({ pinia }) => {
    const authStore = useAuthStore(pinia)
    authStore.initialStateFromLocalStore()
})

```

## wrap main composable

we already add class-transformer if you don't need it just remove this part of code 

```javascript
import {ClassConstructor, plainToInstance, instanceToPlain} from "class-transformer";
import {FetchOptions} from "ofetch"
import qs from "qs";
import {useAuthStore} from "../auth/Auth.store";

export const useFetchApi = <R, T = {}>(classTransformer: ClassConstructor<T> = null as unknown as ClassConstructor<T>) => {
  const authStore = useAuthStore();
  const {showToast: toastMessage} = useToast();//custom toast
  const showToast = (message: string) => {
    toastMessage({message, type: ToastEnum.error})
  }
  const getValidationErrors = (e: Record<string, any>) => {//in order to integrate with vee-validate should return server validation errors on key vlaue format, you should pass setErrors in customConfig to automatically setErros when statusCode is 422
    const errors = {} as Record<string, string>
    if (e?.response?._data && Array.isArray(e.response._data)) {
      //@ts-ignore
      e.response._data.forEach(item => {
        errors[item.field] = item.message;
      });
    }
    return errors;
  }
  const fetchData = baseUseFetchApi<R>(authStore, {
    showToast,
    getValidationErrors,
    authRoute: "/auth",
    baseURL: 'your base url'
  });
  return (url: string, config: FetchOptions = {}, customConfig: FetchCustomConfig = {}) => {
    if (config.params) {//format query params with qs package optioanl
      url = url + '?' + qs.stringify(config.params)
      delete config.params;
    }
    return fetchData(url, config, customConfig).then((response) => {
      if (classTransformer != null) {
        const instance = plainToInstance(classTransformer, response, {excludeExtraneousValues: true})
        return instanceToPlain(instance, {excludeExtraneousValues: true}) as unknown as R
      }
      return response
    });
  }

}

```
`customConfig` gives you this options handled by baseUseFetchApi

```javascript
import { FetchError } from "ofetch";
export interface FetchCustomConfig {
    setToken?: boolean;
    ignoreErrors?: boolean;
    onError?: (e: FetchError,parsedError?:{statusMessage:string,statusCode:number}) => void;
    onValidationFailed?: (errors: Record<string, string>, e: FetchError) => void;
    toastError?: boolean;
    setErrors?: (errors: { [key: string]: string }) => void;
    // transformer?: (data: any) => any;
    goToLogin?: boolean;
    beforeResponse?: Function;
    debug?: boolean;
    toastValidationFields?: string[];
    messageByStatus?:Record<number,string>
}

```

## Example

```javascript
export const useCartListService = () => {
  const fetchData = useFetchApi<CartInterface>();
  return () =>
  fetchData(CART_URLS.cartList.url, {
    method: "get",
    params:CART_URLS.cartList.defaultParams
  },{setToken:true});
}
```

## CheckAuthRoutes (optional)
first make sure using pinia for authStore and your composable name is exactly `useAuthStore` and [auto import](https://pinia.vuejs.org/ssr/nuxt.html#Auto-imports) by nuxt, then inside app.config.ts in your root project:

```javascript
export default defineAppConfig({
  'base-api': {//use for default error message when statusMessage is not specified
    defaultErrorMessage: 'خطای دریافت اطلاعات از سرور'
  },
  
  authRoute: "/some-landing-page", //first priority for redirect for auth.global.ts
  loginRoute: "/login", //login route considered if authRoute not defined
  authRoutes: [
    // "/shipping",
    { regex: [/^((?!complete-information|page\/*|order-in-person|contact-us|about-us|home|validation|landing|login|oauth\/callback).)*$/.source] },//array of regex this example all routes is auth routes exept mentioned one
  ],
  targetAuthPathKey: "--login-path-useCookie--", //const targetPath=useCookie(appConfig.targetAuthPathKey) if you need redirect user after logged in to his desier route
})
```
because we check auth routes client side make sure for auth routes your pages are rendering client side in order to avoid server side rendered html show and then redirect:

```javascript
//app.vue
<template>
  <div>
    <template v-if="isAuthRoute($route.path)">
      <client-only>
        <nuxt-layout>
          <nuxt-page></nuxt-page>
        </nuxt-layout>
      </client-only>
    </template>
    <template v-else>
      <nuxt-layout>
        <nuxt-page></nuxt-page>
      </nuxt-layout>
    </template>
  </div>
</template>
<script setup lang="ts">
const {isAuthRoute}=useIsAuthRoute()
</script>
```
