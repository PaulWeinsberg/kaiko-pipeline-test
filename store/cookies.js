export const state = () => ({
    infos: null,
    isSet: false,
})

export const mutations = {
    SET_INFOS(state, infos) {
        state.infos = infos
    },
    SET_IS_SET(state, isSet) {
        state.isSet = isSet
    },
}
