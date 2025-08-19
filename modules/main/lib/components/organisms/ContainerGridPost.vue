<template>
    <SectionEdito :content="content" :class="classNames">
        <template v-if="grid.show_all" #afterTitle>
            <component
                :is="filterTag[postType]"
                :filters="filters_"
                :post-type="postType"
                @filters:change="filterPosts"
            />
        </template>
        <GridPost
            :loading="loading"
            :total="total"
            :full="content.grid.show_all"
        >
            <TypePost
                v-for="item in items"
                :key="item.id"
                :type="postType"
                :item="item"
            />
        </GridPost>
        <SIPagination
            v-if="grid.show_all"
            ref="pagination"
            :count="totalIntern || total"
            :limit="limit"
            scroll-to-parent=".container-grid-post"
            :text-prev="wordings.g_grid.pagination.prev"
            :text-next="wordings.g_grid.pagination.next"
            @click="onClickPagination"
        />
        <SILink
            v-if="!grid.show_all && grid.button.add_cta && grid.button.link"
            btn
            icon-position="right"
            :title="grid.button.text"
            :icon="grid.button.icon"
            :type="grid.button.type"
            :path="grid.button.link"
            :design="grid.button.design"
        />
    </SectionEdito>
</template>

<script>
    import { mapState } from 'vuex'
    import GridPost from '../molecules/GridPost.vue'
    import PanelSort from '../molecules/PanelSort'
    import SILink from '../molecules/SILink.vue'
    import TypePost from '../molecules/TypePost.vue'
    import SectionEdito from './SectionEdito.vue'

    export default {
        name: 'ContainerGridPost',
        components: {
            SILink,
            TypePost,
            GridPost,
            SectionEdito,
            PanelSort,
        },
        props: {
            content: {
                type: Object,
                required: true,
            },
            author: {
                type: Boolean,
                required: false,
                default: null,
            },
        },
        data: () => ({
            loading: false,
            totalIntern: null,
            offset: 0,
            items_: null,
            filtersIntern: {},
            filterTag: {
                report: 'PanelSort',
                video: 'PanelSort',
                insight: 'PanelFilterTypePost',
                new: 'PanelFilterTypePost',
            },
        }),
        computed: {
            ...mapState({
                wordings: state => state.options.options.wordings,
            }),
            classNames() {
                const { isInsight } = this
                return [
                    'container-grid-post',
                    `grid-${isInsight ? 'four' : 'three'}-columns`,
                ]
            },
            postType() {
                const { content } = this
                return content.grid.post_type
            },
            isInsight() {
                const { postType } = this
                return postType === 'insight'
            },
            limit() {
                const { content } = this
                return content.grid.items_per_page
            },
            grid() {
                const { content } = this
                return content.grid
            },
            items: {
                get() {
                    const { items_, grid } = this
                    if (grid.show_all) {
                        return items_ || grid.data.list
                    } else {
                        return grid[grid.post_type]
                    }
                },
                set(items) {
                    this.items_ = items
                },
            },
            total: {
                get() {
                    const { totalIntern, content } = this
                    if (totalIntern !== null) return totalIntern
                    return content.grid.data.count.total
                },
                set(nV) {
                    this.totalIntern = nV
                },
            },
            filters_() {
                const { content } = this
                const filters = content.grid.data.filters
                if (!filters) return null
                return filters
            },
            apiParams() {
                const { offset, limit, filtersIntern, grid, author } = this
                const { order, s, insight_tag, new_tag } = filtersIntern

                const params = {
                    limit,
                    offset,
                    order: order || 'DESC',
                    s: s || '',
                    relevanssi: true,
                }

                if (author) {
                    return {
                        ...params,
                        ...grid.data.params,
                        order: order || 'DESC',
                    }
                }

                if (insight_tag && insight_tag.length) {
                    params.tax_query = {
                        operator: 'OR',
                        0: {
                            taxonomy: 'insight_tag',
                            field: 'slug',
                            terms: insight_tag.map(el => el.name),
                        },
                    }
                }

                if (new_tag && new_tag.length) {
                    params.tax_query = {
                        operator: 'OR',
                        0: {
                            taxonomy: 'new_tag',
                            field: 'slug',
                            terms: new_tag.map(el => el.name),
                        },
                    }
                }

                return params
            },
        },
        watch: {
            filtersIntern() {
                this.offset = 0
                this.$refs.pagination.reset()
                this.getPosts()
            },
        },
        methods: {
            filterPosts(filters) {
                this.filtersIntern = filters
            },
            /**
             * Permet de définir la page actuelle
             * @param {number} offset L'offset actuel
             */
            onClickPagination({ offset }) {
                this.offset = offset
                this.getPosts()
            },
            /**
             * Permet de faire notre appel pour récupérer la liste des posts
             */
            async getPosts() {
                this.dirty = true
                this.loading = true
                const { $api, postType, apiParams } = this

                const params = {
                    orderby: 'meta_value',
                    meta_key: 'publication_date',
                    ...apiParams,
                }

                const qs = require('qs')

                const queryString = qs.stringify(params, {
                    arrayFormat: 'index',
                    encode: false,
                    skipNulls: true,
                })

                let data = {}
                const endpoints = { search: `/${postType}?${queryString}` }

                await $api.get(endpoints, {
                    onSuccess: response => {
                        data = { ...data, ...response }
                    },
                    onError: err => {
                        const { $displayError } = this
                        $displayError(err)
                        this.loading = err.message === 'Canceled'
                    },
                })

                this.items = data.search.list
                this.total = data.search.count.total
                this.loading = false
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-grid-post {
        :deep(.si-wrapper) {
            align-items: center !important;
            > a {
                margin-top: 3.2rem;
                @media screen and (max-width: $mobileBreakPoint) {
                    margin-top: 1rem;
                }
            }
        }
    }
</style>
