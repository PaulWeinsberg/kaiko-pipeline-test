<template>
    <component :is="tag" class="card-profile">
        <SIImage :image="image.url" />
        <div class="content">
            <p class="name">{{ name }}</p>
            <p class="role">{{ role }}</p>
        </div>
    </component>
</template>

<script>
    import SIImage from './SIImage.vue'

    export default {
        name: 'CardProfile',
        components: { SIImage },
        props: {
            tag: {
                type: String,
                required: false,
                default: 'li',
            },
            image: {
                type: Object,
                required: false,
                default: null,
            },
            name: {
                type: String,
                required: false,
                default: null,
            },
            role: {
                type: String,
                required: false,
                default: null,
            },
        },
    }
</script>

<style scoped lang="scss">
    .card-profile {
        display: flex;
        flex-direction: column;
        .si-image {
            width: 100%;
            aspect-ratio: 1/1;
        }
        .content {
            display: flex;
            flex-direction: column;
            background: var(--white-100);
            padding: 1.6rem;
            box-sizing: border-box;
            flex: 1;
            .name {
                font-weight: 700;
                font-size: 0.75rem;
                line-height: 140%;
                text-transform: uppercase;
                margin-bottom: 0.8rem;
                color: var(--midnight-blue-700);
            }
            .role {
                font-weight: 400;
                font-size: 0.8rem;
                line-height: 160%;
                color: var(--midnight-blue-500);
            }
            .b-white-100 & {
                border: 1px solid var(--black-300);
                border-top: 0;
            }
        }
    }
</style>
