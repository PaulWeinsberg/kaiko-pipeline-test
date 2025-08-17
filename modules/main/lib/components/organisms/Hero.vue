<template>
    <HeroBase
        :is-row="isRow"
        :is-small="isRow"
        :content="content"
        :background="background"
        :breadcrumbs="breadcrumbs"
    >
        <HeroMail
            v-if="design === 'hubspot'"
            :vars="hubspotIntern.hubspot_embed"
            :on-submit="hubspotIntern.on_submit"
            :file="hubspotIntern.file"
        />
        <HeroTag
            v-else-if="design === 'tag'"
            :authors="authors"
            :tags="tags"
            :publication-date="publication_date"
        />
        <HeroImage v-else-if="design === 'image'" :image="image" />
        <HeroPostObject
            v-else-if="isPostObject"
            :design="design"
            :items="items"
        />
    </HeroBase>
</template>

<script>
    import HeroBase from './HeroBase.vue'
    import HeroImage from './HeroImage.vue'
    import HeroMail from './HeroMail.vue'
    import HeroPostObject from './HeroPostObject.vue'
    import HeroTag from './HeroTag.vue'

    export default {
        name: 'Hero',
        components: { HeroImage, HeroTag, HeroPostObject, HeroMail, HeroBase },
        props: {
            design: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: false,
                default: null,
            },
            background: {
                type: Object,
                required: true,
            },
            items: {
                type: Array,
                required: false,
                default: null,
            },
            breadcrumbs: {
                type: Array,
                required: false,
                default: null,
            },
            authors: {
                type: Array,
                required: false,
                default: null,
            },
            tags: {
                type: Array,
                required: false,
                default: null,
            },
            hubspot: {
                type: Object,
                required: false,
                default: null,
            },
            publication_date: {
                type: String,
                required: false,
                default: null,
            },
            image: {
                type: Object,
                required: false,
                default: null,
            },
        },
        computed: {
            isRow() {
                const { design } = this
                return design === 'image'
            },
            isPostObject() {
                const { design } = this
                const postObjects = ['report', 'insight', 'video', 'new']
                return postObjects.includes(design)
            },
            hubspotIntern() {
                const { hubspot } = this
                if (!hubspot) return {}
                return hubspot
            },
        },
    }
</script>

<style scoped lang="scss">
    .hero {
        .si-wys {
            &.content {
                margin-top: 1.7rem;
                :deep(p) {
                    font-weight: 500;
                }
            }
        }
    }
</style>
