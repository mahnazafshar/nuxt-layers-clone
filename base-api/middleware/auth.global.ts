export default defineNuxtRouteMiddleware((to) => {
  const appConfig=useAppConfig();
  if(!appConfig.authRoutes||(Array.isArray(appConfig.authRoutes)&&appConfig.authRoutes.length==0)){
    return;
  }
  const authStore = useAuthStore()
  const targetPath=useCookie(appConfig.targetAuthPathKey||'--target-auth-path--')
   const {isAuthRoute}=useIsAuthRoute();
    if (process.client) {
        const hasAccess = authStore.isLoggedIn || !isAuthRoute(to.path)
        if (!hasAccess) {
          targetPath.value=to.fullPath;
            return navigateTo({path:appConfig.authRoute ||appConfig.loginRoute||"/login"})
        }
    }
    return;
})
