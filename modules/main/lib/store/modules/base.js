export const state = () => ({
    isSet: false,
})

export const mutations = {
    SET_IS_SET(state, isSet) {
        state.isSet = isSet
    },
}

const actions = {
    dispatchBase({ commit }, data) {
        const { options, menus, seo } = data
        commit('options/SET_OPTIONS', options, { root: true })
        commit('menu/SET_MENUS', menus, { root: true })
        commit('seo/SET_SEO', seo, { root: true })

        commit('SET_IS_SET', true)
    },
}

export default () => ({
    namespaced: true,
    state,
    mutations,
    actions,
})
