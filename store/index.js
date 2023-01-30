/**
 * Ce store permet de lancer des actions dès que le serveur nuxt est initialisé
 */

const actions = {
    /**
     * Permet de lancer ce que l'on veut au chargement du serveur nuxt
     * @link https://nuxtjs.org/docs/2.x/directory-structure/store#the-nuxtserverinit-action
     */
    async nuxtServerInit({ dispatch }) {
        await dispatch('base/dispatchBase')
    },
}

export default {
    actions,
}
