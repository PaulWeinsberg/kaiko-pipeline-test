<template>
    <p class="no-result">{{ wordings.g_grid.no_result }}</p>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'NoResult',
        computed: {
            ...mapState({
                wordings: state => state.options.options.wordings,
            }),
        },
    }
</script>

<style scoped lang="scss">
    .no-result {
        font-weight: 600;
        margin: 0 auto;
    }
</style>
