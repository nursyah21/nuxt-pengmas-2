// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  devtools: { enabled: true },
  runtimeConfig: {
    mongodbUri: 'uri'
  },
  colorMode: {
    preference: 'light'
  },
  // router: {
  //   // @ts-ignore
  //   prefetchLinks: true
  // }
})
