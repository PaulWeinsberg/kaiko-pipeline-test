import { mapState } from 'vuex'
import { scrollTo } from '@spin-interactive/js-core'

// lastTouchTime is used for ignoring emulated mousemove events
let lastTouchTime = 0

export default {
    head() {
        const { seo, options } = this
        const { headband_text } = options
        const htmlClass = []
        if (headband_text) htmlClass.push('has-upon-menu')

        return {
            title: seo.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: seo.description,
                },
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: seo.favicon,
                },
            ],
            htmlAttrs: {
                class: htmlClass.join(' '),
            },
        }
    },
    data: () => ({
        fullScreenEvents: [
            'fullscreenchange',
            'mozfullscreenchange',
            'MSFullscreenChange',
            'webkitfullscreenchange',
        ],
    }),
    computed: {
        ...mapState({
            seo: state => state.seo.seo,
            options: state => state.options.options,
        }),
    },
    mounted() {
        window.addEventListener('load', this.onLoadWindowScrollToHash)
        this.setWindowsWidth()
        window.addEventListener('resize', this.setWindowsWidth)
        this.onFullScreenChangeAddEvents()

        this.watchForHover()
    },
    destroyed() {
        window.removeEventListener('load', this.onLoadWindowScrollToHash)
        this.onFullScreenChangeRemoveEvents()
        document.removeEventListener(
            'touchstart',
            this.updateLastTouchTime,
            true
        )
        document.removeEventListener('touchstart', this.disableHover, true)
        document.removeEventListener('mousemove', this.enableHover, true)
    },
    methods: {
        /**
         * Permet de lancer des fonctions lors du load de la fenêtre
         */
        onLoadWindowScrollToHash() {
            const hash = window.location.hash.substring(1)
            if (!hash) return
            scrollTo(`#${hash}`, {
                toVars: { duration: 0 },
            })
        },
        /**
         * Permet de set la taille de l'écran au resize
         */
        setWindowsWidth() {
            const { $store, windowWidth } = this
            const newWidth = window.innerWidth
            if (windowWidth !== newWidth) {
                $store.commit('general/SET_WINDOW_WIDTH', newWidth)
            }
        },
        /**
         * Permet de vérifier si on peut utiliser le hover ou non
         */
        watchForHover() {
            document.addEventListener(
                'touchstart',
                this.updateLastTouchTime,
                true
            )
            document.addEventListener('touchstart', this.disableHover, true)
            document.addEventListener('mousemove', this.enableHover, true)

            this.enableHover()
        },
        /**
         * Ajoute la classe sur le body si on peut utiliser le hover
         */
        enableHover() {
            if (new Date() - lastTouchTime < 500) return
            document.body.classList.add('has-hover')
        },
        /**
         * Supprime la classe sur le body si on ne peut pas hover
         */
        disableHover() {
            document.body.classList.remove('has-hover')
        },
        /**
         * Met à jour le lastTouchTime
         */
        updateLastTouchTime() {
            lastTouchTime = new Date()
        },
        /**
         * On ajoute un évènement pour savoir si on est en fullScreen
         */
        onFullScreenChangeAddEvents() {
            const { fullScreenEvents } = this

            fullScreenEvents.forEach(event => {
                document.addEventListener(event, this.onFullScreenChange, false)
            })
        },
        /**
         * On kill les évènements
         */
        onFullScreenChangeRemoveEvents() {
            const { fullScreenEvents } = this

            fullScreenEvents.forEach(event => {
                document.removeEventListener(
                    event,
                    this.onFullScreenChange,
                    false
                )
            })
        },
        /**
         * Si le fullscreen change, on emit alors un évènement Nuxt
         */
        onFullScreenChange() {
            this.$nuxt.$emit('fullscreen:change', {
                fullscreen:
                    document.webkitIsFullScreen ||
                    document.mozFullScreen ||
                    document.msFullscreenElement,
            })
        },
    },
}
