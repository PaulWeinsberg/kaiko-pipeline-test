<template>
    <ul :class="classNames">
        <MegaMenuItem
            v-for="(item, i) in items"
            :id="item.id"
            :key="i"
            :title="item.title"
            :path="item.url"
            :children="item.children"
            :column="column"
            :active="active"
            :icon="item.custom_fields.icon"
            @click:item="clickItem"
            @show:children="showChildren"
            v-on="$listeners"
        />
    </ul>
</template>

<script>
    export default {
        name: 'MegaMenuMenu',
        props: {
            items: {
                type: Array,
                required: true,
            },
            column: {
                type: Number,
                required: false,
                default: 0,
            },
        },
        emits: ['show:children', 'click:item'],
        data: () => ({
            active: null,
        }),
        computed: {
            classNames() {
                const { column } = this
                return ['mega-menu-menu', `column-${column}`]
            },
        },
        methods: {
            clickItem({ id }) {
                this.active = id
            },
            showChildren({ id }) {
                this.active = id
            },
        },
    }
</script>

<style scoped lang="scss">
    .mega-menu-menu {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        align-items: flex-start;
        position: relative;
        &.column- {
            &0,
            &1 {
                &:after {
                    content: '';
                    height: 5000vh;
                    position: absolute;
                    right: 0;
                    width: 1px;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: rgba(var(--white-100-rgb), 0.24);
                }
            }
            &1,
            &2 {
                position: absolute;
                top: 0;
                padding: 0 2vw;
            }
            &0 {
                width: 50%;
                @media screen and (max-width: $littleLaptopBreakPoint) {
                    width: 33%;
                }
            }
            &1 {
                left: 100%;
                width: 50%;
                @media screen and (max-width: $littleLaptopBreakPoint) {
                    left: 100%;
                    width: 100%;
                }
                &:after {
                    right: 0;
                }
            }
            &2 {
                left: 100%;
                width: 100%;
            }
        }
    }
</style>
