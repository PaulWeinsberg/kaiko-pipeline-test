<template>
    <SectionEdito :content="content" class="container-document-download">
        <ul>
            <CardDocumentDownload
                v-for="(item, key) in content.list_document"
                :key="key"
                :icon="item.icon"
                :title="item.title"
                :content="item.content"
                :document="item"
            />
        </ul>
    </SectionEdito>
</template>

<script>
    import CardDocumentDownload from '../molecules/CardDocumentDownload.vue'
    import SectionEdito from './SectionEdito.vue'

    export default {
        name: 'ContainerDocumentDownload',
        components: { CardDocumentDownload, SectionEdito },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-document-download {
        ul {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 1.2rem;
            @media screen and (max-width: $mobileBreakPoint) {
                grid-template-columns: 1fr;
            }
            li {
                &:nth-child(odd) {
                    background: var(--gradient-blue-700);
                }
                &:nth-child(even) {
                    background: var(--gradient-blue-500);
                }
            }
        }
    }
</style>
