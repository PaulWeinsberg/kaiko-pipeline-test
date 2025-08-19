<template>
    <SectionEdito :content="content" :class="classNames">
        <SISwiper>
            <ThreeBlocItem
                mobile-carousel
                type-card="unordered"
                :card="listProduct"
            />
        </SISwiper>
    </SectionEdito>
</template>

<script>
    import { mapState } from 'vuex'
    import ThreeBlocItem from '../molecules/ThreeBlocItem.vue'
    import SISwiper from './SISwiper.vue'

    export default {
        name: 'ContainerProduct',
        components: {
            ThreeBlocItem,
            SISwiper,
        },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            ...mapState({
                infoLink: state => state.options.options.wordings.g_product,
            }),
            classNames() {
                const { list_products } = this.content
                return [
                    'container-product',
                    { 'list-multiple-items': list_products.length > 2 },
                ]
            },
            listProduct() {
                const { list_products } = this.content
                const { text, icon } = this.infoLink

                return list_products.map(({ product }) => ({
                    title: product.title,
                    text: product.fields.text || null,
                    mobileCarousel: true,
                    link: { title: text, icon, url: product.url },
                    disabled: false,
                    image: product.fields.image || false,
                }))
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-product {
        overflow: hidden;
        :deep {
            .si-wrapper {
                overflow: hidden;
                @include parent-has-class(':not(.list-multiple-items)') {
                    @media screen and (min-width: 1200px) {
                        display: grid;
                        grid-column-gap: 1.2rem;
                    }
                    .header {
                        .container {
                            @include parent-has-class(
                                ':not(.list-multiple-items)'
                            ) {
                                flex-direction: column;

                                .title {
                                    margin-bottom: 1.6rem;
                                }
                            }
                        }
                    }
                }
                .si-swiper {
                    display: flex;
                    align-items: flex-start;
                    @media screen and (max-width: $tabletBreakPoint) {
                        flex-direction: column;
                        margin: 0 0 2rem 0;
                    }
                    .swiper {
                        overflow: visible;
                        .slides-wrapper {
                            overflow: inherit;
                            @media screen and (min-width: $tabletBreakPointMin) {
                                display: grid;
                                grid-template-columns: repeat(2, 1fr);
                                grid-gap: 1.2rem;
                                @include parent-has-class(
                                    '.list-multiple-items'
                                ) {
                                    grid-template-columns: repeat(3, 1fr);
                                }
                            }
                            li {
                                flex: 1;
                                width: 100%;
                                min-width: 20.8rem;
                                height: auto;
                                @media screen and (min-width: $tabletBreakPointMin) {
                                    margin-left: 0;
                                    min-width: 100%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
