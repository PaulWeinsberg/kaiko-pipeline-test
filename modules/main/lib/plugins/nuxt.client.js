import { gsap } from 'gsap'
import { CustomEase } from 'gsap/dist/CustomEase'
import { SplitText } from 'gsap/dist/SplitText'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

/**
 * Enregistre les plugins GSAP
 */
const registerGsapPlugins = () => {
    gsap.registerPlugin(CustomEase, SplitText, ScrollToPlugin, ScrollTrigger)
}

/**
 * On créer une transition douce
 */
const createCustomEase = () => {
    CustomEase.create('basic', '0.65, 0.005, 0.35, 0.995')
}

export default (context, inject) => {
    registerGsapPlugins()
    createCustomEase()

    inject('gsap', gsap)
}
