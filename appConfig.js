export const APP_CONFIG = {
  META: {
    name: 'Navigo',
    description: 'Discover exciting new places by drawing on the map',
    shortDescription: 'Discover exciting new places!',
    keywords: 'navigo, navigation, discover places',
    app: {
      background: '#26323b',
    },
    social: {
      twitter: '@Fateh_AK_',
    },
  },
  CLOUDFLARE_ANALYTICS_TOKEN: '7f2946e6ad2046e79876eb81ffd212ec',
  PROD_BASE_URL: 'https://navigo-app.pages.dev',
};

export const META_TAGS = [
  {
    name: 'keywords',
    content: APP_CONFIG.META.keywords,
  },
  {
    name: 'name',
    content: `${APP_CONFIG.META.name} • ${APP_CONFIG.META.shortDescription}`,
  },
  {
    name: 'description',
    content: APP_CONFIG.META.description,
  },
  {
    name: 'image',
    content: `${APP_CONFIG.PROD_BASE_URL}/banner.png`,
  },
  // Open Graph tags
  {
    property: 'og:title',
    content: `${APP_CONFIG.META.name} • ${APP_CONFIG.META.shortDescription}`,
  },
  {
    property: 'og:description',
    content: APP_CONFIG.META.description,
  },
  {
    property: 'og:image',
    content: `${APP_CONFIG.PROD_BASE_URL}/banner.png`,
  },
  {
    property: 'og:url',
    content: APP_CONFIG.PROD_BASE_URL,
  },
  {
    property: 'og:type',
    content: 'website',
  },
  // Twitter tags
  {
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    name: 'twitter:site',
    content: APP_CONFIG.META.social.twitter,
  },
  {
    name: 'twitter:creator',
    content: APP_CONFIG.META.social.twitter,
  },
  {
    name: 'twitter:title',
    content: `${APP_CONFIG.META.name} • ${APP_CONFIG.META.shortDescription}`,
  },
  {
    name: 'twitter:description',
    content: APP_CONFIG.META.description,
  },
  {
    name: 'twitter:image',
    content: `${APP_CONFIG.PROD_BASE_URL}/banner.png`,
  },
  // Add to homescreen for Chrome on Android. Fallback for PWA
  {
    name: 'application-name',
    content: APP_CONFIG.META.name,
  },
  // Windows phone tile icon
  {
    name: 'msapplication-TileImage',
    content: `${APP_CONFIG.PROD_BASE_URL}/icons/icon-512-512.png`,
  },
  {
    name: 'msapplication-TileColor',
    content: APP_CONFIG.META.app.background,
  },
  {
    name: 'msapplication-tap-highlight',
    content: 'no',
  },
  // iOS Safari
  {
    name: 'apple-mobile-web-app-title',
    content: APP_CONFIG.META.name,
  },
  {
    name: 'apple-mobile-web-app-capable',
    content: 'yes',
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'black',
  },
  // PWA
  {
    name: 'theme-color',
    content: APP_CONFIG.META.app.background,
  },
  {
    name: 'mask-icon',
    content: '/icons/icon-512-512.png',
    color: APP_CONFIG.META.app.background,
  },
];

export const PWA_CONFIG = {
  manifest: {
    name: APP_CONFIG.META.name,
    short_name: APP_CONFIG.META.name,
    description: APP_CONFIG.META.shortDescription,
    background_color: APP_CONFIG.META.app.background,
    theme_color: APP_CONFIG.META.app.background,
    start_url: '.',
    orientation: 'any',
    display: 'standalone',
    includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png'],
    icons: [
      {
        src: '/icons/icon-512-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-192-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-144-144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-96-96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-72-72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-48-48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  registerType: 'prompt',
  workbox: {
    cleanupOutdatedCaches: true,
    maximumFileSizeToCacheInBytes: 4194304,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'cloudflare-cdn-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};
