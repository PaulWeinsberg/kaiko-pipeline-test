<template>
    <SectionEdito :content="content" :class="classNames">
        <SISwiper>
            <ThreeBlocItem
                :card="content.card"
                :mobile-carousel="content.mobile_carousel"
                :type-card="content.type_bloc"
            />
        </SISwiper>
        <SILink
            v-if="content.add_cta"
            btn
            :path="content.group_link.link"
            :title="content.group_link.text"
            :icon="content.group_link.icon"
            :design="content.group_link.design"
            icon-position="right"
        />
    </SectionEdito>
</template>

<script>
    import SILink from '../molecules/SILink.vue'
    import ThreeBlocItem from '../molecules/ThreeBlocItem.vue'
    import SectionEdito from './SectionEdito.vue'
    import SISwiper from './SISwiper.vue'

    export default {
        name: 'ContainerThreeBlocs',
        components: {
            SectionEdito,
            ThreeBlocItem,
            SISwiper,
            SILink,
        },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            classNames() {
                const { mobile_carousel } = this.content
                return ['container-three-blocs', { mobile_carousel }]
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-three-blocs {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        :deep(.si-wrapper) {
            @media screen and (min-width: $mobileBreakPointMin) and (max-width: $tabletBreakPoint) {
                padding: 4rem 1.6rem;
            }
            .si-swiper {
                flex-direction: column;
                .swiper {
                    overflow: visible;
                    .slides-wrapper {
                        display: flex;
                        justify-content: center;
                        @media screen and (max-width: $tabletBreakPoint) {
                            @include parent-has-class('.mobile_carousel') {
                                justify-content: flex-start;
                            }
                        }
                        @media screen and (max-width: $littleMobileBreakPoint) {
                            @include parent-has-class(
                                ':not(.mobile_carousel)'
                            ) {
                                flex-direction: column;
                            }
                        }
                        .swiper-slide {
                            height: auto;
                        }
                    }
                }
                &.is-lock {
                    .swiper {
                        .slides-wrapper {
                            gap: 1.2rem;
                            flex-wrap: wrap;
                        }
                    }
                }
            }
            .si-link.btn {
                margin: 3.2rem auto 0;
                width: fit-content;
                @media screen and (max-width: $tabletBreakPoint) {
                    margin-top: 2rem;
                }
            }
        }
    }
</style>
