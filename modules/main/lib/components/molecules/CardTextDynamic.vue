<template>
    <li :class="classNames">
        <p class="title" @click="onClick">{{ title }}</p>
        <transition @enter="onEnter" @leave="onLeave">
            <div v-show="showIntern" ref="container" class="container">
                <SIWys :content="content" />
            </div>
        </transition>
    </li>
</template>

<script>
    import { elementGetRealWidth } from '../../core'

    export default {
        name: 'CardTextDynamic',
        props: {
            title: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            show: {
                type: Boolean,
                required: false,
                default: false,
            },
            isMobile: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        emits: ['click:item'],
        data: () => ({
            height: null,
            showMobileIntern: null,
        }),
        computed: {
            classNames() {
                const { showIntern } = this
                return ['card-text-dynamic', { active: showIntern }]
            },
            showIntern() {
                const { isMobile, show, showMobile } = this
                if (isMobile) return showMobile
                return show
            },
            showMobile: {
                get() {
                    const { show, showMobileIntern } = this
                    if (showMobileIntern === null) return show
                    return showMobileIntern
                },
                set(nV) {
                    this.showMobileIntern = nV
                },
            },
        },
        created() {
            this.showMobile = this.show
        },
        mounted() {
            this.$nextTick(() => {
                this.setCardHeight()
            })
            window.addEventListener('resize', this.setCardHeight, false)
        },
        destroyed() {
            window.removeEventListener('resize', this.setCardHeight, false)
        },
        methods: {
            /**
             * Lorsqu'on affiche le texte
             * @param {HTMLObjectElement} el L'élément
             * @param {Function} done La fonction de fin
             */
            onEnter(el, done) {
                const { isMobile, $animations } = this
                $animations.fadeIn(el, done, {
                    duration: 0.3,
                    vars: { delay: isMobile ? 0 : 0.3 },
                })
            },
            /**
             * Lorsqu'on cache le texte
             * @param {HTMLObjectElement} el L'élément
             * @param {Function} done La fonction de fin
             */
            onLeave(el, done) {
                const { $animations } = this
                $animations.fadeOut(el, done, {
                    duration: 0.3,
                })
            },
            /**
             * Au click sur le titre
             */
            onClick() {
                const { height, isMobile, showMobile } = this
                if (isMobile) {
                    this.showMobile = !showMobile
                } else {
                    this.$emit('click:item', { height })
                }
            },
            /**
             * Permet de définir la hauteur de l'élément
             */
            setCardHeight() {
                const { container } = this.$refs
                const { height } = elementGetRealWidth(container, {
                    target: this.$el,
                    style: {
                        display: 'block',
                    },
                })
                this.height = height
            },
        },
    }
</script>

<style scoped lang="scss">
    .card-text-dynamic {
        display: flex;
        flex-direction: column;
        @include parent-has-class(':not(.active):not(:last-child)') {
            @media screen and (max-width: $mobileBreakPoint) {
                margin-bottom: 0.4rem;
            }
        }
        .title {
            font-weight: 700;
            font-size: 0.75rem;
            line-height: 140%;
            color: var(--midnight-blue-300);
            text-transform: uppercase;
            cursor: pointer;
            transition: color 0.3s var(--cubicBezier);
            max-width: 20rem;
            width: 100%;
            margin-right: 2rem;
            &:hover {
                color: var(--midnight-blue-700);
                .b-midnight-blue-700 & {
                    color: var(--white-100);
                }
            }
            @media screen and (max-width: 1220px) {
                max-width: 17rem;
            }
            @media screen and (max-width: $littleTabletBreakPoint) {
                max-width: 11rem;
            }
            @media screen and (max-width: $mobileBreakPoint) {
                max-width: 100%;
            }
            @include parent-has-class('.active') {
                color: var(--midnight-blue-700);
                .b-midnight-blue-700 & {
                    color: var(--white-100);
                }
            }
            @include parent-has-class(':not(:last-child)') {
                @media screen and (min-width: $mobileBreakPointMin) {
                    margin-bottom: 1.6rem;
                }
            }
            @media screen and (max-width: $mobileBreakPoint) {
                margin-right: 0;
                margin-bottom: 1.6rem;
            }
        }
        .container {
            display: flex;
            position: absolute;
            right: 0;
            top: 0;
            width: calc(100% - 22rem);
            @media screen and (max-width: 1220px) {
                width: calc(100% - 19rem);
            }
            @media screen and (max-width: $littleTabletBreakPoint) {
                width: calc(100% - 13rem);
            }
            @media screen and (max-width: $mobileBreakPoint) {
                position: relative;
                margin-bottom: 1.6rem;
                width: 100%;
            }
        }
    }
</style>
