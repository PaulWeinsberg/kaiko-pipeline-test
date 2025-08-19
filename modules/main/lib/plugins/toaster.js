let store = null

const remove = id => {
    store.commit('toaster/REMOVE_TOASTER', id)
}

const show = ({ type, message }) => {
    const id = store.state.toaster.toasterIndex
    store.commit('toaster/ADD_TOASTER', {
        id,
        type,
        message,
    })

    setTimeout(() => {
        remove(id)
    }, 3000)
}

const toasterFactory = () => ({
    success(message) {
        show({
            type: 'success',
            message,
        })
    },
    error(message) {
        show({
            type: 'error',
            message,
        })
    },
    info(message) {
        show({
            type: 'info',
            message,
        })
    },
    warning(message) {
        show({
            type: 'warning',
            message,
        })
    },
    remove(id) {
        remove(id)
    },
})

export default (context, inject) => {
    store = context.store
    inject('toaster', toasterFactory(context))
}
