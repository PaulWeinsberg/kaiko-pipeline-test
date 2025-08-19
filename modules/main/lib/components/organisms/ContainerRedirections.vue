<template>
    <ContainerEdito
        :content="content"
        item-text-name="post"
        item-post-type="redirection"
    />
</template>

<script>
    import ContainerEdito from './ContainerEdito.vue'

    export default {
        name: 'ContainerRedirections',
        components: {
            ContainerEdito,
        },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
    }
</script>
