import { gsap } from 'gsap'

const animationsFactory = () => ({
    /**
     * Permet de faire des animations basique
     * @param {Object} el - L'élément ciblé
     * @param {Function} done - Fonction pour spécifier que l'animation est terminé
     * @param {Object} to - L'objet contenant les animations
     * @param {Number} [duration=0.2] - La durée de l'animation
     * @param {String} [ease=cubic] - Le nom du ease
     * @param {Number} [delay=0] - Le delay
     * @param {Function} doneCB - Fonction callback pour le complete
     */
    animation({
        el,
        done,
        to,
        duration = 0.2,
        ease = 'basic',
        delay = 0,
        doneCB = null,
    }) {
        const tl = gsap
            .timeline({
                onComplete: () => {
                    if (typeof doneCB === 'function') doneCB()
                    return done()
                },
            })
            .to(el, {
                duration,
                ease,
                ...to,
            })

        if (delay) tl.delay(delay)

        tl.play()
    },
    /**
     * Permet de faire un fadeIn
     * @param {Object} el L'élément ciblé
     * @param {Function} done Fonction pour spécifier que l'animation est terminé
     * @param {Function} onComplete Lancer une fonction au complete
     * @param {Number} duration La durée de l'animation
     * @param {Object} vars Ajouter des valeurs
     */
    fadeIn(el, done, { onComplete = null, duration = 0.5, vars = {} } = {}) {
        vars = vars || {}
        gsap.fromTo(
            el,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                pointerEvents: 'auto',
                duration,
                ...vars,
                onComplete: () => {
                    if (typeof onComplete === 'function') onComplete()
                    return done()
                },
            }
        )
    },
    /**
     * Permet de faire un fadeOut
     * @param {Object} el L'élément ciblé
     * @param {Function} done Fonction pour spécifier que l'animation est terminée
     * @param {Function} onComplete Lancer une fonction au complete
     * @param {Number} duration La durée de l'animation
     * @param {Object} vars Ajouter des valeurs
     */
    fadeOut(el, done, { onComplete = null, duration = 0.5, vars = {} } = {}) {
        vars = vars || {}
        gsap.fromTo(
            el,
            {
                opacity: 1,
            },
            {
                opacity: 0,
                pointerEvents: 'none',
                duration,
                ...vars,
                onComplete: () => {
                    if (typeof onComplete === 'function') onComplete()
                    return done()
                },
            }
        )
    },
    appearEnter(el, done) {
        gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            pointerEvents: '',
            onComplete: () => done(),
        })
    },
    appearLeave(el, done) {
        gsap.to(el, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            pointerEvents: 'none',
            onComplete: () => done(),
        })
    },
    killAnimation({ timeline }) {
        if (timeline) timeline.kill()
    },
    /**
     * Permet de créer une timeline de base
     * @param {Function} done La fonction pour passer à la suite
     * @param {Function} onComplete La fonction onComplete
     * @return {gsap.core.Timeline} La timeline
     */
    baseTimeline({ done, onComplete = null }) {
        return gsap.timeline({
            repeat: 0,
            paused: true,
            defaults: { duration: 0.2, ease: 'cubic' },
            onComplete: () => {
                if (typeof onComplete === 'function') onComplete()
                return done()
            },
        })
    },
})

export default (context, inject) => {
    const animations = animationsFactory(context)
    inject('animations', animations)
}
