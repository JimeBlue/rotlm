// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    resendApiKey: '',       // NUXT_RESEND_API_KEY
    resendToEmail: '',      // NUXT_RESEND_TO_EMAIL
    sanityApiToken: '',     // NUXT_SANITY_API_TOKEN
    public: {
      eventId: 'Raiders of the Lost Missile',
    },
  },

  app: {
    head: {
      titleTemplate: '%s | Raiders of the Lost Missile',
      title: 'Raiders of the Lost Missile',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'theme-color',
          content: '#000000',
        },
        {
          property: 'og:site_name',
          content: 'Raiders of the Lost Missile',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-png',
          href: '/favicon.jpg',
        },
        // Preload critical fonts to avoid render-blocking
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/Rubik-Regular.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/Rubik-Bold.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/Syne-Bold.woff2',
          crossorigin: 'anonymous',
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
      {
        name: 'Italiano',
        code: 'it',
        language: 'it-IT',
        file: 'it.json',
      },
      {
        name: 'Español',
        code: 'es',
        language: 'es-ES',
        file: 'es.json',
      },
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    baseUrl: 'https://rotlm.com',
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
        const filtered = pages.filter(page => !page.path.startsWith('/dev'))
        pages.splice(0, pages.length, ...filtered)
      }
    },
  },

  compatibilityDate: '2025-08-20',
})
