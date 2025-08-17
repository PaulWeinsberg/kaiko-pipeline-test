<template>
    <component :is="tag" class="card-redirection">
        <SIImage :image="imageIntern" />
        <div class="container">
            <SITitle
                v-if="title"
                v-si-color="'midnight-blue-700'"
                h6
                :title="title"
            />
            <SIWys v-if="content" class="content" :content="content" />
            <SILink
                v-si-color="'sunflower-700'"
                link
                class="more"
                :hover="hover"
                :title="options.wordings.redirections.find_out_message"
                icon="c-arrow-right"
                icon-position="right"
                :path="link"
            />
        </div>
        <LinkCard :path="link" @hover="onHover" />
    </component>
</template>

<script>
    import { mapState } from 'vuex'
    import cardMixin from '../../mixins/cardMixin'
    import SITitle from '../atoms/SITitle.vue'
    import LinkCard from './LinkCard.vue'
    import SIImage from './SIImage.vue'
    import SILink from './SILink.vue'
    import SIWys from './SIWys.vue'

    export default {
        name: 'CardRedirection',
        components: { SIWys, LinkCard, SITitle, SILink, SIImage },
        mixins: [cardMixin],
        props: {
            tag: {
                type: String,
                required: false,
                default: 'div',
            },
            content: {
                type: String,
                required: false,
                default: null,
            },
            title: {
                type: String,
                required: false,
                default: null,
            },
            link: {
                type: String,
                required: true,
            },
            image: {
                type: [Object, String],
                required: false,
                default: null,
            },
        },
        computed: {
            ...mapState({
                options: state => state.options.options,
            }),
            imageIntern() {
                const { image, options } = this
                return image || options.default_image
            },
        },
    }
</script>

<style scoped lang="scss">
    .card-redirection {
        display: flex;
        flex-direction: column;
        position: relative;
        background: var(--white-100);
        max-width: 20.8rem;
        height: auto;
        .container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 2rem;
            flex: 1;
            h6 {
                margin-bottom: 1.2rem;
            }
            .content {
                margin-bottom: 1.4rem;
                color: var(--midnight-blue-500);
            }
            .more {
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin-top: auto;
            }
            .b-white-100 & {
                border: 1px solid var(--black-300);
                border-top: 0;
            }
        }
        .si-image {
            width: 100%;
            position: relative;
            overflow: visible;
        }
    }
</style>
