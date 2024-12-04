// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      }
    }
  },
  runtimeConfig: {
    discord: {
      clientId: '',
      clientSecret: '',
      authorization: '',
      token: '',
    },
    mongodb: '',
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        { defer: true, 'data-domain': 'mm-discord.vercel.app', src: 'https://plausible.nanashi.ipv64.net/js/script.js' }
      ],
    },
  },
  typescript: {
    typeCheck: true
  }
})
