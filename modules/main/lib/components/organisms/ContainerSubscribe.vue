<template>
    <SISection
        :text-color="content.background.text_color"
        :background="content.background"
        class="container-subscribe"
    >
        <SIWrapper flex-direction="column">
            <SIWys v-if="content.content" :content="content.content" />
            <HubspotBase
                :vars="content.hubspot_embed"
                :on-submit="content.on_submit"
                :file="content.file"
            />
        </SIWrapper>
    </SISection>
</template>

<script>
    import SISection from '../atoms/SISection.vue'
    import SIWrapper from '../atoms/SIWrapper.vue'
    import SIWys from '../molecules/SIWys.vue'
    import HubspotBase from "../molecules/HubspotBase.vue";

    export default {
        name: 'ContainerSubscribe',
        components: {HubspotBase, SIWys, SIWrapper, SISection },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-subscribe {
        .si-wrapper {
            .si-wys {
                margin-bottom: 0.1rem;
            }
        }
    }
</style>
