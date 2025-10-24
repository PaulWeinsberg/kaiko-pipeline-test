<template>
    <SISection
        :text-color="content.background.text_color"
        :class="classNames"
        :background="content.background">
        <SIWrapper>
            <TextBlock
                v-for="(row, i) in content.rows"
                :key="i"
                :blocks="row.blocks"
                :layout="row.layout"
            />
        </SIWrapper>
    </SISection>
</template>
<script>
    import SISection from '../atoms/SISection.vue'
    import TextBlock from '../molecules/TextBlock.vue'
    import SIWrapper from '../atoms/SIWrapper.vue'

    export default {
        name: 'ContainerMultiTextBlocks',
        components: { SISection, TextBlock, SIWrapper },
        props: {
            content: {
                type: Object,
                required: false
            },
        },
        computed: {
            classNames() {
                return ['container-multi-text-blocks']
            },
        },
    }
</script>

<style scoped lang="scss">
.container-multi-text-blocks {
    :deep(.si-wrapper) {
        flex-wrap: wrap;
        gap: 1.2rem
    }
}
</style>
