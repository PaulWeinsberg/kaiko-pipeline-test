<template>
    <SectionEdito :content="content" class="container-multiple-blocs">
        <GridMultipleBlocs
            :column="content.column"
            :items="content.card"
            :type-card="content.type_bloc"
        />
        <SILink
            v-if="content.add_cta"
            btn
            :path="content.group_link.link"
            :title="content.group_link.text"
            :icon="content.group_link.icon"
            :design="content.group_link.design"
            icon-position="right"
        />
    </SectionEdito>
</template>

<script>
    import SILink from '../molecules/SILink.vue'
    import GridMultipleBlocs from '../molecules/GridMultipleBlocs.vue'
    import SectionEdito from './SectionEdito.vue'

    export default {
        name: 'ContainerMultipleBlocs',
        components: { GridMultipleBlocs, SILink, SectionEdito },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss"></style>
