<template>
    <SectionEdito :content="content" class="container-grid-news">
        <template #afterTitle>
            <div class="swiper-controls">
                <SIArrow
                    icon="c-arrow-left"
                    color="midnight-blue-700"
                    :disable="isStart || isLock"
                    @click="onClick"
                />
                <SIArrow
                    next
                    color="midnight-blue-700"
                    :disable="isEnd || isLock"
                    @click="onClick"
                />
            </div>
        </template>
        <SISwiper
            ref="swiper"
            @swiper:lock="swiperLock"
            @swiper:state="swiperState"
        >
            <CardNews
                v-for="item in content.news"
                :key="item.id"
                :excerpt="item.fields.excerpt"
                :location="item.fields.location"
                :start-date="item.fields.publication_date"
                :end-date="item.fields.end_date"
                :tags="item.taxonomies.tag"
                :link="item.url"
                :image="item.image"
                :truncated="250"
                :title="item.title"
            />
        </SISwiper>
        <SILink
            v-if="content.add_cta"
            btn
            icon-position="right"
            :title="content.group_link.text"
            :icon="content.group_link.icon"
            :type="content.group_link.type"
            :path="content.group_link.link"
            :design="content.group_link.design"
        />
    </SectionEdito>
</template>

<script>
    import SIArrow from '../atoms/SIArrow.vue'
    import CardNews from '../molecules/CardNews.vue'
    import SILink from '../molecules/SILink.vue'
    import SectionEdito from './SectionEdito.vue'
    import SISwiper from './SISwiper.vue'

    export default {
        name: 'ContainerGridNews',
        components: {
            SILink,
            SectionEdito,
            SIArrow,
            CardNews,
            SISwiper,
        },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        data: () => ({
            isStart: false,
            isEnd: false,
            isLock: false,
        }),
        methods: {
            onClick(next) {
                return this.$refs.swiper.navigate(next)
            },
            swiperState(state) {
                this.isEnd = state.isEnd
                this.isStart = state.isStart
            },
            swiperLock(lock) {
                this.isLock = lock
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-grid-news {
        :deep {
            .header {
                flex-direction: row;
                .container {
                    flex-direction: column;
                    .title {
                        margin-bottom: 1.6rem;
                    }
                }
                .swiper-controls {
                    display: flex;
                    .si-arrow {
                        @include parent-has-class('.b-white-100') {
                            background-color: var(--black-200);
                        }
                        &:first-child {
                            margin-right: 0.8rem;
                            &:not(:hover, :focus) {
                                &:before {
                                    transform: translateX(101%);
                                }
                            }
                        }
                    }
                }
            }
        }
        li:not(:last-child) {
            margin-right: 1.2rem;
        }
        .si-link.btn {
            margin: 3.2rem auto 0;
            width: fit-content;
        }
    }
</style>
