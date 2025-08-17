<template>
    <SISection
        :text-color="content.background.text_color"
        :background="content.background"
        class="container-subscribe"
    >
        <SIWrapper flex-direction="column">
            <SIWys v-if="content.content" :content="content.content" />
        </SIWrapper>
    </SISection>
</template>

<script>
    export default {
        name: 'ContainerPush',
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped></style>
