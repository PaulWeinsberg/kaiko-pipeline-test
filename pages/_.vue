<template>
    <TplEdito :content="page.content" :seo="page.seo" :infos="page.infos" />
</template>

<script>
    import seoMixin from '~/mixins/seoMixin'
    import { displayError } from '~/utils/devErrorHandle'
    export default {
        name: 'BaseRoute',
        mixins: [seoMixin],
        async asyncData({ route, $api, error }) {
            try {
                const params = {
                    ...route.params,
                    ...route.query,
                }

                if (params && params.preview) {
                    delete params.preview_nonce
                    delete params.thumbnail_id
                }

                const { data } = await $api.get('page', {
                    params,
                })

                return {
                    page: data,
                    template: data.infos.template,
                }
            } catch (err) {
                if (err.message === 'Canceled') return
                displayError({ err })
                return error({
                    statusCode: 404,
                })
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
