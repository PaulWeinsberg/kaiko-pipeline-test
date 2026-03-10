<template>
    <nav class="menu-header" @mouseleave="onMouseLeave">
        <ul>
            <MenuHeaderItem
                v-for="item in items"
                :id="item.id"
                :key="item.id"
                :title="item.title"
                :path="item.url"
                :target="item.target"
                :children="item.children"
                :active="active"
                :hidden="item.hide"
                :icon="item.custom_fields.icon"
                @show:children="showChildren"
            />
        </ul>
    </nav>
</template>

<script>
    import { mapState } from 'vuex'
    import MenuHeaderItem from './MenuHeaderItem.vue'

    export default {
        name: 'MenuHeader',
        components: { MenuHeaderItem },
        props: {
            items: {
                type: Array,
                required: false,
                default: null,
            },
        },
        data: () => ({
            active: null,
        }),
        computed: {
            ...mapState({
                windowWidth: state => state.general.windowWidth,
            }),
        },
        mounted() {
            this.$nuxt.$on('header:click-link', this.clickLink)
        },
        methods: {
            showChildren({ id }) {
                this.active = id
            },
            onMouseLeave() {
                this.resetActive();
            },
            clickLink() {
                this.resetActive();
            },
            resetActive() {
                const { windowWidth } = this
                if (windowWidth > 1060) {
                    this.$nuxt.$emit('header:reset-active')
                    this.active = null
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .menu-header {
        display: flex;
        @media screen and (min-width: $menuBreakpointMin) {
            align-items: center;
            margin: 0 auto;
            height: 100%;
        }
        @media screen and (min-width: 1221px) {
            position: relative;
        }
        @media screen and (max-width: $menuBreakpoint) {
            width: 100%;
            order: 2;
        }
        ul {
            display: flex;
            @media screen and (max-width: $menuBreakpoint) {
                flex-direction: column;
                width: 100%;
                box-sizing: border-box;
            }
        }
    }
</style>
