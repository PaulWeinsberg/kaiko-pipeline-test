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
        name: 'ListPost',
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
                return ['list-post', { full }]
            },
        },
    }
</script>

<style scoped lang="scss">
    .list-post {
        li {
            padding: 1rem 0rem .5rem;
            border-bottom: 1px solid var(--midnight-blue-300);
        }
    }
</style>
