<template>
    <li
        :class="classNames"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <SILink
            :title="title"
            :path="path"
            :icon="icon"
            :target="target"
            :hover="hover"
            @click:link="clickLink"
        >
            <p v-if="excerpt" class="excerpt">{{ excerpt }}</p>
        </SILink>

        <template v-if="children">
            <SIIcon :name="iconChildren" @click.native="onClickIcon" />
            <SubMenuHeaderChildren
                v-show="isActive"
                :items="children"
                :active="active"
                :title="title"
            />
        </template>
    </li>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'SubMenuHeaderItem',
        props: {
            id: {
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            excerpt: {
                type: String,
                required: false,
                default: null,
            },
            children: {
                type: Array,
                required: false,
                default: null,
            },
            icon: {
                type: String,
                required: false,
                default: null,
            },
            active: {
                type: Number,
                required: false,
                default: null,
            },
            type: {
                type: String,
                required: false,
                default: null,
            },
            target: {
                type: String,
                required: false,
                default: null,
            },
        },
        emits: ['show:children'],
        data: () => ({
            hover: false,
        }),
        computed: {
            ...mapState({
                windowWidth: state => state.general.windowWidth,
            }),
            classNames() {
                const { isActive } = this
                return ['sub-menu-header-item', { active: isActive }]
            },
            isActive() {
                const { active, id } = this
                return active === id
            },
            isMobile() {
                const { windowWidth } = this
                return windowWidth <= 1060
            },
            iconChildren() {
                const { isMobile } = this
                if (!isMobile) return 'c-arrow-right'
                return 'c-caret-right'
            },
        },
        methods: {
            showChildren() {
                const { id, isMobile } = this
                this.$emit('show:children', { id })

                if (isMobile) {
                    this.$nuxt.$emit('header:mobile:show', { column: 2 })
                }
            },
            onClickIcon() {
                this.showChildren()
            },
            onMouseEnter() {
                const { isMobile } = this
                this.hover = true
                if (!isMobile) this.showChildren()
            },
            onMouseLeave() {
                this.hover = false
            },
            clickLink() {
                this.$nuxt.$emit('header:click-link')
            },
        },
    }
</script>

<style scoped lang="scss">
    .sub-menu-header-item {
        display: flex;
        box-sizing: border-box;
        align-items: flex-start;
        padding: 0.5rem 4.3rem;
        cursor: pointer;
        @media screen and (max-width: $menuBreakpoint) {
            padding: 0.675rem 0.8rem;
        }
        .has-children & {
            width: 50%;
            padding: 0.5rem 2.5rem 0.5rem 4.3rem;
            @media screen and (max-width: $menuBreakpoint) {
                width: 100%;
                padding: 0.8rem 0;
                box-sizing: border-box;
                &:not(:first-child) {
                    border-top: 1px solid var(--black-400);
                }
            }
        }
        > .si-link {
            flex-wrap: wrap;
            width: 100%;
            :deep(.si-link-title) {
                font-weight: 500;
                font-size: 0.8rem;
                text-transform: uppercase;
                @media screen and (max-width: $menuBreakpoint) {
                    font-weight: 700;
                }
            }
            :deep(.si-icon) {
                font-size: 0.9rem;
                margin-right: 0.4rem;
                line-height: inherit;
            }
        }
        :deep(.si-link) {
            transition: color 0.3s var(--cubicBezier);
            .excerpt {
                width: 100%;
                color: var(--midnight-blue-400);
                line-height: normal;
                font-size: 0.7rem;
                @media screen and (max-width: $menuBreakpoint) {
                    font-size: 0.75rem;
                    margin-top: 0.4rem;
                }
            }
        }
        :deep {
            @media screen and (min-width: $menuBreakpointMin) {
                a.si-link:hover,
                a.si-link.hover,
                a.nuxt-link-active,
                &.active {
                    > .si-link-title,
                    > .si-icon {
                        color: var(--sunflower-700) !important;
                    }
                }
            }
        }
    }
</style>
