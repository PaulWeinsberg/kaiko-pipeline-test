<template>
    <li :class="['menu-header-item', { hidden }]">
        <SILink
            :path="path"
            :target="target"
            pointer
            tag="div"
            @mouseenter.native="onMouseEnter"
            @click.native="onClick"
        >
            <p class="title">
                <SIIcon v-if="icon" :name="icon" />
                <span>{{ title }}</span>
            </p>
        </SILink>

        <template v-if="children">
            <SIIcon name="c-caret-right" @click.native="onCaretClick" />
            <SubMenuHeader :items="children" :show="active === id" />
        </template>
    </li>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'MenuHeaderItem',
        props: {
            id: {
                type: Number,
                required: true,
            },
            hidden: {
                type: Boolean,
                required: false,
                default: false,
            },
            title: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: false,
                default: null,
            },
            target: {
                type: String,
                required: false,
                default: null,
            },
            children: {
                type: Array,
                required: false,
                default: null,
            },
            active: {
                type: Number,
                required: false,
                default: null,
            },
            icon: {
                type: String,
                required: false,
                default: null,
            },
        },
        emits: ['show:children'],
        data: () => ({
            show: false,
        }),
        computed: {
            ...mapState({
                windowWidth: state => state.general.windowWidth,
            }),
        },
        methods: {
            onMouseEnter() {
                const { id, windowWidth } = this
                if (windowWidth > 1060) {
                    this.$emit('show:children', { id })
                }
            },
            onClick() {
                this.$nuxt.$emit('header:close')
            },
            onCaretClick() {
                const { id } = this
                this.$emit('show:children', { id })
                this.$nuxt.$emit('header:mobile:show', { column: 1 })
            },
        },
    }
</script>

<style scoped lang="scss">
    .menu-header-item {
        display: flex;
        padding: 0 0.8rem;
        box-sizing: border-box;
        @media screen and (max-width: $menuBreakpoint) {
            padding: 0;
            border-bottom: 1px solid var(--black-400);
        }
        &.hidden {
            display: none;
            @media screen and (max-width: $menuBreakpoint) {
                display: flex;
            }
        }
        .si-link {
            font-weight: 500;
            font-size: 0.8rem;
            line-height: 140%;
            text-transform: uppercase;
            box-sizing: border-box;
            @media screen and (max-width: $menuBreakpoint) {
                padding: 1.3rem 0;
                width: 100%;
            }
            &.nuxt-link-active {
                font-weight: bold;
            }
            .title {
                display: flex;
                align-items: center;
            }
            .title span:not(.si-icon) {
                @extend %underlineAnimated;
                &:after {
                    background-color: var(--orange-700);
                }
            }
            &:hover {
                .title span:not(.si-icon) {
                    @extend %underlineAnimatedHover;
                }
            }
        }
        > .si-icon {
            display: none;
            @media screen and (max-width: $menuBreakpoint) {
                display: flex;
                height: 100%;
                align-items: center;
                width: 10%;
                flex-shrink: 0;
                justify-content: flex-end;
                cursor: pointer;
            }
        }
    }
</style>
