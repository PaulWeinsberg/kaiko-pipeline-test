// store/index.js
import baseModule from './modules/base'
import cookiesModule from './modules/cookies'
import counterModule from './modules/counter'
import generalModule from './modules/general'
import menuModule from './modules/menu'
import optionsModule from './modules/options'
import seoModule from './modules/seo'
import toasterModule from './modules/toaster'
import searchModule from './modules/search'

export default ({ store }, inject) => {
    if (!store) return
    store.registerModule('base', baseModule())
    store.registerModule('cookies', cookiesModule())
    store.registerModule('counter', counterModule())
    store.registerModule('general', generalModule())
    store.registerModule('menu', menuModule())
    store.registerModule('options', optionsModule())
    store.registerModule('search', searchModule())
    store.registerModule('seo', seoModule())
    store.registerModule('toaster', toasterModule())
}
