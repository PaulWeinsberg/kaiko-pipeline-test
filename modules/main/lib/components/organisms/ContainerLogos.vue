<template>
    <SISection
        :background="content.background"
        :text-color="content.background.text_color"
        class="container-logos"
        @mouseenter.native="onMouseEnter"
        @mouseleave.native="onMouseLeave"
    >
        <div class="wrapper" :style="style">
            <p v-if="hasTitle" class="title">{{ content.title }}</p>
            <ul ref="logos" class="logos">
                <li v-for="(logo, i) in content.logos" ref="logo" :key="i">
                    <SIImage :image="logo.logo.url" />
                    <SILink v-if="logo.link" :path="logo.link" />
                </li>
            </ul>
        </div>
    </SISection>
</template>

<script>
    import { elementGetOneSidePadding } from '../../core'
    import gsap from 'gsap'
    import SILink from '../molecules/SILink.vue'

    export default {
        name: 'ContainerLogos',
        components: { SILink },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        data: () => ({
            animate: null,
            timeline: gsap.timeline({ paused: true }),
            length: null,
            boxWidth: null,
            totalWidth: null,
            modifier: null,
            oneSidePadding: 0,
        }),
        computed: {
            hasTitle() {
                const { title } = this.content
                return !!title
            },
            style() {
                const { oneSidePadding, hasTitle } = this
                if (!hasTitle) return {}
                return {
                    paddingLeft: `${oneSidePadding}px`,
                }
            },
        },
        watch: {
            animate(nV) {
                const { timeline } = this
                if (nV) {
                    timeline.play()
                } else {
                    this.setBasePosition()
                    timeline.pause()
                }
            },
        },
        beforeMount() {
            this.setPaddingWysiwyg()
        },
        mounted() {
            this.setBaseValues()
            this.setBasePosition()
            this.setTimeline()
            this.setDynamicValues()
            window.addEventListener('resize', this.onResize, false)
        },
        destroyed() {
            const { timeline } = this
            timeline.kill()
            window.removeEventListener('resize', this.onResize, false)
        },
        methods: {
            /**
             * Au hover in
             */
            onMouseEnter() {
                const { animate, timeline } = this
                if (animate) timeline.pause()
            },
            /**
             * Au hover out
             */
            onMouseLeave() {
                const { animate, timeline } = this
                if (animate) timeline.play()
            },
            /**
             * Au resize
             */
            onResize() {
                this.setPaddingWysiwyg()
                this.setDynamicValues()
            },
            /**
             * Permet de récupérer le padding à mettre à gauche pour que ça reste aligné
             */
            setPaddingWysiwyg() {
                this.oneSidePadding = elementGetOneSidePadding({})
            },
            /**
             * Permet de définir nos valeurs de base, dont nous aurons besoin pour l'animation
             */
            setBaseValues() {
                const { content, $refs } = this
                // Le nombre de logo
                this.length = content.logos.length
                // La largeur d'une box
                const logo = $refs.logo[0]
                const marginLeft = getComputedStyle(logo).marginLeft
                this.boxWidth = logo.clientWidth + parseFloat(marginLeft) * 2
                // La largeur total
                this.totalWidth = this.boxWidth * this.length
                // Le modifier, qui est un peu décalé par rapport au ul
                this.modifier = gsap.utils.wrap(
                    -this.boxWidth,
                    this.totalWidth - this.boxWidth
                )
            },
            /**
             * Permet de définir les valeurs dynamiques
             */
            setDynamicValues() {
                const { $refs } = this
                this.animate = this.totalWidth > $refs.logos.clientWidth
            },
            /**
             * Permet de mettre nos éléments HTML en position
             */
            setBasePosition() {
                const { $refs, totalWidth, boxWidth } = this
                // On définit la width du container
                gsap.set($refs.logos, {
                    width: totalWidth,
                })
                // On décale chaque logo
                gsap.set($refs.logo, {
                    x: i => i * boxWidth,
                    yPercent: -50,
                })
            },
            /**
             * Permet de définir la timeline
             */
            setTimeline() {
                const { $refs, totalWidth, modifier, length, content } = this

                let duration = parseFloat(content.base_duration)
                duration += parseFloat(content.duration_increment * length)

                this.timeline.to(
                    $refs.logo,
                    {
                        x: `+=${totalWidth}`,
                        modifiers: {
                            x: x => modifier(parseFloat(x)) + 'px',
                        },
                        duration,
                        ease: 'none',
                        repeat: -1,
                    },
                    0
                )
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-logos {
        min-height: 4.3rem;
        .wrapper {
            display: flex;
            padding: 1.45rem 0;
            flex: 1;
            .title {
                text-transform: uppercase;
                font-weight: 700;
                line-height: 140%;
                font-size: 1rem;
                letter-spacing: 0.16em;
                width: 11rem;
                flex-shrink: 0;
                text-align: center;
                margin-right: 3rem;
                @media screen and (max-width: $mobileBreakPoint) {
                    width: 8rem;
                }
            }
            .logos {
                display: flex;
                position: relative;
                width: 100%;
                overflow: hidden;
                li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    max-width: 6rem;
                    width: 100%;
                    height: 100%;
                    flex-shrink: 0;
                    margin: 0 0.8rem;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    .si-image {
                        max-width: 100%;
                        max-height: 100%;
                        width: auto;
                        :deep(img) {
                            object-fit: contain;
                        }
                    }
                    .si-link {
                        position: absolute;
                        inset: 0;
                    }
                }
            }
        }
    }
</style>
