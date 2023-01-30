/**
 * Permet d'afficher un console error, seulement si nous sommes en dev
 * @param {*} err - L'erreur a affichée
 * @param {String} message - Le message a affiché
 */
export const displayError = ({ err = {}, message = '' }) => {
    if (process.env.NODE_ENV !== 'development') return null

    const data = err?.response?.data

    if (message || data?.message) {
        // eslint-disable-next-line
        console.error(message || data?.message || '')
        return
    }

    if (data) {
        // eslint-disable-next-line
        console.error(data)
        return
    }

    console.log(err)
}
