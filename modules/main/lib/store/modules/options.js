/**
 * Ce store permet de gérer tout ce qui est lié aux options
 */

const state = () => ({
    options: {},
})

const mutations = {
    SET_OPTIONS(state, options) {
        state.options = options
    },
}

export default () => ({
    namespaced: true,
    state,
    mutations,
})
