<template>
    <component :is="tag" class="card-office swiper-slide">
        <SIImage :image="image.url" />
        <div class="content">
            <SIWys :content="content" />
        </div>
    </component>
</template>

<script>
    import SIIcon from '../atoms/SIIcon.vue'
    import SIWys from './SIWys.vue'

    export default {
        name: 'CardOffice',
        components: { SIWys, SIIcon },
        props: {
            tag: {
                type: String,
                required: false,
                default: 'li',
            },
            content: {
                type: String,
                required: true,
            },
            image: {
                type: Object,
                required: false,
                default: null,
            },
        },
    }
</script>

<style scoped lang="scss">
    .card-office {
        display: flex;
        flex-direction: column;
        max-width: 15.3rem;
        flex-shrink: 0;
        width: calc(100% - var(--wrapperPaddingHorizontal));
        &:not(:last-child) {
            margin-right: 1.2rem;
        }
        .si-image {
            width: 100%;
            aspect-ratio: 51/40;
        }
        .content {
            display: flex;
            flex-direction: column;
            background: var(--white-100);
            color: var(--midnight-blue-700);
            padding: 1.6rem;
            box-sizing: border-box;
            flex: 1;
            .city {
                font-weight: 700;
                font-size: 0.75rem;
                line-height: 140%;
                text-transform: uppercase;
                margin-bottom: 0.8rem;
                color: var(--midnight-blue-700);
            }
            .address {
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
