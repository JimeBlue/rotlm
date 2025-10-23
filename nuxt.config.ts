// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    // No external API keys needed for mock implementation
    public: {
      eventId: 'portfolio-event-2024',
    },
  },

  app: {
    head: {
      title: 'Starter Pro',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-png',
          href: '/favicon.png',
        },
      ],
    },
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
  },

  css: ['assets/css/fonts.css', 'assets/css/tailwind.css'],

  ui: {
    colorMode: false,
  },

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-svgo',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@vueuse/motion/nuxt',
  ],

  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        language: 'en-GB',
        file: 'en.json',
      },
      {
        name: 'Deutsch',
        code: 'de',
        language: 'de-DE',
        file: 'de.json',
      },
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    compilation: {
      strictMessage: false,
    },
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      '@tailwindcss/nesting': {},
      '@tailwindcss/postcss': {},
    },
  },

  vite: {},

  devtools: {
    enabled: true,
  },

  hooks: {
    'pages:extend': function (pages) {
      if (process.env.NODE_ENV === 'production') {
        // Remove all routes under /dev
        return pages.filter(page => !page.path.startsWith('/dev'))
      }
    },
  },

  compatibilityDate: '2025-08-20',
})
