<template>
    <div :class="classNames">
        <SILoader :show="loading" outside />
        <ul v-if="total > 0">
            <slot />
        </ul>
        <NoResult v-else />
    </div>
</template>

<script>
    import SILoader from '../atoms/SILoader.vue'
    import NoResult from './NoResult.vue'
    export default {
        name: 'GridPost',
        components: { NoResult, SILoader },
        props: {
            total: {
                type: Number,
                required: false,
                default: 0,
            },
            loading: {
                type: Boolean,
                required: false,
                default: false,
            },
            full: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            classNames() {
                const { full } = this
                return ['grid-post', { full }]
            },
        },
    }
</script>

<style scoped lang="scss">
    .grid-post {
        display: flex;
        width: 100%;
        position: relative;
        ul {
            display: grid;
            grid-gap: 3.2rem 1.2rem;
            width: 100%;
            justify-content: center;
            grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
            .grid-four-columns & {
                grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
            }
            > * {
                width: 100%;
                margin: 0 auto;
            }
        }
        &.full {
            ul {
                grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
                .grid-four-columns & {
                    grid-template-columns: repeat(
                        auto-fill,
                        minmax(14rem, 1fr)
                    );
                }
            }
        }
    }
</style>
