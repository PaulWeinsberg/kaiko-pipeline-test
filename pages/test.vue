<template>
    <main>
        <p>Hello World!</p>
    </main>
</template>

<script>
    export default {
        layout: 'maintenance',
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
            const errs = {}
            const endpoints = { page: `/page?${baseQuery}` }

            await $api.get(endpoints, {
                onSuccess: response => {
                    data = { ...data, ...response }
                    console.log(data)
                },
                onError: err => {
                    console.log(err)
                    errs[err.slug] = err
                },
            })

            return {
                data,
                errs,
                page: data.page ?? {},
                template: data?.page?.infos?.template,
            }
        },
        mounted() {
            console.log('test')
            console.log(this.data)
            console.log(this.errs)
        },
    }
</script>
