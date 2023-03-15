<template>
    <TplEdito :content="page.content" :seo="page.seo" :infos="page.infos" />
</template>

<script>
    export default {
        name: 'BaseRoute',
        data: () => ({
            page: {},
            template: null,
        }),
        async fetch() {
            try {
                const { $route, $api } = this

                const params = {
                    ...$route.params,
                    ...$route.query,
                }

                if (params && params.preview) {
                    delete params.preview_nonce
                    delete params.thumbnail_id
                }

                const { data } = await $api.get('page', {
                    params,
                })
                this.page = data

                this.template = data.infos.template
            } catch (err) {
                const { $displayError } = this
                $displayError({ err })
                throw new Error(err.message)
            }
        },
    }
</script>

<style lang="scss">
    .test {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
    }
</style>
