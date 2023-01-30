import { mapState } from 'vuex'

// lastTouchTime is used for ignoring emulated mousemove events
let lastTouchTime = 0

export default {
    head() {
        const { seo } = this

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
        }),
    },
    mounted() {
        this.onFullScreenChangeAddEvents()

        this.watchForHover()
    },
    destroyed() {
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
