<template>
    <div id="app" class="default">
        <BaseHeader :search="showSearchField" :has-mega-menu="false" />
        <BaseMegaMenu />
        <Nuxt />
        <BaseFooter
            :footer="footer.items"
            :sub-footer="subFooter"
            :options="options"
            :social-medias="footer.custom_fields.social_medias"
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
                footer: state => state.menu.footer,
                subFooter: state => state.menu.footerSub.items,
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
