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
      token: '',
    },
    mongodb: '',
    public: {
      discord: {
        oauth2: {
          url: '',
        },
      },
      plausible: {
        src: '',
        domain: '',
      },
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        process.env.NUXT_PUBLIC_PLAUSIBLE_SRC ? { defer: true, 'data-domain': process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN, src: process.env.NUXT_PUBLIC_PLAUSIBLE_SRC, } : undefined
      ],
    },
  },
  typescript: {
    typeCheck: true
  }
})
