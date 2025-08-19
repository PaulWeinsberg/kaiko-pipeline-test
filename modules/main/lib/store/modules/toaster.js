/**
 * Ce store permet de gérer tout ce qui est lié aux toasters
 */

const state = () => ({
    toasterIndex: 0, // Permet d'avoir l'id de notre toaster
    toasters: [], // Liste tout les toasters actuellement affichés
})

const mutations = {
    ADD_TOASTER(state, toaster) {
        state.toasterIndex++
        state.toasters.push(toaster)
    },
    REMOVE_TOASTER(state, id) {
        state.toasters.forEach((toaster, i) => {
            if (toaster.id === id) state.toasters.splice(i, 1)
        })
    },
}

export default () => ({
    namespaced: true,
    state,
    mutations,
})
