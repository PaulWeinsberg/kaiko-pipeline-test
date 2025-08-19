<template>
    <SIImage class="hero-image" :image="image.url" />
</template>

<script>
    import SIImage from '../molecules/SIImage.vue'

    export default {
        name: 'HeroImage',
        components: { SIImage },
        props: {
            image: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .hero-image {
        max-width: 12.5rem;
        margin-left: auto;
        @media screen and (max-width: $littleTabletBreakPoint) {
            margin-right: auto;
            margin-top: 1rem;
        }
    }
</style>
