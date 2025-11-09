<template>
    <SectionEdito :content="content" :class="classNames">
        <template v-if="grid.show_all" #afterTitle>
            <component
                :is="'PanelFilterTypeResource'"
                :filters="filters_"
                @filters:change="filterPosts"
            />
        </template>
        <ListPost
            :loading="loading"
            :total="total"
            :full="grid.show_all"
        >
            <ListResource
                v-for="item in items"
                :key="item.id"
                :title="item.title"
                :content="item.fields.excerpt || null"
                :path="item.url"
                :file="item.fields.document"
                :tag="'li'"
            />
        </ListPost>
        <SIPagination
            v-if="grid.show_all"
            ref="pagination"
            :count="totalIntern || total"
            :limit="limit"
            scroll-to-parent=".container-list-resource"
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
    import ListPost from '../molecules/ListPost.vue'
    import PanelSort from '../molecules/PanelSort.vue'
    import PanelFilterTypeResource from '../molecules/PanelFilterTypeResource.vue'
    import SILink from '../molecules/SILink.vue'
    import ListResource from '../molecules/ListResource.vue'
    import SectionEdito from './SectionEdito.vue'

    export default {
        name: 'ContainerListResource',
        components: {
            SILink,
            ListResource,
            ListPost,
            SectionEdito,
            PanelSort,
            PanelFilterTypeResource
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
            filterTag: 'PanelSort',
        }),
        computed: {
            ...mapState({
                wordings: state => state.options.options.wordings,
            }),
            classNames() {
                return [
                    'container-list-resource',
                    `grid-three-columns`,
                ]
            },
            limit() {
                const { content } = this
                return content.grid_resource.items_per_page
            },
            grid() {
                const { content } = this
                return content.grid_resource
            },
            selectedCategories() {
                const { content } = this
                return content.grid_resource.categories
            },
            items: {
                get() {
                    const { items_, grid } = this
                    if (grid.show_all) {
                        return items_ || grid.data.list
                    } else {
                        return grid.resources
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
                    return content.grid_resource.data.count.total
                },
                set(nV) {
                    this.totalIntern = nV
                },
            },
            filters_() {
                const { content, selectedCategories } = this
                if (!content.grid_resource.data.filters) return null

                // By default we take only parents
                let filters = { resource_category: content.grid_resource.data.filters.resource_category.filter(r => r.parent === 0) };
                // If there is a selected parent category then we display only its children
                if (selectedCategories) {
                    filters = {
                        resource_category: content.grid_resource.data.filters.resource_category.filter(r => selectedCategories.some(id => id.toString() === r.parent?.toString()))
                    }
                }

                return filters;
            },
            apiParams() {
                const { offset, limit, filtersIntern, grid, author, selectedCategories } = this
                const { order, s, resource_category } = filtersIntern

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

                if (!resource_category?.length && selectedCategories?.length) {
                    params.tax_query = {
                        0: {
                            operator: 'IN',
                            taxonomy: 'resource_category',
                            field: 'slug',
                            terms: (selectedCategories ?? [])
                                    .map(id => grid.data.filters.resource_category.find(el => el.term_id.toString() === id.toString()))
                                    .map(el => el.name),
                        },
                    }
                } else if (resource_category?.length) {
                    params.tax_query = {
                        0: {
                            operator: 'IN',
                            taxonomy: 'resource_category',
                            field: 'slug',
                            terms: (resource_category ?? []).map(el => el.name),
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
                const { $api, apiParams } = this

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
                const endpoints = { search: `/resource?${queryString}` }

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
