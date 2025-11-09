<template>
    <component :is="tag" :class="classNames">
        <div class="container">
            <SILink class="title" :title="title" :path="path" />
            <SIWys v-if="contentIntern" :content="contentIntern" />
        </div>
    </component>
</template>

<script>
    import { mapState } from 'vuex'
    import { stringTruncate } from '../../core'
    import cardMixin from '../../mixins/cardMixin'
    import SILink from './SILink.vue'
    import SIWys from './SIWys.vue'
    import LinkCard from './LinkCard.vue'

    export default {
        name: 'ListResource',
        components: {
            SILink,
            SIWys,
            LinkCard,
        },
        mixins: [cardMixin],
        props: {
            grid: {
                type: Boolean,
                required: false,
                default: null,
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
            tag: {
                type: String,
                required: false,
                default: 'div',
            },
            truncated: {
                type: Number,
                required: false,
                default: 0,
            },
        },
        computed: {
            ...mapState({
                options: state => state.options.options,
                wordings: state => state.options.options.wordings,
                windowWidth: state => state.general.windowWidth,
            }),
            classNames() {
                const { grid, hover } = this
                return [
                    'list-resource',
                    { grid },
                    { hover },
                ]
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
    .list-resource {
        display: flex;
        flex-shrink: 0;
        flex-direction: row;
        align-items: flex-start;
        width: auto;
        max-width: unset;
        .si-image {
            position: relative;
            overflow: visible;
            width: 14rem;
            flex-shrink: 0;
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
            padding: 0.5rem 0.9rem 0.3rem 2rem;
            box-sizing: border-box;
            margin: 0;
            position: relative;
            @media screen and (max-width: $littleLaptopBreakPoint) {
                width: calc(100% - 11rem);
                padding: 0.75rem;
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
        }
    }
</style>
