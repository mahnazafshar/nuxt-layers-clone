export default defineNuxtPlugin((app)=>{
    const headers=useRequestHeaders(['host'])
    const runTimeConfig=useRuntimeConfig();
    const prefix = isDevMode
    ? 'http://'
    : app.$config.protocol || 'https://'
  const myHost = process.server ? headers.host! : window.location.host
  const baseHost = prefix + myHost
  const myBaseUrl:string = runTimeConfig.baseUrl || baseHost + '/service/api/web'
    return {
        provide:{
            'baseUrl': { 'magPath': baseHost + '/mag', 'fullPath': myBaseUrl }
        }
    }
})
