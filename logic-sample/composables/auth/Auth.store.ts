import { acceptHMRUpdate, defineStore } from 'pinia'
import { AuthState, AuthTokens } from '~/composables/auth/Auth.interface';
import { useRefreshTokenService } from './useRefreshToken.service';
const defaultState = (): AuthState => ({
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
    isRefreshing: false,
    isRefreshSuccess: false,
    // identity: {} as Identity,
})
export const useAuthStore = defineStore('auth', {
    state: defaultState,
    getters: {
        isLoggedIn(state) {
            return state.accessToken !== null
        },
        getToken(state) {
            return state.accessToken
        },
        getLocalStoreAccessToken(): string {
            const local = localStorage.getItem('token');
            if (local) {
                return JSON.parse(local).accessToken
            } else {
                return ""
            }
        },
        getRefreshToken(state) {
            return state.refreshToken
        },
        getExpiresIn(state) {
            return state.expiresIn
        }
    },
    actions: {
        initialStateFromLocalStore() {
            const token = localStorage.getItem('token')
            if (token) {
                this.setToken(JSON.parse(token), false)
            }
        },
        fetchAndSetIdentityIfLoggedIn() {
            // const fetchIdentity = useIdentityService();
            // if (this.isLoggedIn) {
            //     fetchIdentity().then((response) => {
            //         if (response != undefined) {
            //             this.setIdentity(response);
            //         }
            //     });
            // }
        },
        setToken({ accessToken, refreshToken, expiresIn }: AuthTokens, setLocalStorage = true) {
            this.accessToken = accessToken
            this.refreshToken = refreshToken
            this.expiresIn = expiresIn
            setLocalStorage && localStorage.setItem('token', JSON.stringify({ accessToken, refreshToken, expiresIn }))
        },
        clearStore(deleteLocalToken = true) {
            Object.assign(this, defaultState())
            deleteLocalToken && localStorage.removeItem('token');
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
        }
    },
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))