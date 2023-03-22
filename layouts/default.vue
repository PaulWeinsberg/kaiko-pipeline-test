<template>
    <div id="app">
        <BaseHeader search />
        <BaseMegaMenu />
        <Nuxt />
        <BaseFooter
            :footer="footer"
            :sub-footer="subFooter"
            :options="options"
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import layoutMixin from '~/mixins/layoutMixin'

    export default {
        name: 'LayoutDefault',
        mixins: [layoutMixin],
        computed: {
            ...mapState({
                footer: state => state.menu.footer.items,
                subFooter: state => state.menu.footerSub.items,
                options: state => state.options.options,
            }),
        },
        watch: {
            $route() {
                this.$nuxt.$emit('navigation:show', { show: false })
            },
        },
    }
</script>
