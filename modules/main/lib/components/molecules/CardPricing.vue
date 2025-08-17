<template>
    <component :is="tag" :class="classNames">
        <LinkCard :path="button.link" @hover="onHover" />
        <p class="title">{{ title }}</p>
        <p class="price">
            {{ price }}
            <sup v-if="recurrence" class="recurrence">{{ recurrence }}</sup>
        </p>
        <SILink
            v-if="button"
            btn
            :hover="hover"
            :design="button.design"
            :title="button.text"
            :path="button.link"
            :icon="button.icon"
            icon-position="right"
        />
        <template v-if="features">
            <hr />
            <SIWys :content="features" />
        </template>
    </component>
</template>
<script>
    import cardMixin from '../../mixins/cardMixin'
    import SILink from '../molecules/SILink.vue'
    import SIWys from '../molecules/SIWys.vue'
    import LinkCard from './LinkCard.vue'

    export default {
        name: 'CardPricing',
        components: { LinkCard, SILink, SIWys },
        mixins: [cardMixin],
        props: {
            title: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
            recurrence: {
                type: String,
                required: false,
                default: null,
            },
            features: {
                type: String,
                required: false,
                default: null,
            },
            button: {
                type: Object,
                required: false,
                default: null,
            },
            highlighted: {
                type: Boolean,
                required: false,
                default: false,
            },
            isMobile: {
                type: Boolean,
                required: false,
                default: false,
            },
            tag: {
                type: String,
                required: false,
                default: 'li',
            },
        },
        computed: {
            classNames() {
                const { highlighted } = this
                return ['card-pricing', { highlighted }, 'swiper-slide']
            },
        },
    }
</script>

<style scoped lang="scss">
    .card-pricing {
        position: relative;
        padding: 2rem;
        background: var(--gradient-blue-200);
        width: 20.8rem;
        flex-shrink: 0;
        color: var(--midnight-blue-700);
        box-sizing: border-box;
        margin-right: 1.2rem;
        @media screen and (max-width: $littleMobileBreakPoint) {
            width: 14rem;
        }
        &.swiper-slide {
            flex-direction: column;
        }
        .title {
            font-size: 1rem;
            color: var(--sunflower-700);
            font-weight: 700;
            text-transform: uppercase;
            line-height: 140%;
            margin: 0 auto 2rem;
            letter-spacing: 0.16em;
            text-align: center;
            max-width: 16.8rem;
            min-height: 2.8rem;
        }
        .price {
            position: relative;
            font-size: 3.3rem;
            font-weight: 500;
            line-height: 100%;
            margin-bottom: 2rem;
            text-align: center;
            sup {
                position: absolute;
                top: 0.25rem;
                padding-left: 0.1rem;
                font-size: 0.8rem;
                font-weight: 600;
                line-height: 160%;
            }
        }
        .si-link {
            justify-content: center;
        }
        hr {
            display: flex;
            margin: 2rem 0;
            border-radius: 0;
            height: 1px;
            border: none;
            background: var(--black-400);
        }
        :deep(.si-wys) {
            p {
                margin-bottom: 0.8rem;
            }
            ul {
                padding-left: 0;
                li {
                    display: flex;
                    align-items: center;
                    font-size: 0.8rem;
                    line-height: 160%;
                    margin-bottom: 0.8rem;
                    &:before {
                        content: '\eb0a';
                        font-size: 0.9rem;
                        font-family: var(--iconsFont);
                        line-height: 1em;
                        color: var(--sunflower-700);
                        margin-right: 1.8rem;
                    }
                }
            }
        }
        &.highlighted {
            background: var(--midnight-blue-700);
            &,
            .title,
            :deep(.si-wys) ul li:before {
                color: var(--white-100);
            }
            .b-midnight-blue-700 & {
                border: 1px solid var(--black-400);
            }
        }
    }
</style>
