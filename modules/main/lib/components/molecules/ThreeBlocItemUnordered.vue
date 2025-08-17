<template>
    <li :class="classNames">
        <SITitle h4 :title="title" />
        <SIImage v-if="image !== false" :image="image" />
        <SIWys :content="text" />
        <SIWys v-if="textBelow" class="bellow" :content="textBelow" />
        <div class="three-bloc-item-unordered-footer">
            <SILink
                v-if="link && !disabled"
                :path="link.url"
                :title="link.title"
                :icon="link.icon || 'c-arrow-right'"
                icon-position="right"
                link
                :hover="hover"
            />
            <span v-if="disabled">{{ messageDisabled }}</span>
        </div>

        <LinkCard v-if="link && !disabled" :path="link.url" @hover="onHover" />
    </li>
</template>

<script>
    import { mapState } from 'vuex'
    import SITitle from '../atoms/SITitle.vue'
    import cardMixin from '../../mixins/cardMixin'
    import SIImage from './SIImage.vue'
    import SILink from './SILink.vue'
    import SIWys from './SIWys.vue'
    import LinkCard from './LinkCard.vue'

    export default {
        name: 'ThreeBlocItemUnordered',
        components: { LinkCard, SILink, SIImage, SIWys, SITitle },
        mixins: [cardMixin],
        props: {
            title: {
                type: String,
                required: true,
            },
            image: {
                type: [Object, Boolean],
                required: false,
                default: false,
            },
            text: {
                type: String,
                required: true,
            },
            textBelow: {
                type: String,
                required: false,
                default: null,
            },
            link: {
                type: Object,
                required: false,
                default: null,
            },
            disabled: {
                type: Boolean,
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
                messageDisabled: state =>
                    state.options.options.wordings.three_items.disabled_message,
            }),
            classNames() {
                const { disabled, isLittle } = this
                return [
                    'three-bloc-item-unordered',
                    { disabled },
                    { 'is-little': isLittle },
                ]
            },
        },
    }
</script>

<style scoped lang="scss">
    .three-bloc-item-unordered {
        position: relative;
        .si-title {
            @include parent-has-class('.disabled') {
                color: var(--black-700);
            }
            @include parent-has-class('.is-little') {
                line-height: 1.1rem;
            }
        }
        .si-image {
            height: 7.15rem;
            margin: 2.4rem auto 0;
            @include parent-has-class('.is-little') {
                height: 5rem;
                margin-top: 0.8rem;
            }
            :deep(img) {
                object-fit: contain;
                @include parent-has-class('.disabled') {
                    filter: grayscale(1);
                }
            }
        }
        .si-wys {
            margin-top: 2.4rem;
            @include parent-has-class('.is-little') {
                margin-top: 1.8rem;
            }
            p {
                @include parent-has-class('.disabled') {
                    line-height: 0.85rem;
                }
            }
            & + .bellow {
                margin-top: 0.25rem;
            }
            :deep(li) {
                font-size: 0.8rem;
                line-height: 160%;
                margin-bottom: 0.8rem;
                list-style: none;
                padding-left: 1.3rem;
                position: relative;
                &:before {
                    content: '\eb0a';
                    font-size: 0.9rem;
                    font-family: var(--iconsFont);
                    line-height: 1em;
                    color: var(--white-100);
                    position: absolute;
                    left: 0;
                    top: 0;
                    transform: translate(0, 0.2rem);
                }
            }
        }
        .three-bloc-item-unordered-footer {
            display: flex;
            margin-top: auto;
            .si-link,
            span {
                font-weight: 700;
                font-size: 0.8rem;
                margin-top: 2.6rem;
                color: var(--sunflower-700);
                justify-content: space-between;
                @include parent-has-class('.is-little') {
                    margin-top: 1.8rem;
                }
            }
        }
    }
</style>
