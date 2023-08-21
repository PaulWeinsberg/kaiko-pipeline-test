<template>
    <TplEdito :content="page.content" :seo="page.seo" :infos="page.infos" />
</template>

<script>
    import seoMixin from '~/mixins/seoMixin'
    // import { displayError } from '~/utils/devErrorHandle'
    export default {
        name: 'BaseRoute',
        mixins: [seoMixin],
        async asyncData({ $api, route, error, $queryString }) {
            const params = { ...route.params, ...route.query }
            if (params && params.preview) {
                delete params.preview_nonce
                delete params.thumbnail_id
            }

            const baseQuery = $queryString.stringify(params, {
                arrayFormat: 'index',
                skipNull: true,
            })

            let data = {}
            const endpoints = { page: `/page?${baseQuery}` }

            await $api.get(endpoints, {
                onSuccess: response => {
                    data = { ...data, ...response }
                },
                onError: err => {
                    return error({
                        statusCode: err.status,
                        message: err.statusText,
                    })
                },
            })

            return {
                page: data.page ?? {},
                template: data?.page?.infos?.template,
            }
        },
    }
</script>

<style lang="scss">
    .si-loader.page-loader {
        z-index: 0;
        height: 70vh;
    }
</style>
