<template>
    <SILink
        class="link-card"
        :path="path"
        @mouseenter.native="onMousEnter"
        @mouseleave.native="onMouseLeave"
    />
</template>

<script>
    export default {
        name: 'LinkCard',
        props: {
            path: {
                type: String,
                required: true,
            },
        },
        data: () => ({
            hover: null,
        }),
        watch: {
            hover(nV) {
                this.$emit('hover', nV)
            },
        },
        methods: {
            onMousEnter() {
                this.hover = true
            },
            onMouseLeave() {
                this.hover = false
            },
        },
    }
</script>

<style scoped lang="scss">
    .link-card {
        position: absolute;
        inset: 0;
    }
</style>
