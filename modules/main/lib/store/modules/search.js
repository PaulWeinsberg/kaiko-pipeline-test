/**
 * Ce store permet de gérer tout ce qui est lié à la recherche
 */

const state = () => ({
    loading: false,
    values: {
        isValid: null,
        val: {
            s: '',
        },
    },
})

const mutations = {
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_VALUES(state, values) {
        state.values = values
    },
    SET_SEARCH(state, search) {
        state.values.val.s = search
    },
}

const actions = {
    setValues({ commit, rootState }, { val, baseUrl = '' }) {
        const { s } = val.val

        if (baseUrl) {
            // Si on a une URL de base, on change d'URL
            location.replace(`${baseUrl}/s?s=${s}`)
        } else {
            this.$router.push({
                path: `${baseUrl}/s`,
                query: {
                    s,
                },
            })
        }

        commit('SET_VALUES', val)
    },
}
export default () => ({
    namespaced: true,
    state,
    mutations,
    actions,
})
