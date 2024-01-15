export const useIsAuthRoute=()=>{
  const appConfig = useAppConfig()
  const authRoutesArray=appConfig.authRoutes||[] as unknown[];
  const isAuthRoute = (path: string): boolean => {
    return authRoutesArray.some((item) => {
        if (item.regex) {
            const re = new RegExp(item.regex.join('|'), 'g')
            return re.test(path)
        } else {
            return item === path
        }
    })
}
return {isAuthRoute}
}
