<template>
    <SectionEdito :content="content" :class="classNames">
        <SILink
            v-if="content.add_cta"
            :path="content.group_link.link"
            :title="content.group_link.text"
            :icon="content.group_link.icon"
            icon-position="right"
            :design="content.group_link.design"
            btn
        />
        <SISwiper>
            <TypePost
                v-for="(item, key) in content.list_item"
                :key="key"
                :type="itemPostType || item[itemTextName].post_type"
                :item="itemIntern(item)"
                class="swiper-slide"
            />
        </SISwiper>
    </SectionEdito>
</template>
<script>
    import SILink from '../molecules/SILink.vue'
    import TypePost from '../molecules/TypePost.vue'
    import SectionEdito from './SectionEdito.vue'
    import SISwiper from './SISwiper.vue'

    export default {
        name: 'ContainerEdito',
        components: { SISwiper, SILink, SectionEdito, TypePost },
        props: {
            content: {
                type: Object,
                required: true,
            },
            itemTextName: {
                type: String,
                required: false,
                default: 'choice_item',
            },
            itemPostType: {
                type: String,
                required: false,
                default: null,
            },
        },
        computed: {
            classNames() {
                const { list_item } = this.content
                return [
                    'container-edito',
                    { 'list-three-items': list_item.length === 3 },
                ]
            },
        },
        methods: {
            itemIntern(item) {
                const { itemPostType, itemTextName } = this
                if (itemPostType === 'redirection') return item
                return item[itemTextName]
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-edito {
        :deep {
            .si-wrapper {
                overflow: hidden !important;
                @include parent-has-class(':not(.list-three-items)') {
                    @media screen and (min-width: $tabletBreakPointMin) {
                        display: grid;
                        grid-template-columns: 20.8rem 1fr;
                        grid-template-rows: 3.5fr 0.5fr;
                        grid-column-gap: 1.2rem;
                        grid-row-gap: 1.2rem;
                    }
                    .header {
                        .container {
                            @include parent-has-class(
                                ':not(.list-three-items)'
                            ) {
                                flex-direction: column;

                                .title {
                                    margin-bottom: 1.6rem;
                                }
                            }
                        }
                    }
                }
                .si-link.btn {
                    height: fit-content;
                    width: fit-content;
                    order: 3;
                    @media screen and (min-width: $tabletBreakPointMin) {
                        grid-area: 2 / 1 / 3 / 2;
                    }
                    @include parent-has-class('.list-three-items') {
                        margin: auto;
                        @media screen and (min-width: $tabletBreakPointMin) {
                            margin-top: 3.2rem;
                        }
                    }
                }
                .si-swiper {
                    display: flex;
                    align-items: flex-start;
                    grid-area: 1 / 2 / 3 / 3;
                    order: 2;
                    @media screen and (max-width: $tabletBreakPoint) {
                        flex-direction: column;
                        margin: 0 0 2rem 0;
                    }
                    .swiper {
                        overflow: visible;
                        ul {
                            @include parent-has-class(
                                ':not(.list-three-items)'
                            ) {
                                @media screen and (max-width: $tabletBreakPoint) {
                                    flex-direction: column;
                                }
                            }
                            li,
                            .card-redirection {
                                flex: 1;
                                max-width: 20.8rem;
                                width: 100%;
                                @media screen and (max-width: $tabletBreakPoint) {
                                    max-width: 100%;
                                }
                                &:not(:first-child) {
                                    margin-left: 1.2rem;
                                    @media screen and (max-width: $tabletBreakPoint) {
                                        @include parent-has-class(
                                            '.list-three-items'
                                        ) {
                                            margin: 0 0 0 0.8rem;
                                        }
                                    }
                                    @media screen and (max-width: $tabletBreakPoint) {
                                        margin-top: 2rem;
                                        margin-left: 0;
                                    }
                                }
                                @media screen and (max-width: $tabletBreakPoint) {
                                    @include parent-has-class(
                                        '.list-three-items'
                                    ) {
                                        width: 100%;
                                        max-width: 20.8rem;
                                        flex: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
