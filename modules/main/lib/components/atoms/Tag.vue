<template>
    <SILink v-if="path" class="tag" :path="path" :title="title" />
    <p v-else class="tag">{{ title }}</p>
</template>

<script>
    import SILink from '../molecules/SILink.vue'

    export default {
        name: 'Tag',
        components: { SILink },
        props: {
            title: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: false,
                default: null,
            },
        },
    }
</script>

<style scoped lang="scss">
    .tag {
        display: flex;
        padding: 0.3rem 0.6rem;
        background-color: var(--electric-blue-300);
        border-radius: 4px;
        color: var(--electric-blue-700);
        transition: all 0.3s var(--cubicBezier);
    }
    a.tag {
        &:hover {
            background-color: var(--electric-blue-400);
        }
    }
</style>
