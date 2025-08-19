<template>
    <SISection
        :background="content.background"
        class="container-video"
        :text-color="content.background.text_color"
    >
        <SIWrapper align-items="flex-start">
            <SIWys :content="content.content" />
            <SIVideo
                ref="video"
                controls
                :youtube="isYoutube"
                :thumbnail="content.video.thumbnail"
                :url="url"
                ratio="16-9"
            />
        </SIWrapper>
    </SISection>
</template>

<script>
    import SISection from '../atoms/SISection.vue'
    import SIWrapper from '../atoms/SIWrapper.vue'
    import SIVideo from '../molecules/SIVideo.vue'
    import SIWys from '../molecules/SIWys.vue'

    export default {
        name: 'ContainerVideo',
        components: { SIWys, SIVideo, SIWrapper, SISection },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            isYoutube() {
                const { content } = this
                return content.video.video_type === 'youtube'
            },
            url() {
                const { content, isYoutube } = this
                if (isYoutube) return content.video.video_url
                return content.video.video_local.url
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-video {
        .si-wrapper {
            @media screen and (max-width: $littleTabletBreakPoint) {
                flex-direction: column !important;
            }
            @media screen and (max-width: $littleMobileBreakPoint) {
                padding-left: 0;
                padding-right: 0;
            }
            .si-wys {
                flex: 1;
                @media screen and (min-width: $littleTabletBreakPointMin) {
                    margin-right: 1.2rem;
                }
                @media screen and (max-width: $littleMobileBreakPoint) {
                    padding: 0 var(--wrapperPaddingHorizontal);
                }
            }
            .si-video {
                flex: 2;
                @media screen and (min-width: $littleTabletBreakPointMin) {
                    margin-left: 1.2rem;
                }
                @media screen and (max-width: $littleTabletBreakPoint) {
                    margin-top: 1rem;
                }
            }
        }
    }
</style>
