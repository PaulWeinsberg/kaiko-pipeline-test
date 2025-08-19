<template>
    <div class="hero-report-video">
        <component
            :is="card"
            v-if="primary"
            class="primary"
            v-bind="attr(primary)"
        />
        <ul class="container">
            <component
                :is="card"
                v-for="item in others"
                :key="item.id"
                v-bind="attr(item)"
                tag="li"
            />
        </ul>
    </div>
</template>

<script>
    import CardReportVideo from '../molecules/CardReportVideo.vue'
    import CardNews from '../molecules/CardNews.vue'

    export default {
        name: 'HeroReportVideo',
        props: {
            design: {
                type: String,
                required: true,
            },
            primary: {
                type: Object,
                required: true,
            },
            others: {
                type: Array,
                required: true,
            },
        },
        computed: {
            card() {
                const { design } = this
                return design === 'new' ? CardNews : CardReportVideo
            },
        },
        methods: {
            attr(item) {
                const { design, options } = this
                const attrs = {
                    title: item.item.title,
                    image: item.item.image || options.default_image,
                    taxonomies: item.item.taxonomies,
                }

                if (design === 'new') {
                    return {
                        ...attrs,
                        excerpt: item.item.fields.excerpt,
                        location: item.item.fields.location,
                        tags: item.item.taxonomies.tag,
                        date: item.item.fields.publication_date,
                        link: item.item.url,
                    }
                } else {
                    return {
                        ...attrs,
                        design,
                        date: item.item.fields.publication_date,
                        content: item.item.fields.excerpt || null,
                        path: item.item.url,
                        file: item.item.fields.document,
                    }
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .hero-report-video {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1.2rem;
        width: 100%;
        @media screen and (max-width: 1180px) {
            grid-template-columns: 1fr;
        }
        > .container {
            display: flex;
            flex-direction: column;
            :deep {
                .card-report-video,
                .card-news {
                    &:last-child {
                        margin-top: 1.2rem;
                    }
                }
                @media screen and (min-width: 1181px) {
                    .card-news {
                        flex-direction: row;
                        .si-image {
                            width: 40%;
                            height: auto;
                        }
                    }
                }
            }
        }
        :deep {
            .card-report-video,
            .card-news {
                .title + .si-wys p {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                &.primary {
                    .container,
                    .content {
                        height: fit-content;
                    }
                    @media screen and (min-width: 1181px) {
                        height: auto;
                        .si-image {
                            flex: auto;
                        }
                    }
                }
            }
            .card-news {
                max-width: 100%;
                height: fit-content;
            }
        }
    }
</style>
