/**
 * Permet d'afficher un console error, seulement si nous sommes en dev
 * @param {*} err - L'erreur a affichée
 * @param {String} message - Le message a affiché
 */
const displayError = ({ err = {}, message = '' }) => {
    if (process.env.NODE_ENV === 'development') {
        const data = err?.response?.data

        // eslint-disable-next-line
        console.error(message || data?.message || '')
        if (data) {
            // eslint-disable-next-line
            console.error(data)
        }
    }
}

export default (context, inject) => {
    inject('displayError', displayError)
}
