<template>
    <div class="sub-menu-header-children">
        <SubMenuBack :title="titleBack" :column="1" />
        <ul>
            <SubMenuHeaderChildrenItem
                v-for="item in items"
                :key="item.id"
                :title="item.title"
                :path="item.url"
                :target="item.target"
                :excerpt="item.excerpt"
                :icon="item.custom_fields.icon"
            />
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'SubMenuHeaderChildren',
        props: {
            items: {
                type: Array,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
        },
        computed: {
            ...mapState({
                wordings: state => state.options.options.wordings,
            }),
            titleBack() {
                const { wordings, title } = this
                return wordings.g_header.back_previous_menu.replace(
                    '{{PREVIOUS}}',
                    title
                )
            },
        },
    }
</script>

<style scoped lang="scss">
    .sub-menu-header-children {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        right: 0;
        width: 50%;
        background: linear-gradient(90deg, #ebf1f8 0%, #fcfdfe 100%);
        min-height: 100%;
        top: 0;
        padding: 2.4rem;
        box-sizing: border-box;
        @media screen and (min-width: $menuBreakpointMin) {
            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                transform: translateX(calc(-100% - 2.4rem));
                background: var(--white-100);
                z-index: -1;
            }
        }
        @media screen and (max-width: $menuBreakpoint) {
            transform: translateX(100%);
            left: 0;
            right: unset;
            width: 100%;
            background: var(--white-100);
            align-items: flex-start;
            justify-content: flex-start;
            padding: 0;
        }
        ul {
            display: flex;
            flex-direction: column;
            width: 100%;
            box-sizing: border-box;
            @media screen and (min-width: $menuBreakpointMin) {
                gap: 0.9rem;
            }
            @media screen and (max-width: $menuBreakpoint) {
                padding: 0 0.8rem;
            }
        }
    }
</style>
