<template>
    <div v-show="show" :class="classNames">
        <SubMenuBack :title="wordings.g_header.back_main_menu" />
        <ul>
            <SubMenuHeaderItem
                v-for="item in items"
                :id="item.id"
                :key="item.id"
                :title="item.title"
                :path="item.url"
                :target="item.target"
                :excerpt="item.excerpt"
                :children="item.children"
                :active="active"
                :icon="item.custom_fields.icon"
                @show:children="showChildren"
            />
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'SubMenuHeader',
        props: {
            items: {
                type: Array,
                required: true,
            },
            show: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        data: () => ({
            active: null,
        }),
        computed: {
            ...mapState({
                menu: state => state.menu.menu,
                wordings: state => state.options.options.wordings,
            }),
            classNames() {
                const { hasChildren } = this
                return ['sub-menu-header', { 'has-children': hasChildren }]
            },
            hasChildren() {
                const { items } = this
                return !!items.filter(item => item.children).length
            },
        },
        mounted() {
            this.$nuxt.$on('header:reset-active', this.resetActive)
        },
        methods: {
            showChildren({ id }) {
                this.active = id
            },
            resetActive() {
                this.active = null
            },
        },
    }
</script>

<style scoped lang="scss">
    .sub-menu-header {
        display: flex;
        max-width: 45.8rem;
        padding: 0.7rem 0;
        width: 100vw;
        background-color: var(--white-100);
        color: var(--midnight-blue-700);
        position: absolute;
        top: var(--headerHeight);
        left: 50%;
        transform: translateX(-50%);
        @media screen and (max-width: $menuBreakpoint) {
            display: flex;
            flex-direction: column;
            transform: translateX(100%);
            position: absolute;
            top: 0;
            left: 0;
            min-height: 100%;
            padding: 0;
        }
        ul {
            display: grid;
            grid-template-columns: 1fr;
            box-sizing: border-box;
            width: 100%;
            align-items: flex-start;
            @media screen and (max-width: $menuBreakpoint) {
                display: flex;
                flex-direction: column;
                margin-top: 0.5rem;
                padding: 0 0.8rem;
            }
            @include parent-has-class(':not(.has-children)') {
                grid-template-columns: 1fr 1fr;
                @media screen and (min-width: $menuBreakpointMin) {
                    &:after {
                        content: '';
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 1px;
                        height: 100%;
                        background-color: var(--midnight-blue-400);
                    }
                }
            }
        }
    }
</style>
