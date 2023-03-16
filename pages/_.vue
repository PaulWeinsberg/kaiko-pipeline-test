<template>
    <TplEdito :content="page.content" :seo="page.seo" :infos="page.infos" />
</template>

<script>
    import { mapState } from 'vuex'
    import { displayError } from '~/utils/devErrorHandle'
    export default {
        name: 'BaseRoute',
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
                displayError({ err })
                return error({
                    statusCode: 404,
                })
            }
        },
        head() {
            if (!this.page) return {}
            const { seo } = this.page
            if (!seo) return {}
            const { title, description, facebook, twitter } = seo
            const basic = [
                {
                    hid: 'description',
                    name: 'description',
                    content: description,
                },
            ]

            const _facebook = facebook
                ? [
                      {
                          hid: 'og:url',
                          property: 'og:url',
                          content: `${this.$config.baseUrl}${this.$nuxt.$route.path}`,
                      },
                      {
                          hid: 'og:title',
                          property: 'og:title',
                          content: facebook.title,
                      },
                      {
                          hid: 'og:description',
                          property: 'og:description',
                          content: facebook.description,
                      },
                      {
                          hid: 'og:image',
                          property: 'og:image',
                          content: facebook.image,
                      },
                  ]
                : []
            const _twitter = twitter
                ? [
                      {
                          hid: 'twitter:title',
                          property: 'twitter:title',
                          content: twitter.title,
                      },
                      {
                          hid: 'twitter:description',
                          property: 'twitter:description',
                          content: twitter.description,
                      },
                      {
                          hid: 'twitter:image',
                          property: 'twitter:image',
                          content: twitter.image,
                      },
                  ]
                : []

            return {
                title,
                meta: [...basic, ..._facebook, ..._twitter],
            }
        },
        computed: {
            ...mapState({
                state: state => state,
            }),
        },
    }
</script>

<style lang="scss">
    .si-loader.page-loader {
        z-index: 0;
        height: 70vh;
    }
</style>
