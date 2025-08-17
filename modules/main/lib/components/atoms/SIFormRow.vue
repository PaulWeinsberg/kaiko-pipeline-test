<template>
    <div :class="classNames" :style="style">
        <slot />
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'SIFormRow',
        props: {
            column: {
                type: Number,
                required: false,
                default: null,
            },
        },
        computed: {
            ...mapState({
                windowWidth: state => state.general.windowWidth,
            }),
            classNames() {
                const { column } = this
                return ['si-form-row', { grid: column }]
            },
            style() {
                const { column, windowWidth } = this
                if (!column) return null
                const columnInternal = windowWidth <= 520 ? 1 : column
                return {
                    gridTemplateColumns: `repeat(${columnInternal}, 1fr)`,
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-form-row {
        display: flex;
        &.grid {
            display: grid;
            grid-gap: 1.2rem;
        }
        width: 100%;
        margin-bottom: 1.5rem;
        @media screen and (max-width: $mobileBreakPoint) {
            flex-direction: column;
        }
        @media screen and (max-width: 520px) {
            margin-bottom: 1.2rem;
        }
    }
</style>
