export const CLIENT_ID = ''
export const CLIENT_SECRET = ''
// export const PROXY_CONFIG = isProdMode ? {} : {
//     '/service': {
//         target: 'https://api.mobit.ir/api/web', changeOrigin: true, pathRewrite: {
//             '^/service': ''
//         }
//     }
// }
export const PROXY_CONFIG = {
  '/service': {
      target: 'https://api.mobit.ir', changeOrigin: true, pathRewrite: {
          '^/service': ''
      }
  }
}

