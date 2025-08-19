<template>
    <ul class="grid-social-media">
        <SocialMedia
            v-for="(socialMedia, i) in items"
            :key="i"
            :name="socialMedia.social_media"
            :path="socialMedia.url"
        />
    </ul>
</template>

<script>
    import SocialMedia from './SocialMedia'
    export default {
        name: 'SocialMedias',
        components: { SocialMedia },
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .grid-social-media {
        display: flex;
        gap: 0.75rem;
        margin-top: 0.95rem;
    }
</style>
