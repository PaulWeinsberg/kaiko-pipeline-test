import Vue, { nextTick } from 'vue'
import { uniqueGetId } from '../core'

/**
 * Permet de définir une classe pour la couleur
 */
Vue.directive('si-color', {
    bind: (el, { value }) => {
        nextTick(() => {
            const className = value ? `c-${value}` : ''
            setClass(el, className, 'c-')
        })
    },
    update: (el, { value }) => {
        nextTick(() => {
            const className = value ? `c-${value}` : ''
            setClass(el, className, 'c-')
        })
    },
})

/**
 * Permet de définir une classe pour la couleur de fond
 */
Vue.directive('si-background-color', {
    bind: (el, { value }) => {
        nextTick(() => {
            const className = value ? `b-${value}` : ''
            setClass(el, className, 'b-')
        })
    },
    update: (el, { value }) => {
        nextTick(() => {
            const className = value ? `b-${value}` : ''
            setClass(el, className, 'b-')
        })
    },
})

/**
 * Permet de définir un unique ID, même en SSR
 */
Vue.directive('si-uid', {
    bind: el => {
        el.setAttribute('id', el.id || uniqueGetId())
    },
})

/**
 * Permet de définir une classe pour la couleur
 * @param {HTMLElement} el L'élément Node à modifier
 * @param {String} value La class à ajouter
 * @param {String} start Le début de la class
 */
const setClass = (el, value, start) => {
    // Si une classe de ce type existe déjà, on la supprime
    if (el.classList) {
        el.classList.forEach(item => {
            if (item.startsWith(start)) {
                el.classList.remove(item)
            }
        })
    }

    if (value) el.classList.add(value)
}
