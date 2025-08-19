import { mapState } from 'vuex'

export default {
    head() {
        const { page, globalSeo, $route } = this

        if (!page || !page.seo) return {}

        const { seo } = page
        const description = seo.description

        let title = seo.title

        const hasGlobalSeo = title.includes(globalSeo.title)

        if ($route.query.page && $route.query.page !== 1) {
            title = title.replace(
                ` - ${globalSeo.title}`,
                ` - Page ${$route.query.page} - ${globalSeo.title}`
            )
        }

        if (title && !hasGlobalSeo) {
            title += ` - ${globalSeo.title}`
        }

        const _description = this.getDescriptionSEO({
            description,
        })
        const facebook = this.getFacebookSEO({
            facebook: seo.facebook,
            title,
            description,
        })
        const twitter = this.getTwitterSEO({
            twitter: seo.twitter,
            title,
            description,
        })

        const specificMeta = [...(this.meta || []), ...(seo.metas || [])]

        let schemas = {}
        if (seo.schema) {
            schemas = {
                type: 'application/ld+json',
                json: seo.schema,
            }
        }

        return {
            title,
            meta: [_description, ...specificMeta, ...facebook, ...twitter],
            script: [schemas],
        }
    },
    computed: {
        ...mapState({
            globalSeo: state => state.seo.seo,
        }),
    },
    methods: {
        /**
         * Permet de récupérer la méta description
         * @param {String} description La description
         * @return Object La meta
         */
        getDescriptionSEO({ description }) {
            if (!description) return {}
            return {
                hid: 'description',
                name: 'description',
                content: description,
            }
        },
        /**
         * Permet de récupérer les metas Open Graph
         * @param {Object} facebook Les éléments pour Facebook
         * @param {String} title Le titre
         * @param {String} description La description
         * @return Array Les metas OG Facebook
         */
        getFacebookSEO({ facebook, title, description }) {
            if (!facebook) return []

            const _facebook = [
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${this.$config.baseUrl}${this.$nuxt.$route.path}`,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: facebook.title || title || '',
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: facebook.description || description || '',
                },
            ]

            if (facebook.image) {
                _facebook.push({
                    hid: 'og:image',
                    property: 'og:image',
                    content: facebook.image,
                })
            }

            return _facebook
        },
        /**
         * Permet de récupérer les metas de partage Twitter
         * @param {Object} twitter Les éléments pour Twitter
         * @param {String} title Le titre
         * @param {String} description La description
         * @return Array Les metas de partage Twitter
         */
        getTwitterSEO({ twitter, title, description }) {
            if (!twitter) return []

            const _twitter = [
                {
                    hid: 'twitter:title',
                    property: 'twitter:title',
                    content: twitter.title || title || '',
                },
                {
                    hid: 'twitter:description',
                    property: 'twitter:description',
                    content: twitter.description || description || '',
                },
            ]

            if (twitter.image) {
                _twitter.push({
                    hid: 'twitter:image',
                    property: 'twitter:image',
                    content: twitter.image,
                })
            }

            return _twitter
        },
    },
}
