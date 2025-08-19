<template>
    <SILink
        :class="classNames"
        link
        :title="button.text"
        :path="path"
        :icon="button.icon"
        :hover="hover"
    />
</template>

<script>
    import { mapState } from 'vuex'
    import SILink from './SILink.vue'

    export default {
        name: 'LinkDownload',
        components: { SILink },
        props: {
            path: {
                type: String,
                required: true,
            },
            design: {
                type: String,
                required: true,
            },
            column: {
                type: Boolean,
                required: false,
                default: null,
            },
            hover: {
                type: Boolean,
                required: false,
                default: null,
            },
        },
        computed: {
            ...mapState({
                wordings: state =>
                    state.options.options.wordings.g_report_media,
            }),
            classNames() {
                const { column } = this
                return ['link-download', { column }]
            },
            button() {
                const { wordings, design } = this
                return wordings[design]
            },
        },
    }
</script>

<style scoped lang="scss">
    .link-download {
        :deep(.si-icon) {
            font-size: 1.2rem;
            font-weight: 300;
            margin-right: 0.9rem !important;
        }

        &.column {
            .hero & {
                flex-direction: column;
                :deep(.si-icon) {
                    margin: 0 0 1rem 0 !important;
                }
            }
        }

        .si-link-title {
            font-size: 0.8rem;
        }
    }
</style>
