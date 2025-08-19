<template>
    <component :is="tag" class="card-news swiper-slide">
        <SIImage :image="imageIntern">
            <Tag v-if="tagIntern" :title="tagIntern.name" />
        </SIImage>
        <div class="content">
            <p class="location">{{ location }}</p>
            <p class="title h6">{{ title }}</p>
            <SIWys :content="contentIntern" />
            <DateText :date="date" />
            <SILink
                class="more"
                :title="wordings.text"
                :icon="wordings.icon"
                icon-position="right"
                :path="link"
                :hover="hover"
                link
            />
        </div>
        <LinkCard :path="link" @hover="onHover" />
    </component>
</template>

<script>
    import { stringTruncate } from '../../core'
    import { mapState } from 'vuex'
    import cardMixin from '../../mixins/cardMixin'
    import SIIcon from '../atoms/SIIcon.vue'
    import DateText from './DateText.vue'
    import LinkCard from './LinkCard.vue'
    import SIImage from './SIImage.vue'
    import SILink from './SILink.vue'
    import SIWys from './SIWys.vue'

    export default {
        name: 'CardNews',
        components: { SILink, LinkCard, DateText, SIWys, SIImage, SIIcon },
        mixins: [cardMixin],
        props: {
            title: {
                type: String,
                required: true,
            },
            tag: {
                type: String,
                required: false,
                default: 'li',
            },
            image: {
                type: Object,
                required: false,
                default: null,
            },
            date: {
                type: String,
                required: true,
            },
            location: {
                type: String,
                required: true,
            },
            excerpt: {
                type: String,
                required: true,
            },
            tags: {
                type: Array,
                required: false,
                default: () => [],
            },
            link: {
                type: String,
                required: true,
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
                wordings: state => state.options.options.wordings.g_new,
            }),
            imageIntern() {
                const { image, options } = this
                return image || options.default_image
            },
            tagIntern() {
                const { tags } = this
                if (!tags || !tags.length) return null
                return tags[0]
            },
            contentIntern() {
                const { excerpt, truncated } = this
                if (!truncated) return excerpt
                const text = stringTruncate({
                    string: excerpt,
                    max: truncated,
                })
                return text.string
            },
        },
    }
</script>

<style scoped lang="scss">
    .card-news {
        display: flex;
        flex-direction: column;
        background-color: var(--white-100);
        box-sizing: border-box;
        max-width: 20.8rem;
        width: 100%;
        .b-white-100 & {
            background: var(--gradient-blue-200);
        }
        .si-image {
            position: relative;
            width: 100%;
            flex-shrink: 0;
            .tag {
                position: absolute;
                left: 1.2rem;
                top: 1.2rem;
            }
        }
        .content {
            display: flex;
            flex-direction: column;
            padding: 2rem;
            height: 100%;
            color: var(--midnight-blue-700);
            box-sizing: border-box;
            .si-wys {
                margin-bottom: 1.35rem;
            }
            .title {
                margin-bottom: 1.2rem;
            }
            .location {
                color: var(--midnight-blue-500);
                font-weight: 600;
                font-size: 0.7rem;
                margin-bottom: 0.8rem;
            }
            .date-text {
                margin-top: auto;
                margin-bottom: 1.35rem;
            }
            .more {
                justify-content: space-between;
            }
        }
    }
</style>
