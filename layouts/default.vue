<template>
    <div id="app">
        <Nuxt />
    </div>
</template>

<script>
    import layoutMixin from '~/mixins/layoutMixin'

    export default {
        name: 'LayoutDefault',
        mixins: [layoutMixin],
    }
</script>
