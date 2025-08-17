<template>
    <li class="social-media">
        <SILink :path="path" :icon="name" target="_blank" />
    </li>
</template>

<script>
    import SILink from './SILink.vue'

    export default {
        name: 'SocialMedia',
        components: { SILink },
        props: {
            name: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .social-media {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .si-link {
            position: relative;
            justify-content: center;
            color: var(--white-100);
            transition: all 0.3s var(--cubicBezier);
            :deep(.si-icon) {
                font-size: 1.2rem;
            }
            &:hover {
                color: var(--sunflower-700);
            }
        }
    }
</style>
