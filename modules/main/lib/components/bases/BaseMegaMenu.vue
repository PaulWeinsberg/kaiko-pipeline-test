<template>
    <transition appear @enter="$animations.fadeIn" @leave="$animations.fadeOut">
        <SISection v-show="open" id="base-mega-menu">
            <MegaMenuBody :items="(header && header.items) ? header.items : []" />
            <MegaMenuFooter
                v-if="footerItems && footerItems.length"
                :items="footerItems"
            />
        </SISection>
    </transition>
</template>

<script>
    import { mapState } from 'vuex'
    import { gsap } from 'gsap'
    import SISection from '../atoms/SISection.vue'
    import MegaMenuBody from '../molecules/MegaMenuBody.vue'
    import MegaMenuFooter from '../molecules/MegaMenuFooter.vue'

    export default {
        name: 'BaseMegaMenu',
        components: { MegaMenuFooter, MegaMenuBody, SISection },
        data: () => ({
            open: false,
        }),
        computed: {
            ...mapState({
                header: state => state.menu.menu,
            }),
            footerItems() {
                const header = this.header || {}
                const custom_fields = header.custom_fields || null
                if (!custom_fields) return null
                return custom_fields.buttons || null
            },
        },
        watch: {
            open(nV) {
                gsap.set('body', {
                    overflow: nV ? 'hidden' : '',
                })
            },
        },
        mounted() {
            this.$nuxt.$on('navigation:show', this.onNavigationShow)
        },
        methods: {
            onNavigationShow({ show }) {
                this.open = show
            },
        },
    }
</script>

<style scoped lang="scss">
    #base-mega-menu {
        display: flex;
        position: fixed;
        width: 100vw;
        height: calc(100vh - var(--baseHeaderHeight));
        z-index: 50;
        top: var(--baseHeaderHeight);
        left: 0;
        overflow: hidden;
        background-color: var(--midnight-blue-700);
        @media screen and (max-width: $menuBreakpoint) {
            display: none;
        }
    }
</style>
