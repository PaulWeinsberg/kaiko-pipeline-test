<template>
    <SISection
        :text-color="content.background.text_color"
        :class="classNames"
        :background="content.background"
    >
        <SIWrapper align-items="flex-start">
            <SIWys
                v-for="(item, i) in content.content"
                :key="i"
                :content="item.text"
            />
        </SIWrapper>
    </SISection>
</template>
<script>
    import SISection from '../atoms/SISection.vue'
    import SIWrapper from '../atoms/SIWrapper.vue'
    import SIWys from '../molecules/SIWys.vue'

    export default {
        name: 'ContainerText',
        components: { SIWrapper, SIWys, SISection },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            classNames() {
                const { center_content } = this.content
                return ['container-text', { 'small-wrapper': center_content }]
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-text {
        &.small-wrapper .si-wrapper {
            max-width: 45rem;
        }
        .si-wrapper {
            .si-wys:not(:last-child) {
                margin-right: 1.2rem;
                @media screen and (max-width: $tabletBreakPoint) {
                    margin-right: 0;
                    margin-bottom: 2rem;
                }
            }
            @media screen and (max-width: $tabletBreakPoint) {
                flex-direction: column;
            }
        }
    }
</style>
