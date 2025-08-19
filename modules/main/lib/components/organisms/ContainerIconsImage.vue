<template>
    <SISection :class="classNames" :background="content.background">
        <SIImage
            :background="content.crop_image"
            :image="content.image.url"
            :background-size="backgroundSize"
        />
        <SIWrapper>
            <ul class="list-icons">
                <InfosIconItem
                    v-for="(item, i) in content.pictograms"
                    :key="i"
                    :icon="item.icon"
                    :color="item.color_pictogram"
                    :text="item.text"
                    placement="below"
                />
            </ul>
        </SIWrapper>
    </SISection>
</template>

<script>
    import SISection from '../atoms/SISection.vue'

    export default {
        name: 'ContainerIconsImage',
        components: { SISection },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            classNames() {
                const { placement, crop_image } = this.content
                return [
                    'container-icons-image',
                    { reverse: placement === 'left' },
                    { crop: crop_image },
                ]
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
    .container-icons-image {
        @media screen and (min-width: $littleTabletBreakPointMin) {
            flex-direction: row;
            &.reverse {
                flex-direction: row-reverse;
            }
        }
        @media screen and (max-width: $littleTabletBreakPoint) {
            flex-direction: column-reverse;
        }
        .si-image {
            width: 50%;
            @media screen and (max-width: 1120px) {
                width: 45%;
            }
            @media screen and (max-width: $littleTabletBreakPoint) {
                width: 100%;
                &.background {
                    min-height: 14rem;
                }
            }
        }
        .si-wrapper {
            width: 50%;
            @media screen and (max-width: 1120px) {
                width: 55%;
                padding: 3rem 2rem;
            }
            @media screen and (max-width: $littleTabletBreakPoint) {
                width: 100%;
            }
            .list-icons {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap: 2rem 3.7rem;
                width: 100%;
                @media screen and (max-width: 1120px) {
                    grid-gap: 2rem;
                }
                @media screen and (max-width: 410px) {
                    grid-template-columns: 1fr;
                    grid-gap: 3rem;
                }
                :deep(li) {
                    flex-direction: column;
                    .si-wys {
                        margin-top: 2.3rem;
                        margin-left: 0;
                        ul {
                            width: auto;
                        }
                    }
                }
            }
        }
    }
</style>
