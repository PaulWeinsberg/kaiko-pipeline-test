/**
 * Permet d'ajouter une class sur le body pour désactiver le scroll
 * @param {Boolean} activate Est-ce qu'on active le scroll
 * @param {Boolean} toggle Est-ce qu'on doit toggle le scroll
 * @return {Boolean}
 */
export const handleBodyScroll = ({ activate = false, toggle = false }) => {
    // Si document pas chargé, on ne fait rien
    if (!document) return false
    const className = 'no-scroll'
    const body = document.querySelector('body')
    if (toggle) {
        const hasClass = body.classList.contains(className)
        if (hasClass) body.classList.remove(className)
        if (!hasClass) body.classList.add(className)
        return true
    }
    if (activate) {
        body.classList.remove(className)
        return true
    }
    body.classList.add(className)
    return true
}

/**
 * Permet de dispatcher les éléments d'un array dans plusieurs autres array
 * @param {Number} column Le nombre de nouveaux array
 * @param {Array} items La liste d'éléments
 * @return {*[]}
 */
export const spreadElementsInMultipleArray = ({ column, items }) => {
    const itemsTmp = []

    for (let i = 0; i < column; i++) itemsTmp.push([])

    items.forEach((el, i) => {
        itemsTmp[i % column].push(el)
    })

    return itemsTmp
}

/**
 * Permet de récupérer le padding nécessaire pour aligner un bloc sur notre grille
 * @return {Number} La valeur du padding
 */
export const getOneSidePadding = ({
    wrapper = '--wrapper',
    wrapperPadding = '--wrapperPaddingHorizontal',
    wrapperPaddingDefault = '--wrapperPaddingHorizontal',
}) => {
    const fontSize = parseFloat(getComputedStyleValues('--baseFont'))

    const wrapperWidth = parseFloat(getComputedStyleValues(wrapper))
    const wrapperPadding_ = parseFloat(getComputedStyleValues(wrapperPadding))
    const wrapperPaddingDefault_ =
        parseFloat(getComputedStyleValues(wrapperPaddingDefault)) * fontSize

    // On fait notre calcul :
    // La taille de la fenêtre - (la largeur du wrapper - le padding du wrapper)
    const realWrapperWidth =
        wrapperWidth * fontSize - wrapperPadding_ * fontSize
    const width = window.innerWidth - realWrapperWidth
    // On divise par deux cette valeur, pour avoir un seul côté
    let padding = width / 2

    // Si il y a un soucis de calcul, on rajoute une marge de base
    if (padding < wrapperPaddingDefault_) padding = wrapperPaddingDefault_

    return padding
}

/**
 * Permet de récupérer une variable spécifié en CSS
 * @param {String} name Le nom de la variable
 * @return {String} La valeur
 */
export const getComputedStyleValues = name => {
    const style = getComputedStyle(document.documentElement)
    return style.getPropertyValue(name)
}
