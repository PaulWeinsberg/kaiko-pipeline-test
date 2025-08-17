<template>
    <SISection v-if="content.enable_summary" class="container-anchor">
        <SIWrapper>
            <SISwiper class="anchors">
                <ContainerAnchorItem
                    v-for="(item, i) in anchors"
                    :key="i"
                    :title="item.title"
                    :target="item.target"
                />
            </SISwiper>
        </SIWrapper>
    </SISection>
</template>
<script>
    import SISection from '../atoms/SISection.vue'
    import SIWrapper from '../atoms/SIWrapper.vue'
    import ContainerAnchorItem from '../molecules/ContainerAnchorItem.vue'
    import SISwiper from '../organisms/SISwiper.vue'

    export default {
        name: 'ContainerAnchor',
        components: {
            SIWrapper,
            SISection,
            ContainerAnchorItem,
            SISwiper,
        },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            anchors() {
                const { content } = this
                const anchors = []
                content.page_builder.forEach((anchor, index) => {
                    if (anchor.summary_title) {
                        anchors.push({
                            title: anchor.summary_title,
                            target: `${anchor.acf_fc_layout}-${index}`,
                        })
                    }
                })
                return anchors
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-anchor {
        background: var(--midnight-blue-700);
        .si-wrapper {
            max-width: 47rem;
            padding: 0;
            .anchors {
                display: flex;
                align-items: center;
                padding: 1rem 0 1rem 1rem;
                @media screen and (max-width: $mobileBreakPointMin) {
                    max-width: 90%;
                    margin: 0 auto;
                }
            }
        }
    }
</style>
