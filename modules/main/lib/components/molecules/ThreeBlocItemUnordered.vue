<template>
    <li :class="classNames">
        <div v-if="cornerIcon" class="corner-icon">
            <div
                class="wrapper"
                :class="{ 'background': !!cornerIcon.backgroundColor }"
                :style="{ 'background-color': cornerIcon.backgroundColor }">
                <SIIcon
                    class="media"
                    v-if="cornerIcon.type === 'icon'"
                    :name="cornerIcon.icon"
                    :style="{ 'color': cornerIcon.color }"
                />
                <SIImage
                    v-if="cornerIcon.type === 'image'"
                    class="media"
                    :image="cornerIcon.image"
                />
            </div>
        </div>
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
    import SIIcon from '../atoms/SIIcon.vue'

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
            cornerIcon: {
                type: Object,
                required: false,
                default: null,
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
        .corner-icon {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 1;
            .wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                height: 32px;
                width: 32px;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
                .media {
                    width: 26px;
                    height: 26px;
                    font-size: 26px;
                }
            }
        }
        > .si-title {
            @include parent-has-class('.disabled') {
                color: var(--black-700);
            }
            @include parent-has-class('.is-little') {
                line-height: 1.1rem;
            }
        }
        > .si-image {
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
        > .si-wys {
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