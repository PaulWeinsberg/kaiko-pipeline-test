<template>
    <SIWys class="written-by" :content="content" />
</template>

<script>
    import { mapState } from 'vuex'
    import SIWys from './SIWys.vue'

    export default {
        name: 'WrittenBy',
        components: { SIWys },
        props: {
            authors: {
                type: Array,
                required: false,
                default: null,
            },
            light: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            ...mapState({
                wordings: state => state.options.options.wordings,
            }),
            content() {
                const { authors, wordings, light } = this
                let content = ''

                if (!authors) return content

                content += `<span>${wordings.insight.written_by}</span>`
                authors.forEach((author, i) => {
                    if (light && i) return ''
                    if (i) content += ', '
                    content += `<SILink title="${author.name}" path="${author.link}" :design="null" />`
                })

                return content
            },
        },
    }
</script>

<style scoped lang="scss">
    .written-by {
        margin-top: 0.8rem;
        font-size: 0.7rem;
        font-weight: 400;
        line-height: 1.4em;
        color: var(--midnight-blue-400);
        z-index: 5;
        :deep(a) {
            display: inline;
            font-size: inherit;
            line-height: inherit;
            white-space: nowrap;
            margin: 0 0 0 0.15rem;
            font-weight: bold;
        }
    }
</style>
