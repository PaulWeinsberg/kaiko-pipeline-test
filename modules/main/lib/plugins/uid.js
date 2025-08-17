/**
 * Permet de récupérer un uid
 */
const getUid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export default (context, inject) => {
    inject('getUid', getUid)
}
