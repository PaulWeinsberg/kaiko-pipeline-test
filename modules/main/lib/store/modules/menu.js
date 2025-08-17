const mutations = {
    SET_MENUS(state, menus) {
        Object.keys(menus).forEach(key => {
            state[key] = menus[key]
        })
    },
}

export default () => ({
    namespaced: true,
    mutations,
})
