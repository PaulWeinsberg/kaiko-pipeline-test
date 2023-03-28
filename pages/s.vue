<template>
    <TplSearchResults :items="page.list" />
</template>

<script>
    import { displayError } from '@/utils/devErrorHandle'

    export default {
        name: 'RouteSearch',
        async asyncData({ route, $api, error }) {
            try {
                const params = {
                    ...route.params,
                    ...route.query,
                }

                const { data } = await $api.get('search', {
                    params,
                })

                return {
                    page: data,
                }
            } catch (err) {
                displayError({ err })
                return error({
                    statusCode: 404,
                })
            }
        },
        mounted() {
            console.log(this.page)
        },
    }
</script>

<style scoped></style>
