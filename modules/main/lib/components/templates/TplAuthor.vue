<template>
    <SIMain>
        <Hero
            v-if="hero"
            :design="hero.design"
            :background="hero.background"
            :content="hero.content"
            :hubspot="hero.g_hubspot"
            :publication_date="content.publication_date"
            :items="items"
            :breadcrumbs="seo?.breadcrumbs"
            :authors="infos?.taxonomies?.author"
            :tags="infos?.taxonomies?.tag"
        />
        <ContainerGridPost :content="content" author />
    </SIMain>
</template>

<script>
    import SIMain from '../atoms/SIMain.vue'
    import ContainerGridPost from '../organisms/ContainerGridPost.vue'

    export default {
        name: 'TplAuthor',
        components: { ContainerGridPost, SIMain },
        props: {
            content: {
                type: Object,
                required: true,
            },
            seo: {
                type: Object,
                required: true,
            },
            infos: {
                type: Object,
                required: false,
                default: null,
            },
        },
        computed: {
            hero() {
                const { content } = this
                return content.hero
            },
            items() {
                const { hero } = this
                const { items_automatic } = hero
                const slug = `${hero.design}s`
                if (items_automatic.selected) return items_automatic[slug]
                return hero[slug]
            },
        },
    }
</script>
