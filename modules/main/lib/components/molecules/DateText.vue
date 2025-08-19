<template>
    <p class="date-text">
        <SIIcon name="c-calendar" color="sunflower-700" />
        <span>{{ date }}</span>
        <slot />
    </p>
</template>

<script>
    import SIIcon from '../atoms/SIIcon.vue'

    export default {
        name: 'DateText',
        components: { SIIcon },
        props: {
            date: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .date-text {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        color: var(--midnight-blue-300);
        .si-icon {
            font-size: 1.2rem;
            margin-right: 0.4rem;
        }
        span {
            line-height: 1em;
        }
    }
</style>
