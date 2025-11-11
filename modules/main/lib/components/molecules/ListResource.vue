<template>
    <component :is="tag" :class="classNames">
        <div class="wrapper">
            <div class="content">
                <SILink design="secondary" class="title" :title="title" :path="link.path" />
                <SIWys v-if="contentIntern" :content="contentIntern" />
            </div>
            <SILink design="quaternary" class="link" :title="link.text" :path="link.path" />
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
            item: {
                type: Object,
                required: true,
                default: null,
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
            link() {
                const { item } = this;
                return {
                    text: item.fields.download_only ? 'Download' : 'View resource',
                    path: item.fields.download_only
                    ? item.fields.download_file?.url ?? item.fields.download_link
                    : item.url
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .list-resource {
        .wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            gap: 4rem;
            .content {
                .title {
                    margin-top: 0.55rem;
                    font-weight: 700;
                    font-size: 0.75rem;
                    line-height: 1.4em;
                    text-transform: uppercase;
                    color: var(--electric-blue-700);
                    @include parent-has-class('.hover') {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>
