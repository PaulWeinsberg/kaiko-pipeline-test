<template>
    <div :class="classNames">
        <ThreeBlocItem
            :card="items"
            :mobile-carousel="mobileCarousel"
            :type-card="typeCard"
            :is-little="column === '4'"
        />
    </div>
</template>
<script>
    import ThreeBlocItem from './ThreeBlocItem.vue'

    export default {
        name: 'GridMultipleBlocs',
        components: { ThreeBlocItem },
        props: {
            items: {
                type: Array,
                required: true,
            },
            mobileCarousel: {
                type: Boolean,
                required: false,
                default: false,
            },
            typeCard: {
                type: String,
                required: true,
            },
            column: {
                type: String,
                required: true,
            },
        },
        computed: {
            classNames() {
                const { column } = this
                return ['grid-multiple-blocs', `column-${column}`]
            },
        },
    }
</script>

<style scoped lang="scss">
    .grid-multiple-blocs {
        display: grid;
        grid-gap: 1.2rem;
        width: 100%;
        &.column-2 {
            grid-template-columns: repeat(2, minmax(16rem, 20.8rem));
            justify-content: center;
            @media screen and (max-width: 920px) {
                grid-template-columns: repeat(1, minmax(16rem, 20.8rem));
            }
            @media screen and (max-width: 520px) {
                grid-template-columns: 1fr;
            }
        }
        &.column-3 {
            justify-content: center;
            grid-template-columns: 1fr 1fr 1fr;
            @media screen and (max-width: 1120px) {
                grid-template-columns: 1fr 1fr;
            }
            @media screen and (max-width: 860px) {
                grid-template-columns: 1fr;
            }
        }
        &.column-4 {
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 0.9rem;
            @media screen and (max-width: 1220px) {
                grid-template-columns: 1fr 1fr 1fr;
            }
            @media screen and (max-width: 960px) {
                grid-template-columns: 1fr 1fr;
            }
            @media screen and (max-width: 560px) {
                grid-template-columns: 1fr;
            }
        }
        :deep(.three-bloc-item) {
            width: 100%;
            .b-gradient-blue-100 &,
            .b-gradient-grey-100 & {
                background: var(--white-100) !important;
                color: var(--midnight-blue-700);
            }
        }
    }
</style>
