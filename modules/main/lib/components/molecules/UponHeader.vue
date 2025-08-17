<template>
    <div
        class="upon-header"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <SIWrapper
            ref="wrapper"
            name="menu"
            align-items="center"
            justify-content="center"
        >
            <div ref="text" class="text">
                <p>{{ text }}</p>
                <div v-if="link" class="link">
                    <span class="ponctuation"></span>
                    <SILink
                        :design="link.design"
                        :title="link.text"
                        :path="link.link"
                        :icon="link.icon"
                    />
                </div>
            </div>
        </SIWrapper>
    </div>
</template>

<script>
    import { gsap } from 'gsap'
    import SIWrapper from '../atoms/SIWrapper.vue'

    export default {
        name: 'UponHeader',
        components: { SIWrapper },
        props: {
            text: {
                type: String,
                required: true,
            },
            link: {
                type: Object,
                required: true,
            },
            duration: {
                type: String,
                required: false,
                default: '30',
            },
        },
        data: () => ({
            wrapperWidth: null,
            textWidth: null,
            totalWidth: null,
            animate: false,
            animateTmp: false,
            timeline: gsap.timeline({ paused: true }),
        }),
        watch: {
            animate(nV) {
                const { timeline } = this
                nV ? timeline.play() : timeline.pause()
            },
        },
        mounted() {
            this.setBaseValues()
            this.setTimeline()
            this.setBasePosition()
            this.setAnimate()
            window.addEventListener('resize', this.onResize, false)
        },
        destroyed() {
            const { timeline } = this
            timeline.kill()
            window.removeEventListener('resize', this.onResize, false)
        },
        methods: {
            setBaseValues() {
                const { $refs } = this
                this.wrapperWidth = $refs.wrapper.$el.clientWidth
                this.textWidth = $refs.text.clientWidth
                this.totalWidth = this.textWidth + this.wrapperWidth + 40
                this.animateTmp = this.textWidth > this.wrapperWidth
                this.modifier = gsap.utils.wrap(
                    this.wrapperWidth,
                    -this.totalWidth
                )
            },
            setBasePosition() {
                const { $refs, wrapperWidth, animateTmp } = this
                gsap.set($refs.text, {
                    x: animateTmp ? wrapperWidth + 'px' : '0%',
                    left: animateTmp ? '' : '0%',
                })
            },
            /**
             * Permet de définir les valeurs dynamiques
             */
            setAnimate() {
                const { animateTmp } = this
                this.animate = animateTmp
            },
            /**
             * Permet de définir la timeline
             */
            setTimeline() {
                const { $refs, duration, totalWidth, modifier } = this

                this.timeline = gsap.timeline({ paused: true }).to(
                    $refs.text,
                    {
                        x: `-=${totalWidth}`,
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
            onResize() {
                this.animate = false
                this.timeline.kill()
                this.$nextTick(() => {
                    this.setBaseValues()
                    this.setTimeline()
                    this.setAnimate()
                })
            },
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
        },
    }
</script>

<style scoped lang="scss">
    .upon-header {
        display: flex;
        height: var(--uponHeaderHeight);
        background: var(--gradient-blue-400);
        width: 100%;
        color: var(--white-100);
        .si-wrapper {
            .text {
                display: flex;
                align-items: center;
                justify-content: center;
                .si-link,
                p {
                    white-space: nowrap;
                    font-weight: 400;
                    font-size: 0.7rem;
                    line-height: 140%;
                }
                .link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .ponctuation {
                        background-color: var(--sunflower-700);
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        display: block;
                        margin: 0 0.8em;
                    }
                }
            }
        }
    }
</style>
