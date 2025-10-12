<template>
    <SIMain>
        <Hero
            :design="hero.design"
            :background="hero.background"
            :content="hero.content"
            :hubspot="hero.g_hubspot"
            :image="hero.image || null"
            :publication_date="content.publication_date"
            :items="items"
            :breadcrumbs="seo?.breadcrumbs"
            :authors="infos?.taxonomies?.author"
            :tags="infos?.taxonomies?.tag"
        />
        <ContainerAnchor :content="content" />
        <component
            :is="component.acf_fc_layout"
            v-for="(component, i) in content.page_builder"
            :id="component.id"
            :key="i"
            :content="component"
        />
    </SIMain>
</template>

<script>
    import ContainerAnchor from '../organisms/ContainerAnchor.vue'
    import ContainerInfosIcons from '../organisms/ContainerInfosIcons.vue'
    import ContainerThreeBlocs from '../organisms/ContainerThreeBlocs.vue'
    import ContainerTextImage from '../organisms/ContainerTextImage.vue'
    import ContainerGridPost from '../organisms/ContainerGridPost.vue'
    import ContainerRedirections from '../organisms/ContainerRedirections.vue'
    import ContainerText from '../organisms/ContainerText.vue'
    import ContainerLogos from '../organisms/ContainerLogos.vue'
    import Hero from '../organisms/Hero.vue'
    import ContainerDocumentDownload from '../organisms/ContainerDocumentDownload.vue'
    import ContainerProduct from '../organisms/ContainerProduct.vue'
    import ContainerGridNews from '../organisms/ContainerGridNews.vue'
    import ContainerTextImageNotFull from '../organisms/ContainerTextImageNotFull.vue'
    import ContainerFourBlocs from '../organisms/ContainerFourBlocs.vue'
    import ContainerMultipleBlocs from '../organisms/ContainerMultipleBlocs.vue'
    import ContainerMultiTextBlocks from '../organisms/ContainerMultiTextBlocks.vue'

    export default {
        name: 'TplEdito',
        components: {
            ContainerAnchor,
            ContainerGridPost,
            Hero,
            ContainerTextImage,
            ContainerThreeBlocs,
            ContainerInfosIcons,
            ContainerRedirections,
            ContainerText,
            ContainerLogos,
            ContainerDocumentDownload,
            ContainerProduct,
            ContainerGridNews,
            ContainerTextImageNotFull,
            ContainerFourBlocs,
            ContainerMultipleBlocs,
            ContainerMultiTextBlocks
        },
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
