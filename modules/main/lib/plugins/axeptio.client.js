/**
 * Permet d'initialiser le tracking
 * @param {Object} $gtm Le module GTM
 * @param {Object} store Le store
 */
const initTracking = ($gtm, store) => {
    const { platform, gtm, ga } = store.state.options.options
    if (platform === 'gtm') $gtm.init(gtm.code)
    if (platform === 'ga') $gtm.init(ga.code)
}

export default function ({ app, store, $gtm }) {
    const { axeptio = {} } = store.state.options.options

    // Les options axeptio
    const settings = {
        clientId: axeptio.client_id,
    }

    if (axeptio.cookies_version) {
        settings.cookiesVersion = axeptio.cookies_version
    }

    if (axeptio.user_cookies_domain) {
        settings.userCookiesDomain = axeptio.user_cookies_domain
    }

    window.axeptioSettings = settings
    ;(function (d, s) {
        const t = d.getElementsByTagName(s)[0]
        const e = d.createElement(s)
        e.async = true
        e.src = '//static.axept.io/sdk.js'
        t.parentNode.insertBefore(e, t)
    })(document, 'script')

    window._axcb = window._axcb || []
    window._axcb.push(function (axeptio) {
        axeptio.on('cookies:complete', choices => {
            const choicesTmp = { ...choices }
            app.store.commit('cookies/SET_INFOS', choicesTmp)
            app.store.commit('cookies/SET_IS_SET', true)

            if (choices.google_analytics) initTracking($gtm, store)
        })
    })
}
