<template>
    <SISection
        :class="classNames"
        :text-color="content.background.text_color"
        :background="content.background"
    >
        <SIWrapper>
            <SIWys :content="content.content" />
            <div class="container-image">
                <SIImage :image="content.image.url" />
            </div>
        </SIWrapper>
    </SISection>
</template>

<script>
    import SISection from '../atoms/SISection.vue'
    import SIWrapper from '../atoms/SIWrapper.vue'
    import SIImage from '../molecules/SIImage.vue'
    import SIWys from '../molecules/SIWys.vue'

    export default {
        name: 'ContainerTextImageNotFull',
        components: { SIWrapper, SISection, SIWys, SIImage },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            classNames() {
                const { placement_text } = this.content
                return [
                    'container-text-image-not-full',
                    { reverse: placement_text === 'left' },
                ]
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-text-image-not-full {
        .si-wrapper {
            gap: 1.5rem;
            @media screen and (max-width: $littleTabletBreakPoint) {
                flex-direction: column;
            }
            > * {
                display: flex;
                flex: 1;
            }
            .container-image {
                align-items: center;
                justify-content: center;
                .si-image {
                    width: auto;
                }
            }
        }
        &:not(.reverse) {
            .si-wrapper {
                flex-direction: row-reverse;
                @media screen and (max-width: $littleTabletBreakPoint) {
                    flex-direction: column-reverse;
                }
            }
        }
    }
</style>
