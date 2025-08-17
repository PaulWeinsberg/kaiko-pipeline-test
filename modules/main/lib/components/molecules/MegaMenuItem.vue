<template>
    <li :class="classNames">
        <SILink
            link
            :title="title"
            :path="path"
            design="tertiary"
            :icon="iconIntern"
            @click.native="onClick"
        />
        <template v-if="children">
            <SIIcon name="c-arrow-right" @click.native="onClickArrow" />
            <MegaMenuMenu
                v-show="isActive"
                ref="menu"
                :items="children"
                :column="column + 1"
            />
        </template>
    </li>
</template>

<script>
    import SIIcon from '../atoms/SIIcon.vue'
    import MegaMenuMenu from './MegaMenuMenu.vue'
    import SILink from './SILink.vue'

    export default {
        name: 'MegaMenuItem',
        components: { MegaMenuMenu, SIIcon, SILink },
        props: {
            title: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            children: {
                type: Array,
                required: false,
                default: null,
            },
            column: {
                type: Number,
                required: true,
            },
            id: {
                type: Number,
                required: true,
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
        emits: ['show:children', 'click:item'],
        computed: {
            classNames() {
                const { isActive } = this
                return ['mega-menu-item', { active: isActive }]
            },
            isActive() {
                const { id, active } = this
                return active === id
            },
            iconIntern() {
                const { column, icon } = this
                if (column >= 2) return null
                return icon
            },
        },
        methods: {
            onClick() {
                const { id } = this
                this.$emit('click:item', { id })
            },
            onClickArrow() {
                const { id } = this
                const { menu } = this.$refs
                this.$emit('show:children', { id, menu: menu.$el })
            },
        },
    }
</script>

<style scoped lang="scss">
    .mega-menu-item {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        .si-link.link {
            font-size: 3.3rem;
            line-height: 100%;
            font-weight: 300;
            padding: 1.6rem 0;
            width: 100%;
            margin-right: auto;
            :deep(.si-icon) {
                font-size: 1.2em;
                margin-right: 0.8rem !important;
            }
            .column-1 &,
            .column-2 & {
                font-size: 1rem;
                font-weight: 400;
                line-height: 140%;
            }
            @media screen and (max-width: $littleLaptopBreakPoint) {
                font-size: 1.5rem;
                .column-1 &,
                .column-2 & {
                    padding: 1rem 0;
                }
            }
            &.nuxt-link-active {
                color: var(--sunflower-700) !important;
            }
        }
        .si-icon {
            font-size: 1.7rem;
            margin-left: 0.5rem;
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 3.8vw 0 2vw;
            color: var(--white-100);
            cursor: pointer;
            @media screen and (max-width: 920px) {
                padding: 0 1rem;
            }
            .column-1 & {
                font-size: 1.4rem;
                padding: 0;
            }
            &:hover {
                color: var(--sunflower-700);
            }
        }
        &.active {
            > .si-icon {
                color: var(--sunflower-700);
            }
        }
    }
</style>
