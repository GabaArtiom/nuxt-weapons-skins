export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt'],

  css: ['~/assets/css/main.css'],

  alias: {
    '~/shared': './shared',
  },

  devServer: {
    port: 27015,
    host: '0.0.0.0', // Allow external access
  },

  runtimeConfig: {
    // Server-only variables
    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER || 'cs2user',
    dbPassword: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || 'cs2db',
    steamApiKey: process.env.STEAM_API_KEY || '',
    // Public variables (client + server)
    public: {
      siteUrl: process.env.SITE_URL || 'http://178.168.12.247:27015',
    },
  },

  future: {
    compatibilityVersion: 4, // Enable Nuxt 4 behavior
  },

  devtools: { enabled: true },

  compatibilityDate: '2026-04-12',
})
