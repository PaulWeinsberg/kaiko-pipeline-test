import axios from 'axios'
import { sitemapGenerator } from './utils/sitemap'
import { redirectGenerator } from './redirects/index.js'

const createAxios = axios.create({
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*',
            'X-Auth-Token': process.env.API_KEY,
        },
    },
    credentials: false,
    withCredentials: false,
    baseURL: process.env.API_URL,
})

export default {
    // Enable full static generation for Cloudflare Pages
    target: 'static',
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

    // Nuxt image configuration optimized for static hosting on Cloudflare Pages
    image: {
        // Use static provider so that images are processed at build time and emitted to /_nuxt
        provider: 'static',
        // You can whitelist external domains here if <nuxt-image> points to remote assets
        domains: process.env.IMAGE_DOMAINS ? process.env.IMAGE_DOMAINS.split(',').map(d => d.trim()) : [],
        // Disable sharp optimisations that would otherwise require a Node server runtime
        sharp: false,
    },

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

    // Redirect handling is done via Cloudflare _redirects file on static deploys
    serverMiddleware: process.env.STATIC_DEPLOY === 'true' || process.env.CF_PAGES === 'true'
        ? []
        : [
            '~/middleware/redirects'
        ],

    // Static generation configuration
    generate: {
        crawler: false, // we'll explicitly list routes
        fallback: '200.html', // SPA-style fallback; Cloudflare serves 404.html if missing
        interval: 50,
    exclude: [/^\/s$/], // search page rendered client-side only
        routes: async () => {
            try {
                const routeSet = new Set()
                // Always include home
                routeSet.add('/')
                routeSet.add('/404')

                /* -----------------------------
                 * 1. Collect routes from WP sitemaps (existing behaviour)
                 * ---------------------------- */
                if (process.env.WP_URL) {
                    try {
                        const root = `${process.env.WP_URL}/sitemap.xml`
                        const { data: rootXml } = await axios.get(root)
                        const regexLoc = /<loc>([^<]*)<\/loc>/gm
                        const extractLocs = xml => [...xml.matchAll(regexLoc)].map(m => m[1])
                        const subSitemaps = extractLocs(rootXml).filter(u => /sitemap.*\.xml$/i.test(u))
                        for (const sm of subSitemaps) {
                            try {
                                const { data: smXml } = await axios.get(sm)
                                const locs = extractLocs(smXml)
                                locs.forEach(fullUrl => {
                                    if (!fullUrl.startsWith(process.env.WP_URL)) return
                                    let route = fullUrl.replace(process.env.WP_URL, '') || '/'
                                    if (!route.startsWith('/')) route = `/${route}`
                                    route = route.split('?')[0]
                                    if (route === '/s') return
                                    routeSet.add(route)
                                })
                            } catch (e) {
                                console.error('[generate] Failed sub-sitemap', sm, e.message)
                            }
                        }
                    } catch (e) {
                        console.error('[generate] Sitemap root fetch failed', e.message)
                    }
                }

                /* -----------------------------
                 * 2. Discover additional routes via authenticated API (spin-api)
                 * We dynamically inspect the API root and attempt to fetch list endpoints.
                 * Endpoints returning an object with a `list` array containing `url` fields
                 * will have those URLs transformed into paths and added.
                 * ---------------------------- */
                if (process.env.API_URL && process.env.API_KEY) {
                    try {
                        const apiBase = process.env.API_URL.replace(/\/$/, '')
                        const apiRootUrl = apiBase
                        const { data: apiRoot } = await axios.get(apiRootUrl, {
                            headers: { 'X-Auth-Token': process.env.API_KEY }
                        })
                        const apiRoutes = apiRoot?.routes ? Object.keys(apiRoot.routes) : []
                        // Candidate endpoints: exclude base, redirects, search (handled client-side), sitemap duplicates
                        const blacklist = new Set(['/spin-api', '/spin-api/base', '/spin-api/redirects', '/spin-api/search'])
                        const candidates = apiRoutes.filter(r => r.startsWith('/spin-api/') && !blacklist.has(r))
                        for (const r of candidates) {
                            const endpoint = r.replace('/spin-api/', '')
                            const listUrl = `${apiBase}/${endpoint}?per_page=100`
                            try {
                                const { data } = await axios.get(listUrl, {
                                    headers: { 'X-Auth-Token': process.env.API_KEY }
                                })
                                // Common shapes: { list: [...] } or an array itself
                                let items = []
                                if (Array.isArray(data)) items = data
                                else if (Array.isArray(data.list)) items = data.list
                                // Accept objects with 'url' or 'link'
                                for (const item of items) {
                                    const fullUrl = item?.url || item?.link
                                    if (!fullUrl || typeof fullUrl !== 'string') continue
                                    try {
                                        let route
                                        if (fullUrl.startsWith('http')) {
                                            // Only include if matches BASE_URL or public site
                                            const publicOrigin = (process.env.BASE_URL || '').replace(/\/$/, '')
                                            if (publicOrigin && !fullUrl.startsWith(publicOrigin)) continue
                                            route = fullUrl.replace(publicOrigin, '') || '/'
                                        } else {
                                            route = fullUrl
                                        }
                                        if (!route.startsWith('/')) route = `/${route}`
                                        route = route.split('?')[0]
                                        if (route === '/s') continue
                                        routeSet.add(route)
                                    } catch (_) { /* ignore malformed */ }
                                }
                            } catch (e) {
                                // Silently skip endpoints not supporting listing
                                if (process.env.DEBUG_ROUTES === 'true') {
                                    console.warn('[generate][api-skip]', endpoint, e.message)
                                }
                            }
                        }
                    } catch (e) {
                        console.error('[generate] API discovery failed', e.message)
                    }
                }

                // (Stray loop removed)

                /* -----------------------------
                 * 3. Add redirect target routes (so destinations always have a prerendered page)
                 * We do NOT generate pages for redirect sources; Cloudflare handles those via _redirects.
                 * Local redirects come from redirectGenerator; API redirects (if available) fetched live.
                 * ---------------------------- */
                try {
                    const { redirectGenerator } = require('./redirects')
                    const addTarget = (to) => {
                        if (!to || typeof to !== 'string') return
                        const trimmed = to.trim()
                        // external absolute URL -> skip (served elsewhere)
                        if (/^https?:\/\//i.test(trimmed)) return
                        // Skip obviously malformed targets starting with protocol fragment
                        if (/^https?:/i.test(trimmed)) return
                        let route = trimmed
                        // Normalize fragment / query
                        route = route.split('#')[0].split('?')[0] || '/'
                        // Ensure leading slash and no double protocol bits accidentally kept
                        if (!route.startsWith('/')) route = '/' + route
                        // Filter out accidental '/https:' '/http:' etc
                        if (/^\/https?:/i.test(route)) return
                        if (route === '/s') return
                        routeSet.add(route)
                    }
                    if (Array.isArray(redirectGenerator)) {
                        for (const r of redirectGenerator) addTarget(r.to)
                    }
                    // Fetch API redirects if env present (same shape as script expectation)
                    if (process.env.API_URL && process.env.API_KEY) {
                        try {
                            const apiBase = process.env.API_URL.replace(/\/$/, '')
                            const { data } = await axios.get(apiBase + '/redirects', {
                                headers: { 'X-Auth-Token': process.env.API_KEY }
                            })
                            if (data && Array.isArray(data.redirects)) {
                                for (const r of data.redirects) addTarget(r.target)
                            }
                        } catch (e) {
                            if (process.env.DEBUG_ROUTES === 'true') console.warn('[generate][redirects-api] skip', e.message)
                        }
                    }
                } catch (e) {
                    if (process.env.DEBUG_ROUTES === 'true') console.warn('[generate][redirect-targets] failed', e.message)
                }

                // Derive and include parent segments (same logic; now applies to API + sitemap routes)
                const parentsToAdd = new Set()
                for (const r of routeSet) {
                    if (!r || r === '/' || !r.startsWith('/')) continue
                    const parts = r.split('/').filter(Boolean)
                    let accum = ''
                    for (let i = 0; i < parts.length - 1; i++) {
                        accum += '/' + parts[i]
                        if (accum === '/s') continue
                        parentsToAdd.add(accum)
                    }
                }
                for (const p of parentsToAdd) routeSet.add(p)

                // Return sorted list (shorter paths first) for determinism
                return [...routeSet].sort((a,b) => a.localeCompare(b))
            } catch (err) {
                console.error('Error while generating routes from WP sitemap', err.message)
                return []
            }
        }
    }

}
