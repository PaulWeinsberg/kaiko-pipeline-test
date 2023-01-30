<template>
    <p v-if="$fetchState.pending">Loading...</p>
    <p v-else-if="$fetchState.error">404</p>
    <div v-else class="test">
        <p>{{ page.content._title }}</p>
        <SILink btn path="/test" title="Bouton" background-color="black-900" />
    </div>
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
