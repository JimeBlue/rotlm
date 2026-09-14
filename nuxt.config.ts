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
        // Preload only the fonts needed above the fold (body text and the
        // header's font-medium buttons); every extra preload competes with the LCP image
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
          href: '/fonts/Rubik-Medium.woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
  },

  // Production only: cache the rendered pages and the Sanity API responses on
  // Vercel's CDN (stale-while-revalidate). Visitors get the stored copy
  // instantly instead of waiting for a serverless cold start plus Sanity round
  // trips; a copy older than 60 s is still served and refreshed in the
  // background, so Sanity edits show up within about a minute.
  // Not enabled in dev: Vite injects CSS at runtime, so a cached dev page
  // would render unstyled, and edits would not show up for 60 s.
  // The root URL is deliberately not listed: it redirects per browser language
  // (i18n detectBrowserLanguage), so its response differs per visitor and must
  // not be shared via the CDN. The contact form endpoint is not listed either.
  $production: {
    routeRules: {
      '/gigs': { swr: 60 },
      '/music': { swr: 60 },
      '/merch': { swr: 60 },
      '/contact': { swr: 60 },
      '/impressum': { swr: 60 },
      '/datenschutz': { swr: 60 },
      '/en': { swr: 60 },
      '/en/**': { swr: 60 },
      '/it': { swr: 60 },
      '/it/**': { swr: 60 },
      '/es': { swr: 60 },
      '/es/**': { swr: 60 },
      '/sitemap.xml': { swr: 60 },
      '/api/sanity/**': { swr: 60 },
    },
  },

  routeRules: {
    // Old product detail URLs (online ordering was removed) redirect to the merch overview
    '/merch/*': { redirect: '/merch' },
    '/en/merch/*': { redirect: '/en/merch' },
    '/it/merch/*': { redirect: '/it/merch' },
    '/es/merch/*': { redirect: '/es/merch' },
  },

  css: ['assets/css/fonts.css', 'assets/css/tailwind.css'],

  features: {
    // Inline the global CSS into the HTML so the first paint does not wait on
    // a separate render-blocking stylesheet request (~300 ms on slow mobile)
    inlineStyles: true,
  },

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
