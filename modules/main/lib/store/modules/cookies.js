const state = () => ({
    infos: {},
    isSet: false,
})

const mutations = {
    SET_INFOS(state, infos) {
        state.infos = infos
    },
    SET_IS_SET(state, isSet) {
        state.isSet = isSet
    },
}

export default () => ({
    namespaced: true,
    state,
    mutations,
})
