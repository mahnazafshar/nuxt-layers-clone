# Sentry For Nuxt3 powered by layers

We preferred it to be a layer, it could be a module

## Setup

Make sure to install the dependencies:

```bash
npm install @avapardaz/sentry
```
```javascript
export default defineNuxtConfig({
  extends: [
    '@avapardaz/sentry'
  ]
})
```
side note: we are using some devDependencies under the hood, if those not installed automatically by npm, just add them as devDependencies on your target project:
```json
"devDependencies": {   
    "@sentry/node": "^7.72.0",
    "@sentry/profiling-node": "^1.2.1",
    "@sentry/vue": "^7.72.0"
  }
```
config your dsn: 
```javascript
 export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      sentry: {
        dsn: 'your dsn here',
        environment: 'development' // 'production',
        serverOptions:{
          //sentry.init options for server side
        },
        clientOptions:{//sentry.init options for client side
           tracePropagationTargets: ['localhost', 'https://your-server.com'],
        }
      }
    }
  }
 })
```
you are done!
