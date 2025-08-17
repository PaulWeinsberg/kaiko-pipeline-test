<template>
    <p class="si-caption">{{ caption }}</p>
</template>

<script>
    export default {
        name: 'SICaption',
        props: {
            caption: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-caption {
        font-style: italic;
        font-weight: 300;
        font-size: 1rem;
        line-height: 1.25em;
        margin-top: 0.5rem;
    }
</style>
