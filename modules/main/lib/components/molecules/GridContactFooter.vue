<template>
    <div class="grid-contact-footer">
        <p v-if="information.title" class="footer-title">
            {{ information.title }}
        </p>
        <ul class="container-list">
            <GridContactFooterItem
                v-for="item in information.contact_information"
                :key="item.id"
                :content="item"
            />
        </ul>
        <SocialMedias v-if="socialMedias" :items="socialMedias" />
    </div>
</template>

<script>
    import SocialMedias from './SocialMedias.vue'

    export default {
        name: 'GridContactFooter',
        components: { SocialMedias },
        props: {
            information: {
                type: Object,
                required: true,
            },
            socialMedias: {
                type: Array,
                required: false,
                default: null,
            },
        },
    }
</script>

<style scoped lang="scss">
    .grid-contact-footer {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        width: 100%;
        @media screen and (min-width: $tabletBreakPointMin) {
            max-width: 20.8rem;
        }
        .footer-title {
            font-weight: 600;
            color: var(--white-100);
            text-transform: uppercase;
            font-size: 0.7rem;
            margin-bottom: 0.5rem;
            line-height: 1rem;
            @media screen and (max-width: $tabletBreakPoint) {
                margin-bottom: 2rem;
            }
        }
        .container-list {
            display: grid;
            grid-gap: 2.3rem 1.2rem;
            grid-template-columns: repeat(2, 1fr);
            margin: auto 0 0.5rem;
            @media screen and (max-width: $tabletBreakPoint) {
                grid-template-columns: repeat(auto-fill, 8rem);
                min-width: auto;
                grid-gap: 2.3rem 0.5rem;
            }
        }
    }
</style>
