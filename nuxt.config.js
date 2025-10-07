import { sitemapGenerator } from './utils/sitemap'

export default {
    // https://github.com/ktquez/vue-head
    head: {
        title: 'Kaiko',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
            {
                name: 'viewport',
                content:
                    'width=device-width, initial-scale=1, viewport-fit=cover',
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: null,
            },
            {
                hid: 'twitter:site',
                name: 'twitter:site',
                content: 'Kaiko',
            },
            {
                hid: 'twitter:creator',
                name: 'twitter:creator',
                content: 'Spin Interactive',
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: 'Kaiko',
            },
            {
                hid: 'og:locale',
                property: 'og:locale',
                content: 'fr',
            },
            {
                hid: 'og:type',
                property: 'og:type',
                content: 'website',
            },
            {
                hid: 'author',
                name: 'author',
                content: 'Spin Interactive',
            },
            {
                hid: 'google-site-verification',
                name: 'google-site-verification',
                content: 'UkwLcwRj1RBzkC9in7Fi0GZFIwUnzGN5rzPYxxLpAJI',
            },
        ],
        script: [
            {
                type: 'text/javascript',
                id: 'hs-script-loader',
                async: true,
                defer: true,
                src: '//js-eu1.hs-scripts.com/25446524.js',
            },
        ],
    },

    // Runtime config : https://fr.nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config/
    publicRuntimeConfig: {
        apiUrl: process.env.API_URL,
        apiKey: process.env.API_KEY,
        baseUrl: process.env.BASE_URL,
        wpUrl: process.env.WP_URL,
        axeptio: {
            clientId: process.env.AXEPTIO_CLIENT_ID,
            cookiesVersion: process.env.AXEPTIO_COOKIES_VERSION,
            userCookiesDomain: process.env.AXEPTIO_USER_COOKIES_DOMAIN,
        },
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        {
            src: '~/modules/main/lib/assets/scss/main.scss',
            lang: 'scss',
        },
        {
            src: '~/modules/main/lib/assets/scss/base/_fonts.scss',
            lang: 'scss',
        },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://www.npmjs.com/package/@nuxtjs/style-resources
        '@nuxtjs/style-resources',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // Laisser en premier
        '~/modules/main',
        // https://www.npmjs.com/package/nuxt-basic-auth-module
        'nuxt-basic-auth-module',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://github.com/nuxt-community/gtm-module
        '@nuxtjs/gtm',
        // https://portal-vue.linusb.org/
        'portal-vue/nuxt',
        // https://www.npmjs.com/package/cookie-universal-nuxt
        'cookie-universal-nuxt',
        [
            'nuxt-lazy-load',
            {
                directiveOnly: true,
                native: false,
                observerConfig: {
                    rootMargin: '100%', // On charge toutes les images qui sont à moins d'un écran d'écart avec l'écran courant
                },
            },
        ],
        // https://sitemap.nuxtjs.org/fr
        '@nuxtjs/sitemap',
        // https://image.nuxtjs.org
        '@nuxt/image'
    ],

    // Style resources
    styleResources: {
        scss: [
            '~/modules/main/lib/assets/scss/utils/_mixins.scss',
            '~/modules/main/lib/assets/scss/utils/_placeholdersSelectors.scss',
            '~/modules/main/lib/assets/scss/utils/_variables.scss',
        ],
    },

    // Provide basic authentication: https://www.npmjs.com/package/nuxt-basic-auth-module
    basic: {
        name: process.env.BASIC_USER,
        pass: process.env.BASIC_PWD,
        enabled: process.env.BASIC_ENABLED === 'true',
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [
            'query-string',
            'filter-obj',
            'decode-uri-component',
            'split-on-first',
            'gsap',
            'axios',
        ],
        loaders: {
            scss: {
                sourceMap: false,
                sassOptions: {
                    quietDeps: true,
                    silenceDeprecations: ['import', 'legacy-js-api'],
                },
            }
        },
        extend(config) {
            config.resolve.alias.vue = 'vue/dist/vue.common'
        },
    },

    render: {
        asyncScripts: true,
    },

    gtm: {
        enabled: process.env.GTM_ENABLE !== 'false', // true pour pusher les events vers GTM
        debug: process.env.GTM_DEBUG !== 'false', // true pour activer le debug GTM
        pageTracking: true,
        autoInit: false,
        layer: 'dataLayer',
    },

    router: {
        middleware: ['sitemapMiddleware', 'trailingSlashRedirect'],
    },

    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || '0.0.0.0',
    },

    sitemap: sitemapGenerator,

    serverMiddleware: [
        '~/middleware/redirects'
    ]

}
