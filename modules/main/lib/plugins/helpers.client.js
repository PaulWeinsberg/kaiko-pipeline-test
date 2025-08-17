import { DateTime } from 'luxon'
import { gsap } from 'gsap'
import {
    computedGetStyleValues,
    elementGetPositionRelativeToDocument,
} from './../core'
import menu from '../store/modules/menu'

/**
 * Permet de définir le fait de savoir si on est sur un touch device ou pas
 * @return {boolean}
 */
const setIsTouchDevice = () => {
    const asEvent = 'ontouchstart' in window
    const maxTouchPoint = navigator.maxTouchPoints > 0
    const msMaxTouchPoint = navigator.msMaxTouchPoints > 0

    return asEvent || maxTouchPoint || msMaxTouchPoint
}

export default function ({ app }) {
    const isTouchDevice = setIsTouchDevice()
    // app.store.commit('general/SET_TOUCH_DEVICE', isTouchDevice)
    if (isTouchDevice) {
        const body = document.querySelector('body')
        if (body) body.classList.add('is-touch-device')
    }
}

/**
 * Permet de scroller dans la page
 */
export const scrollTo = to => {
    // On récupère l'offset top relatif au haut du document
    const position = elementGetPositionRelativeToDocument(to)
    // On récupère la hauteur du menu
    const header = document.getElementById('base-header')
    const headerRec = header ? header.getBoundingClientRect() : null
    const headerHeight = !headerRec ? 0 : headerRec.height

    // On anime
    gsap.to(window, {
        scrollTo: {
            y: position.top - headerHeight,
            autoKill: false,
        },
        duration: 0.5,
    })
}
