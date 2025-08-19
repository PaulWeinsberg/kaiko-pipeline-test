<template>
    <component :is="tag" :class="classNames">
        <SIImage :image="imageIntern">
            <Tag v-if="tagPrimary" :title="tagPrimary.name" />
        </SIImage>
        <div class="container">
            <DateText :date="date" />
            <SILink class="title" :title="title" :path="path" />
            <SIWys v-if="content" :content="contentIntern" />
            <LinkDownload :hover="hover" :path="path" :design="design" />
        </div>
        <LinkCard :path="path" @hover="onHover" />
    </component>
</template>

<script>
    import { mapState } from 'vuex'
    import { stringTruncate } from '../../core'
    import cardMixin from '../../mixins/cardMixin'
    import LinkCard from './LinkCard.vue'

    export default {
        name: 'CardReportVideo',
        components: { LinkCard },
        mixins: [cardMixin],
        props: {
            design: {
                type: String,
                required: true,
            },
            primary: {
                type: Boolean,
                required: false,
                default: null,
            },
            date: {
                type: String,
                required: true,
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
                type: [Array, Object],
                required: false,
                default: null,
            },
            file: {
                type: String,
                required: false,
                default: null,
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
            }),
            classNames() {
                const { primary } = this
                return ['card-report-video', { primary }]
            },
            tagPrimary() {
                const { taxonomies } = this
                if (!taxonomies || !taxonomies.tag || !taxonomies.tag.length) {
                    return null
                }
                return taxonomies.tag[0]
            },
            imageIntern() {
                const { image, options } = this
                return image || options.default_image
            },
            contentIntern() {
                const { content, truncated } = this
                if (!truncated) return content
                const text = stringTruncate({
                    string: content,
                    max: truncated,
                })
                return text.string
            },
        },
    }
</script>

<style scoped lang="scss">
    .card-report-video {
        display: flex;
        flex-direction: column;
        background-color: var(--white-100);
        color: var(--midnight-blue-700);
        align-items: flex-start;
        position: relative;
        .hero & {
            @media screen and (max-width: 1180px) {
                max-width: 35rem;
                margin: 0 auto;
                width: 100%;
            }
        }
        .si-image {
            flex-shrink: 0;
            .tag {
                position: absolute;
                left: 1.2rem;
                top: 1.2rem;
            }
        }
        .container {
            display: flex;
            flex-direction: column;
            padding: 2rem;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            .hero & {
                @media screen and (max-width: 1180px) {
                    height: auto;
                }
            }
            @media screen and (max-width: 800px) {
                height: auto;
            }
            .b-white-100 & {
                border: 1px solid var(--black-300);
                border-top: 0;
            }

            .title {
                color: var(--midnight-blue-700);
                font-size: 0.75rem;
                margin: 1.2rem 0;
                line-height: 140%;
                font-weight: 700;
                text-transform: uppercase;
                &:hover {
                    text-decoration: underline;
                }
            }
            .si-wys {
                margin-bottom: 1.2rem;
                :deep(p) {
                    line-height: 170%;
                }
            }
            .link-download {
                margin-top: auto;
            }
        }
        @media screen and (min-width: 1181px) {
            &:not(.primary) {
                flex-direction: row;
                .si-image {
                    max-height: unset;
                    max-width: 13.15rem;
                }
                .container {
                    justify-content: center;
                }
            }
        }
    }
</style>
