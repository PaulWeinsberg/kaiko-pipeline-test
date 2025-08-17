<template>
    <Fragment>
        <component
            :is="tag"
            v-for="(item, i) in card"
            :key="i"
            v-bind="attr(item, i)"
        />
    </Fragment>
</template>

<script>
    import { mapState } from 'vuex'
    import { Fragment } from 'vue-frag'
    import ThreeBlocItemUnordered from './ThreeBlocItemUnordered.vue'
    import ThreeBlocItemOrdered from './ThreeBlocItemOrdered.vue'

    export default {
        name: 'ThreeBlocItem',
        components: { ThreeBlocItemUnordered, ThreeBlocItemOrdered, Fragment },
        props: {
            card: {
                type: Array,
                required: true,
            },
            mobileCarousel: {
                type: Boolean,
                required: true,
            },
            typeCard: {
                type: String,
                required: true,
            },
            isLittle: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            ...mapState({
                windowWidth: state => state.general.windowWidth,
            }),
            tag() {
                const { typeCard } = this
                if (typeCard === 'ordered') return 'ThreeBlocItemOrdered'
                return 'ThreeBlocItemUnordered'
            },
            isMobile() {
                return this.windowWidth <= 1080
            },
            classNames() {
                const { mobileCarousel, isMobile, isLittle } = this
                return [
                    'three-bloc-item',
                    {
                        'swiper-slide': mobileCarousel && isMobile,
                    },
                    { 'is-little': isLittle },
                ]
            },
        },
        methods: {
            attr(item, i) {
                const { typeCard, classNames, isLittle } = this
                const valuesShared = {
                    title: item.title,
                    text: item.text,
                    textBelow: item.text_below_content,
                    class: classNames,
                    link: item.link || null,
                    isLittle,
                }
                if (typeCard === 'ordered')
                    return {
                        ...valuesShared,
                        icon: item.icon_list.icon,
                        number: i + 1,
                    }
                return {
                    ...valuesShared,
                    disabled: item.disabled,
                    image: item.image,
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .three-bloc-item {
        display: flex;
        flex-direction: column;
        color: var(--white-100);
        background: var(--gradient-blue-500);
        padding: 2rem;
        width: calc((100% / 3) - (1.2rem * 0.67));
        box-sizing: border-box;
        box-shadow: 4px 8px 40px rgba(0, 0, 0, 0.16);
        &.is-little {
            padding: 1.5rem;
        }
        &:nth-child(3n-8) {
            background: var(--gradient-blue-700);
        }
        &:nth-child(3n-6) {
            background: var(--gradient-blue-300);
        }
        @media screen and (max-width: $tabletBreakPoint) {
            width: calc((100% / 2) - 0.6rem);
        }
        @media screen and (max-width: $littleMobileBreakPoint) {
            width: 100%;
        }
        &:not(:first-child) {
            @include parent-has-class('.swiper-slide') {
                margin-left: 1.2rem;
            }
        }
        :deep {
            .si-wys {
                ul {
                    width: auto;
                }
            }
        }
        &.disabled {
            background: var(--gradient-grey-100);
            color: var(--black-500);
        }
    }
</style>
