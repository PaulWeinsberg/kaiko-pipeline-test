<template>
    <component :is="tagEl" :class="classNames">
        <div ref="swiper" class="swiper">
            <component :is="tag" class="slides-wrapper swiper-wrapper">
                <slot />
            </component>
        </div>
        <div v-if="dots || arrows" class="swiper-controls">
            <div v-if="dots" ref="pagination" class="swiper-pagination" />
            <template v-if="arrows">
                <SIArrow
                    ref="prev"
                    :icon="iconArrow"
                    :color="arrowsColor"
                    class="swiper-button-prev"
                />
                <SIArrow
                    ref="next"
                    next
                    :icon="iconArrow"
                    :color="arrowsColor"
                    class="swiper-button-next"
                />
            </template>
        </div>
    </component>
</template>

<script>
    import { Autoplay, Navigation, Pagination, Swiper } from 'swiper'
    import SIArrow from '../atoms/SIArrow.vue'
    import SIIcon from '../atoms/SIIcon.vue'
    import { colors } from '../../data/validator.data'
    import 'swiper/swiper-bundle.css'

    export default {
        name: 'SISwiper',
        components: { SIArrow, SIIcon },
        props: {
            tagEl: {
                type: String,
                required: false,
                default: 'div',
            },
            tag: {
                type: String,
                required: false,
                default: 'ul',
            },
            loop: {
                type: Boolean,
                required: false,
                default: false,
            },
            centeredSlides: {
                type: Boolean,
                required: false,
                default: false,
            },
            slidesPerView: {
                type: [Number, String],
                required: false,
                default: 'auto',
            },
            loopedSlides: {
                type: Number,
                required: false,
                default: null,
            },
            breakpoints: {
                type: Object,
                required: false,
                default: null,
            },
            grabCursor: {
                type: Boolean,
                required: false,
                default: true,
            },
            arrows: {
                type: Boolean,
                required: false,
                default: false,
            },
            arrowsColor: {
                type: String,
                required: false,
                default: 'white-100',
                validator: val => colors.includes(val),
            },
            dots: {
                type: Boolean,
                required: false,
                default: false,
            },
            iconArrow: {
                type: String,
                required: false,
                default: 'c-arrow-right',
            },
        },
        data: () => ({
            swiper: null,
            isStart: true,
            isEnd: false,
            isLock: true,
        }),
        computed: {
            classNames() {
                const { isLock } = this
                return ['si-swiper', { 'is-lock': isLock }]
            },
        },
        watch: {
            isStart() {
                this.emitState()
            },
            isEnd() {
                this.emitState()
            },
            isLock() {
                this.emitLock()
            },
        },
        mounted() {
            Swiper.use([Navigation, Pagination, Autoplay])
            this.emitState()
            this.$nextTick(() => {
                this.init()
                this.lockSwiper()
            })
        },
        methods: {
            emitState() {
                this.$emit('swiper:state', {
                    isStart: this.isStart,
                    isEnd: this.isEnd,
                })
            },
            emitLock() {
                this.$emit('swiper:lock', this.isLock)
            },
            init() {
                const {
                    loop,
                    loopedSlides,
                    slidesPerView,
                    centeredSlides,
                    breakpoints,
                    grabCursor,
                } = this
                const options = {
                    loop,
                    loopedSlides,
                    centeredSlides,
                    slidesPerView,
                    breakpoints,
                    grabCursor,
                    preventClicks: false,
                    preventClicksPropagation: false,
                    pagination: {
                      el: this.$refs.pagination,
                    },
                    navigation: {
                      nextEl: this.$refs?.next?.$el,
                      prevEl: this.$refs?.prev?.$el,
                    },
                    watchOverflow: true,
                    freeMode: true,
                }
                this.swiper = new Swiper(this.$refs.swiper, options)
                this.isLock = this.swiper.isLocked
            },
            update() {
                this.swiper.update()
            },
            navigate({ next }) {
                const { swiper } = this
                if (next) {
                    swiper.slideNext()
                } else {
                    swiper.slidePrev()
                }
                this.isEnd = swiper.isEnd
                this.isStart = swiper.isBeginning
            },
            lockSwiper() {
                const { swiper } = this
                swiper.on('unlock', () => {
                    this.isLock = false
                })
                swiper.on('lock', () => {
                    this.isLock = true
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-swiper {
        display: flex;
        width: 100%;
        .swiper {
            display: flex;
            width: 100%;
            overflow: hidden;
            :deep(.swiper-slide) {
                display: flex;
                height: auto;
            }
        }
        .swiper-controls {
            display: flex;
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            .swiper-button-disabled {
                opacity: 0;
            }
        }
    }
</style>
