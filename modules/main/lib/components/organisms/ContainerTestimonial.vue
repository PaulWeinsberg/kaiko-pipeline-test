<template>
    <SISection
        :text-color="content.background.text_color"
        :background="content.background"
        class="container-testimonial"
    >
        <SIWrapper name="testimonial">
            <div class="author">
                <div class="inside">
                    <p class="name">{{ content.name }}</p>
                    <p v-if="content.signature" class="signature">
                        {{ content.signature }}
                    </p>
                    <p v-if="content.date" class="date">{{ content.date }}</p>
                    <SIImage
                        class="quote"
                        background
                        :image="wordings.quote"
                        background-size="contain"
                    />
                </div>
                <SIImage class="picture" :image="content.image" />
            </div>
            <SIWys :content="content.testimonial" />
        </SIWrapper>
    </SISection>
</template>

<script>
    import { mapState } from 'vuex'
    import SIWrapper from '../atoms/SIWrapper.vue'
    import SIImage from '../molecules/SIImage.vue'
    import SIWys from '../molecules/SIWys.vue'

    export default {
        name: 'ContainerTestimonial',
        components: { SIWys, SIImage, SIWrapper },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            ...mapState({
                wordings: state => state.options.options.wordings.g_testimonial,
            }),
        },
    }
</script>

<style scoped lang="scss">
    .container-testimonial {
        $testimonialImageTransform: 60%;
        --testimonialImageWidth: 9rem;
        $testimonialMarginRight: calc(
            var(--testimonialImageWidth) *
                (to-number($testimonialImageTransform) / 100)
        );
        @media screen and (max-width: $littleTabletBreakPoint) {
            --testimonialImageWidth: 7.5rem;
        }
        @media screen and (max-width: 350px) {
            --testimonialImageWidth: 5.5rem;
        }
        .si-wrapper {
            @media screen and (max-width: 850px) {
                flex-direction: column;
                align-items: flex-start !important;
            }
            .author {
                display: flex;
                flex-direction: column;
                max-width: 16rem;
                background-color: var(--white-100);
                width: calc(100% - $testimonialMarginRight);
                position: relative;
                box-shadow: 4px 8px 40px rgba(0, 0, 0, 0.16);
                margin-right: $testimonialMarginRight;
                .inside {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    padding: 3.6rem 2rem;
                    box-sizing: border-box;
                    overflow: hidden;
                    min-height: 12.2rem;
                    @media screen and (max-width: $littleTabletBreakPoint) {
                        padding: 2.3rem 1.2rem;
                    }
                    .name,
                    .signature,
                    .date {
                        width: 40%;
                        line-height: 140%;
                        z-index: 5;
                        @media screen and (max-width: $littleMobileBreakPoint) {
                            width: 75%;
                        }
                    }
                    .name {
                        font-weight: 700;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.16em;
                        color: var(--midnight-blue-700);
                    }
                    .signature {
                        font-weight: 500;
                        font-size: 1rem;
                        margin: 1.2rem 0;
                        color: var(--midnight-blue-500);
                    }
                    .date {
                        font-weight: 400;
                        font-size: 0.7rem;
                        color: var(--midnight-blue-400);
                    }
                    .quote {
                        position: absolute;
                        inset: 0;
                        transform: translate(-1rem, 2.85rem);
                        z-index: 0;
                        background-size: contain;
                    }
                }
                .picture {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translate($testimonialImageTransform, -50%);
                    width: var(--testimonialImageWidth);
                    aspect-ratio: 183 / 220;
                }
            }
            .si-wys {
                margin-left: 2rem;
                @media screen and (max-width: 850px) {
                    margin: 2rem 0 0;
                }
            }
        }
    }
</style>
