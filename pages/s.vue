<template>
    <TplError v-if="$fetchState.error" />
    <TplSearchResults v-else :items="page.list" :loading="loading" />
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'RouteSearch',
        data: () => ({
            page: {},
            loading: false,
        }),
        async fetch() {
            this.loading = true
            try {
                const { $route, $api } = this

                const params = {
                    ...$route.params,
                    ...$route.query,
                    order: 'DESC',
                    orderby: 'post_date',
                }

                const { data } = await $api.get('search', {
                    params,
                })

                this.page = data
            } catch (err) {
                if (err.message === 'Canceled') return
                const { $displayError } = this
                $displayError({ err })
                throw new Error(err.message)
            }
            this.loading = false
        },
        head() {
            const { wordings, globalSeo } = this
            return {
                title: `${wordings.g_search.seo.title} - ${globalSeo.title}`,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: wordings.g_search.seo.description,
                    },
                    {
                        hid: 'robots',
                        name: 'robots',
                        content: 'noindex',
                    },
                ],
            }
        },
        computed: {
            ...mapState({
                globalSeo: state => state.seo.seo,
                wordings: state => state.options.options.wordings,
            }),
        },
    }
</script>
