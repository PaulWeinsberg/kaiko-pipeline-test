<template>
    <component :is="tag" :class="classNames">
        <div class="wrapper">
            <div class="content">
                <SILink design="secondary" class="title" :title="title" :path="link.path" />
                <SIWys v-if="contentIntern" :content="contentIntern" />
            </div>
            <div class="dates">
                <div v-if="publicationDate" class="publication_date">
                    <div class="title">
                        Publication date
                    </div>
                    <div class="value">
                        {{ formatDate(publicationDate) }}
                    </div>
                </div>
                <div v-if="revisionDate" class="revision_date">
                    <div class="title">
                        Revision date
                    </div>
                    <div class="value">
                        {{ formatDate(revisionDate) }}
                    </div>
                </div>
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
            revisionDate: {
                type: Date,
                required: false,
                default: null,
            },
            publicationDate: {
                type: Date,
                required: false,
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
                    text: item.fields.download_only
                        ? item.fields.download_show_label ?? 'Download'
                        : item.fields.download_show_label ?? 'View resource',
                    path: item.fields.download_only
                    ? item.fields.download_file?.url ?? item.fields.download_link
                    : item.url
                }
            },
        },
        methods: {
            formatDate(date) {
                if (!date) return ''
                return new Date(date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .list-resource {
        .wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            gap: 2rem;
            .content {
                flex: 0 0 calc(60% - 2rem);
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
            .dates {
                flex: 0 0 25%;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: flex-start;
                // align-self: flex-start;
                gap: 2rem;
                .publication_date,
                .revision_date {
                    flex: 0 0 calc(50% - 1rem);
                    font-size: 0.75rem;
                    .title {
                        font-weight: 600;
                    }
                    .value {}
                }
            }
            .link {
                display: block;
                flex: 0 0 calc(15% - 2rem);
                text-align: right;
            }
        }
    }
</style>