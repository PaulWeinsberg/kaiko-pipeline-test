<template>
    <SISection
        :text-color="content.background.text_color"
        :class="classNames"
        :background="content.background"
    >
        <SIImage
            background
            :image="content.image.url"
            :background-size="backgroundSize"
        />
        <SIWrapper :style="style">
            <SIWys :content="content.text" />
        </SIWrapper>
    </SISection>
</template>
<script>
    import SISection from '../atoms/SISection.vue'
    import SIWrapper from '../atoms/SIWrapper.vue'
    import SIImage from '../molecules/SIImage.vue'
    import SIWys from '../molecules/SIWys.vue'
    import oneSidePaddingMixin from '../../mixins/oneSidePaddingMixin'

    export default {
        name: 'ContainerTextImage',
        components: { SISection, SIWrapper, SIImage, SIWys },
        mixins: [oneSidePaddingMixin],
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            classNames() {
                const { reverse, content } = this
                const { add_margin, crop_image } = content
                return [
                    'container-text-image',
                    { reverse },
                    { large: add_margin },
                    { crop: crop_image },
                ]
            },
            reverse() {
                const { placement_text } = this.content
                return placement_text === 'left'
            },
            style() {
                const { oneSidePadding, reverse } = this
                if (reverse) return { paddingLeft: `${oneSidePadding}px` }
                return { paddingRight: `${oneSidePadding}px` }
            },
            backgroundSize() {
                const { crop_image } = this.content
                if (crop_image) return 'cover'
                return 'contain'
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-text-image {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        box-sizing: border-box;
        @media screen and (max-width: $tabletBreakPoint) {
            flex-direction: column-reverse;
        }
        &.large {
            @media screen and (min-width: $tabletBreakPointMin) {
                padding: 6rem 0;
            }
        }
        .si-wrapper {
            @media screen and (max-width: $tabletBreakPoint) {
                padding-bottom: 2.5rem;
                width: 100%;
            }
        }
        .si-image,
        .si-wrapper {
            @media screen and (min-width: $tabletBreakPointMin) {
                width: 50%;
            }
        }
        .si-image {
            height: auto;
            @media screen and (max-width: $tabletBreakPoint) {
                height: 13.5rem;
            }
            @include parent-has-class('.crop') {
                @media screen and (max-width: $tabletBreakPoint) {
                    height: 12.1rem;
                }
            }
        }
        &.reverse {
            @media screen and (min-width: $tabletBreakPointMin) {
                flex-direction: row-reverse;
            }
            .si-wrapper {
                @media screen and (min-width: $tabletBreakPointMin) {
                    padding-right: 1.2rem;
                }
            }
        }
        &:not(.reverse) {
            .si-wrapper {
                @media screen and (min-width: $tabletBreakPointMin) {
                    padding-left: 1.2rem;
                }
            }
        }
        :deep {
            .btn {
                @media screen and (max-width: $tabletBreakPoint) {
                    margin: auto;
                }
            }
        }
    }
</style>
