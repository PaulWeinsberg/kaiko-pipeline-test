<template>
    <li :class="classNames">
        <div class="value">
            <SIFitText ref="fitText" :font-size="fontSize" @mounted="setAnim">
                <span v-if="prefix">{{ prefix }}</span>
                <span>{{ numberAddSpace(count) }}</span>
                <span v-if="suffix">{{ suffix }}</span>
            </SIFitText>
        </div>
        <p v-si-color="titleColor" class="title">{{ title }}</p>
        <SIWys v-if="content" :content="content" />
    </li>
</template>

<script>
    import { numberAddSpace } from '../../core'
    import { mapState } from 'vuex'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import { colors } from '../../data/validator.data'
    import SIFitText from '../organisms/SIFitText.vue'

    export default {
        name: 'KeyFigure',
        components: { SIFitText },
        props: {
            title: {
                type: String,
                required: false,
                default: null,
            },
            titleColor: {
                type: String,
                required: false,
                default: 'electric-blue-700',
                validator: val => colors.includes(val),
            },
            content: {
                type: String,
                required: true,
            },
            number: {
                type: String,
                required: true,
            },
            suffix: {
                type: String,
                required: false,
                default: null,
            },
            prefix: {
                type: String,
                required: false,
                default: null,
            },
            fontSize: {
                type: Number,
                required: false,
                default: null,
            },
        },
        data: () => ({
            count: 0,
            loading: true,
            fontSizeDefault: 5,
            isCountingWidth: false,
            scrollTriggerId: null,
        }),
        computed: {
            ...mapState({
                windowWidth: state => state.general.windowWidth,
            }),
            classNames() {
                const { loading } = this
                return ['key-figure', { loading }]
            },
        },
        created() {
            this.count = this.number
        },
        beforeMount() {
            const { _uid } = this
            this.scrollTriggerId = `numberScrollTrigger_${_uid}`
        },
        destroyed() {
            this.scrollTriggerKill()
        },
        methods: {
            /**
             * Permet d'ajouter des espaces à des nombres
             */
            numberAddSpace,
            /**
             * Permet de set l'animation
             */
            setAnim() {
                this.countAnim()
                this.loading = false
            },
            /**
             * Permet d'animer l'apparition des nombres à l'écran
             */
            countAnim() {
                const { scrollTriggerId, number } = this
                const zero = { val: 0 }
                const num = parseFloat(number)
                const split = (num + '').split('.')
                const decimals = split.length > 1 ? split[1].length : 0

                gsap.to(zero, {
                    val: num,
                    duration: 2,
                    scrollTrigger: {
                        id: scrollTriggerId,
                        trigger: this.$el,
                        start: 'top bottom',
                    },
                    onStart: () => {
                        this.loading = false
                    },
                    onUpdate: () => {
                        this.count = zero.val.toFixed(decimals)
                    },
                })
            },
            /**
             * Permet de kill le ScrollTrigger
             */
            scrollTriggerKill() {
                const { scrollTriggerId } = this
                const st = ScrollTrigger.getById(scrollTriggerId)
                if (st) st.kill()
            },
        },
    }
</script>

<style lang="scss" scoped>
    .key-figure {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-shrink: 0;
        width: calc((100% - (1.2rem * 3)) / 4);
        box-sizing: border-box;
        margin-right: 1.2rem;
        &.loading {
            opacity: 0;
            visibility: hidden;
        }
        @media screen and (min-width: $littleTabletBreakPointMin) {
            &:last-child {
                margin-right: 0;
            }
        }
        @media screen and (max-width: $littleTabletBreakPoint) {
            width: calc((100% - 1.2rem) / 2);
            margin-top: 2rem;
            &:nth-child(2n + 2) {
                margin-right: 0;
            }
            &:first-child,
            &:nth-child(2) {
                margin-top: 0;
            }
        }
        @media screen and (max-width: $littleMobileBreakPoint) {
            width: 100%;
            margin-right: 0;
            &:not(:last-child) {
                margin-bottom: 1.2rem;
            }
        }
        .value {
            display: flex;
            width: 100%;
            margin-top: auto;
            flex: 1;
            align-items: center;
            margin-bottom: 0.8rem;
            p {
                font-weight: 100;
            }
        }
        .title {
            margin-top: auto;
            font-weight: 500;
            height: 1.25rem;
        }
        .title + .si-wys {
            margin-top: 0.8rem;
        }
        .si-wys {
            margin-top: auto;
            flex: 1;
            ul {
                width: inherit;
            }
        }
    }
</style>
