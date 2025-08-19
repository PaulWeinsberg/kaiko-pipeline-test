<template>
    <component
        :is="tag"
        ref="item"
        :class="classNames"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click.stop="toggleOpened"
    >
        <div class="card-faq-header">
            <p class="card-faq-title">{{ title }}</p>
            <div class="state"><span class="symbol" /></div>
        </div>
        <div ref="container" class="card-faq-container">
            <SIWys class="card-faq-answer" :content="answer" />
        </div>
    </component>
</template>

<script>
    import { gsap } from 'gsap'
    export default {
        name: 'CardFAQ',
        props: {
            tag: {
                type: String,
                required: false,
                default: 'li',
            },
            title: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: true,
            },
            first: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        data: () => ({
            hover: false,
            opened: false,
            tl: gsap.timeline({
                reversed: true,
                paused: true,
            }),
        }),
        computed: {
            classNames() {
                const { opened } = this
                return ['card-faq', { opened }]
            },
        },
        watch: {
            opened(nV) {
                const { tl } = this
                if (nV) {
                    tl.play()
                } else {
                    tl.reverse()
                }
            },
        },
        created() {
            this.opened = this.first
        },
        mounted() {
            this.setPropagationStop()
            this.setTimeline()
        },
        methods: {
            /**
             * Permet de ne pas lancer la fermeture si on clique sur un lien dans la FAQ
             */
            setPropagationStop() {
                const { container } = this.$refs
                const links = container.querySelectorAll('a') || []
                links.forEach(link => {
                    link.addEventListener('click', e => {
                        e.stopPropagation()
                    })
                })
            },
            /**
             * Permet de définir la timeline
             */
            setTimeline() {
                const { $refs, tl } = this
                const { container } = $refs
                this.tl = tl.to(container, {
                    height: 'auto',
                    duration: 0.3,
                    opacity: 1,
                    pointerEvents: 'auto',
                    ease: 'basic',
                })
            },
            toggleOpened() {
                this.opened = !this.opened
            },
            /**
             * Quand on passe au hover sur un élément
             */
            onMouseEnter() {
                this.hover = true
            },
            /**
             * Quand on quitte le hover sur un élément
             */
            onMouseLeave() {
                this.hover = false
            },
        },
    }
</script>

<style scoped lang="scss">
    .card-faq {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        padding: 1.2rem 0;
        border-top: 1px solid var(--black-300);
        border-bottom: 1px solid var(--black-300);
        box-sizing: border-box;
        cursor: pointer;
        transition: all 0.3s ease-in;
        color: var(--midnight-blue-700);
        &:first-child {
            border-top: 0;
            padding-top: 0;
        }
        &:last-child {
            border-bottom: 0;
            padding-bottom: 0;
        }
        .card-faq-header {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            .card-faq-title {
                font-weight: 600;
                font-size: 0.8rem;
                line-height: 160%;
            }
        }
        .card-faq-container {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            height: 0;
            .card-faq-answer {
                margin-top: 0.8rem;
                :deep {
                    &,
                    p {
                        font-size: 0.8rem;
                        line-height: 1.1rem;
                    }
                }
            }
        }
        .state {
            @extend %btn;
            @extend %btnPrimary;
            display: flex;
            flex-shrink: 0;
            margin-left: 1.6rem;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            background-color: var(--white-100);
            position: relative;
            border: none;
            .symbol {
                &::before,
                &::after {
                    content: '';
                    display: flex;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    background-color: var(--black-500);
                    transition: 0.2s background-color 0.3s var(--cubicBezier);
                    @include parent-has-class('.opened') {
                        background-color: var(--sunflower-700);
                    }
                    @include parent-has-class(':hover') {
                        background-color: var(--white-100);
                    }
                }
                &::before {
                    width: 35%;
                    height: 2px;
                }
                &::after {
                    width: 2px;
                    height: 35%;
                    transition: 0.2s background-color 0.3s var(--cubicBezier),
                        height 0.3s var(--cubicBezier);
                    @include parent-has-class('.opened') {
                        height: 0;
                    }
                }
            }
        }
        &:hover {
            .state:before {
                transform: translateX(0%);
            }
        }
    }
</style>
