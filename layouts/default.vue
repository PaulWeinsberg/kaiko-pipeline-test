<template>
    <div id="app" class="default">
        <BaseHeader :search="showSearchField" :has-mega-menu="false" />
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
    import layoutMixin from '@/mixins/layoutMixin'

    export default {
        name: 'LayoutDefault',
        mixins: [layoutMixin],
        computed: {
            ...mapState({
                header: state => state.menu.menu,
                footer: state => state.menu.footer.items,
                subFooter: state => state.menu.footerSub.items,
                options: state => state.options.options,
            }),
            showSearchField() {
                const { header } = this
                return header?.custom_fields?.show_search_field ?? false
            },
        },
        watch: {
            $route() {
                this.$nuxt.$emit('navigation:show', { show: false })
            },
        },
    }
</script>
