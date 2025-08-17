/**
 * Ce store permet de gérer tout ce qui est lié aux SEO global du site
 */

const state = () => ({
    seo: {},
})

const mutations = {
    SET_SEO(state, seo) {
        state.seo = seo
    },
}

export default () => ({
    namespaced: true,
    state,
    mutations,
})
