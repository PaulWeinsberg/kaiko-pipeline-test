export default () => ({
    namespaced: true,
    state: () => ({
        count: 15,
    }),
    mutations: {
        adjust(state, data) {
            state.count += data
        },
    },
    getters: {
        count: state => state.count,
    },
})
