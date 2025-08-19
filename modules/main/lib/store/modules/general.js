const state = () => ({
    loading: true,
    windowWidth: null,
    touchDevice: false,
    breadcrumbHeight: 0,
})

const mutations = {
    SET_WINDOW_WIDTH(state, windowWidth) {
        state.windowWidth = windowWidth
    },
    SET_TOUCH_DEVICE(state, touchDevice) {
        state.touchDevice = touchDevice
    },
    SET_BREADCRUMB_HEIGHT(state, breadcrumbHeight) {
        state.breadcrumbHeight = breadcrumbHeight
    },
}

export default () => ({
    namespaced: true,
    state,
    mutations,
})
