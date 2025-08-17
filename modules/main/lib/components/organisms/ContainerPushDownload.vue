<template>
    <SISection
        :text-color="content.background.text_color"
        :class="classNames"
        :background="content.background"
    >
        <SIWrapper align-items="center" justify-content="center">
            <SIWys :content="content.text" />
            <SILink
                btn
                design="primary"
                :path="linkButton"
                type="external"
                target="_blank"
                :icon="button.icon"
                :title="button.text"
                icon-position="right"
            />
        </SIWrapper>
    </SISection>
</template>
<script>
    import { mapState } from 'vuex'
    import SISection from '../atoms/SISection.vue'
    import SIWrapper from '../atoms/SIWrapper.vue'
    import SILink from '../molecules/SILink.vue'
    import SIWys from '../molecules/SIWys.vue'

    export default {
        name: 'ContainerPushDownload',
        components: { SILink, SIWrapper, SIWys, SISection },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            ...mapState({
                button: state => state.options.options.wordings.g_push_download,
            }),
            classNames() {
                return ['container-push-download']
            },
            linkButton() {
                const { file_link, file } = this.content
                if (file_link) return file_link
                return file.url
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-push-download {
        :deep {
            .si-wrapper {
                @media screen and (max-width: $littleTabletBreakPoint) {
                    flex-direction: column;
                }

                .si-link {
                    flex-shrink: 0;
                }

                .si-wys {
                    @media screen and (min-width: $littleMobileBreakPointMin) {
                        width: fit-content;
                        margin-right: 4rem;
                    }

                    @media screen and (max-width: $littleTabletBreakPoint) {
                        margin-right: 2rem;
                    }

                    @media screen and (max-width: $littleTabletBreakPoint) {
                        margin-right: 0;
                        margin-bottom: 2rem;
                    }
                }
            }
        }
    }
</style>
