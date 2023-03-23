import axios from 'axios'
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
                content: 'summary',
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: null,
            },
            {
                hid: 'twitter:site',
                name: 'twitter:site',
                content: 'Outsideur',
            },
            {
                hid: 'twitter:creator',
                name: 'twitter:creator',
                content: 'Spin Interactive',
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: 'Outsideur',
            },
            {
                hid: 'og:locale',
                property: 'og:locale',
                content: 'fr',
            },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            { hid: 'author', name: 'author', content: 'Spin Interactive' },
        ],
        script: [
            {
                src: 'https://js.hsforms.net/forms/v2.js',
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
            src: '@spin-interactive/spikotify/lib/assets/scss/main.scss',
            lang: 'scss',
        },
        {
            src: '@spin-interactive/spikotify/lib/assets/scss/base/_fonts.scss',
            lang: 'scss',
        },
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{ src: '~/plugins/gtm' }],

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
        '@spin-interactive/spikotify',
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
                native: true,
                observerConfig: {
                    rootMargin: '100%', // On charge toutes les images qui sont à moins d'un écran d'écart avec l'écran courant
                },
            },
        ],
        // https://sitemap.nuxtjs.org/fr
        '@nuxtjs/sitemap',
        // https://image.nuxtjs.org
        '@nuxt/image',
        // https://www.npmjs.com/package/nuxt-highlightjs
        [
            'nuxt-highlightjs',
            {
                style: 'night-owl',
            },
        ],
    ],

    // Style resources
    styleResources: {
        scss: [
            '@spin-interactive/spikotify/lib/assets/scss/utils/_mixins.scss',
            '@spin-interactive/spikotify/lib/assets/scss/utils/_placeholdersSelectors.scss',
            '@spin-interactive/spikotify/lib/assets/scss/utils/_variables.scss',
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
        transpile: ['gsap', 'axios'],
        loaders: { scss: { sourceMap: false } },
        extend(config) {
            config.resolve.alias.vue$ = 'vue/dist/vue.esm.js'
        },
    },

    gtm: {
        enabled: process.env.GTM_ENABLE !== 'false', // true pour pusher les events vers GTM
        debug: process.env.GTM_DEBUG !== 'false', // true pour activer le debug GTM
        pageTracking: true,
        autoInit: false,
        layer: 'dataLayer',
    },

    router: {
        middleware: ['trailingSlashRedirect'],
    },

    sitemap: sitemapGenerator,
}
