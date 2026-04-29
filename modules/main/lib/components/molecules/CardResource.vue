<template>
    <component :is="tag" :class="classNames">
        <SIImage :image="imageIntern">
            <LinkCard :path="path" @hover="onHover" />
            <Tag v-if="tagPrimary" :title="tagPrimary.name" />
        </SIImage>
        <div class="container">
            <LinkCard :path="path" @hover="onHover" />
            <div class="head-wrap">
                <DateText v-if="date" :date="date">
                </DateText>
                <span v-if="category" class="category">
                    {{ category.name }}
                </span>
            </div>
            <SILink class="title" :title="title" :path="path" />
            <SIWys v-if="contentIntern" :content="contentIntern" />
            <WrittenBy
                v-if="authors && authors.length"
                light
                :authors="authors"
            />
        </div>
    </component>
</template>

<script>
    import { mapState } from 'vuex'
    import { stringTruncate } from '../../core'
    import cardMixin from '../../mixins/cardMixin'
    import Tag from '../atoms/Tag.vue'
    import DateText from './DateText.vue'
    import SIImage from './SIImage.vue'
    import SILink from './SILink.vue'
    import SIWys from './SIWys.vue'
    import WrittenBy from './WrittenBy.vue'
    import LinkCard from './LinkCard.vue'

    export default {
        name: 'CardResource',
        components: {
            WrittenBy,
            Tag,
            SILink,
            SIWys,
            DateText,
            SIImage,
            LinkCard,
        },
        mixins: [cardMixin],
        props: {
            primary: {
                type: Boolean,
                required: false,
                default: null,
            },
            grid: {
                type: Boolean,
                required: false,
                default: null,
            },
            date: {
                type: String,
                required: false,
            },
            title: {
                type: String,
                required: false,
                default: null,
            },
            content: {
                type: String,
                required: false,
                default: null,
            },
            path: {
                type: String,
                required: true,
            },
            image: {
                type: Object,
                required: false,
                default: null,
            },
            tag: {
                type: String,
                required: false,
                default: 'div',
            },
            taxonomies: {
                type: [Object, Array],
                required: false,
                default: () => ({}),
            },
            tags: {
                type: Array,
                required: false,
                default: () => [],
            },
            truncated: {
                type: Number,
                required: false,
                default: 0,
            },
            background: {
                type: Object,
                required: false,
                default: null
            },
        },
        computed: {
            ...mapState({
                options: state => state.options.options,
                wordings: state => state.options.options.wordings,
                windowWidth: state => state.general.windowWidth,
            }),
            isMobile() {
                const { windowWidth } = this
                return windowWidth <= 1180
            },
            isLittleMobile() {
                const { windowWidth } = this
                return windowWidth <= 580
            },
            classNames() {
                const { primary, grid, isMobile, isLittleMobile, hover, background } = this
                return [
                    'card-resource',
                    {
                        primary:
                            (primary && !isMobile && !grid) ||
                            grid ||
                            isLittleMobile,
                        'bg-white': background?.background_color === 'white-100'
                    },
                    { grid },
                    { hover }
                ]
            },
            imageIntern() {
                const { image, options } = this
                return image || options.default_image
            },
            taxonomiesIntern() {
                const { taxonomies } = this
                if (!taxonomies || !Object.keys(taxonomies).length) return {}
                return taxonomies
            },
            authors() {
                const { taxonomiesIntern } = this
                return taxonomiesIntern.author
            },
            category() {
                const { category } = this.taxonomiesIntern
                if (!category || !category.length) return null
                return category[0]
            },
            tagPrimary() {
                const { tag } = this.taxonomiesIntern
                if (!tag || !tag.length) return null
                return tag[0]
            },
            contentIntern() {
                const { content, truncated } = this
                if (!truncated) return content
                const test = stringTruncate({
                    string: content,
                    max: truncated,
                })
                return test.string
            },
        },
    }
</script>

<style scoped lang="scss">
    .card-resource {
        display: flex;
        flex-shrink: 0;
        flex-direction: row;
        align-items: flex-start;
        width: auto;
        max-width: unset;
        @include parent-has-class(':not(.primary)') {
            flex-wrap: wrap;
        }
        .si-image {
            position: relative;
            overflow: visible;
            width: 14rem;
            flex-shrink: 0;
            @include parent-has-class(':not(.grid)') {
                @include parent-has-class('.primary') {
                    flex-shrink: initial;
                    width: initial;
                }
            }
            @media screen and (max-width: $littleLaptopBreakPoint) {
                width: 11rem;
            }
            .tag {
                position: absolute;
                left: 1.2rem;
                top: 0;
                transform: translateY(-50%);
            }
        }
        .container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: calc(100% - 14rem);
            padding: 0.75rem;
            box-sizing: border-box;
            margin: 0;
            position: relative;
            background-color: white;
            @media screen and (max-width: $littleLaptopBreakPoint) {
                width: calc(100% - 11rem);
            }
            .head-wrap {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                gap: .8rem;
                .category {
                    display: flex;
                    align-items: center;
                    &:before {
                        content: '';
                        width: 0.3rem;
                        height: 0.3rem;
                        flex-shrink: 0;
                        margin-right: .8rem;
                        background-color: var(--sunflower-700);
                        display: flex;
                        border-radius: 50%;
                    }
                }
            }
            .title {
                margin-top: 0.55rem;
                font-weight: 700;
                font-size: 0.75rem;
                line-height: 1.4em;
                text-transform: uppercase;
                @include parent-has-class('.hover') {
                    text-decoration: underline;
                }
            }
            .si-wys {
                margin: 0.4rem 0;
                :deep(p) {
                    line-height: 1.6em;
                }
            }
            .written-by {
                margin-top: auto;
                :deep(.si-link) {
                    .si-link-title {
                        font-weight: 400;
                        font-size: 0.7rem;
                    }
                }
            }
        }
        &.bg-white {
          .container {
            background: var(--gradient-blue-700);
            * {
              color: white;
            }
          }
        }
        &.primary {
            flex-direction: column;
            max-width: 31.8rem;
            .si-image {
                width: auto;
            }
            .container {
                width: 100%;
                .title {
                    margin-top: 1.05rem;
                }
                .si-wys {
                    margin-top: 0.8rem;
                }
                .written-by {
                    margin-top: 0.9rem;
                }
            }
        }
    }
</style>
