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
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 1.2rem;
    width: 100%;
    flex-wrap: wrap;

    // Column 2 layouts
    &.column-2--50-50,
    &.column-2 { // database legacy fallback
        :deep(.three-bloc-item) {
            flex: 0 0 calc(50% - 1.2rem / 2);
            justify-content: center;
            @media screen and (max-width: 920px) {
                flex: 0 0 100%;
            }
        }
    }

    &.column-2--70-30 {
        :deep(.three-bloc-item) {
            flex: 0 0 calc(70% - 1.2rem / 2);
            justify-content: center;
            &:nth-child(4n-1),
            &:nth-child(4n-2) {
                flex: 0 0 calc(30% - 1.2rem / 2);
            }
            @media screen and (max-width: 920px) {
                flex: 0 0 100%;
                &:nth-child(4n-1),
                &:nth-child(4n-2) {
                    flex: 0 0 100%;
                }
            }
        }

    }

    &.column-2--30-70 {
        :deep(.three-bloc-item) {
            flex: 0 0 calc(30% - 1.2rem / 2);
            justify-content: center;
            &:nth-child(4n-1),
            &:nth-child(4n-2) {
                flex: 0 0 calc(70% - 1.2rem / 2);
            }
            @media screen and (max-width: 920px) {
                flex: 0 0 100%;
                &:nth-child(4n-1),
                &:nth-child(4n-2) {
                    flex: 0 0 100%;
                }
            }
        }
    }

    // Column 3 layouts
    &.column-3--33-33-33,
    &.column-3 { // database legacy fallback
        :deep(.three-bloc-item) {
            flex: 0 0 calc(33% - (1.2rem * 2) / 3);
            justify-content: center;
            @media screen and (max-width: 1120px) {
                flex: 0 0 calc(50% - 1.2rem / 2);
            }
            @media screen and (max-width: 860px) {
                flex: 0 0 100%;
            }
        }
    }

    &.column-3--50-25-25 {
        :deep(.three-bloc-item) {
            flex: 0 0 calc(25% - (1.2rem * 2 / 4) - .3rem);
            justify-content: center;
            &:nth-child(6n),
            &:nth-child(6n-5) {
                flex: 0 0 calc((25% - (1.2rem * 2 / 4)) * 2 + .6rem);
            }
            @media screen and (max-width: 1120px) {
                flex: 0 0 calc(50% - 1.2rem / 2);
                &:nth-child(6n),
                &:nth-child(6n-5) {
                    flex: 0 0 calc(50% - 1.2rem / 2);
                }
            }
            @media screen and (max-width: 860px) {
                flex: 0 0 100%;
                &:nth-child(6n),
                &:nth-child(6n-5) {
                    flex: 0 0 100%;
                }
            }
        }
    }

    &.column-3--25-50-25 {
        :deep(.three-bloc-item) {
            flex: 0 0 calc(25% - (1.2rem * 2 / 3));
            justify-content: center;
            &:nth-child(3n-1) {
                flex: 0 0 calc(50% - (1.2rem * 2 / 3));
            }
            @media screen and (max-width: 1120px) {
                flex: 0 0 calc(50% - 1.2rem / 2);
                &:nth-child(3n-1) {
                    flex: 0 0 calc(50% - 1.2rem / 2);
                }
            }
            @media screen and (max-width: 860px) {
                flex: 0 0 100%;
                &:nth-child(3n-1) {
                    flex: 0 0 100%;
                }
            }
        }
    }

    &.column-3--25-25-50 {
        :deep(.three-bloc-item) {
            flex: 0 0 calc(25% - (1.2rem * 2 / 4) - .3rem);
            justify-content: center;
            &:nth-child(6n-2),
            &:nth-child(6n-3) {
                flex: 0 0 calc((25% - (1.2rem * 2 / 4)) * 2 + .6rem);
            }
            @media screen and (max-width: 1120px) {
                flex: 0 0 calc(50% - 1.2rem / 2);
                &:nth-child(6n-2),
                &:nth-child(6n-3) {
                    flex: 0 0 calc(50% - 1.2rem / 2);
                }
            }
            @media screen and (max-width: 860px) {
                flex: 0 0 100%;
                &:nth-child(6n-2),
                &:nth-child(6n-3) {
                    flex: 0 0 100%;
                }
            }
        }
    }

    // Column 4 layouts
    &.column-4--25-25-25-25,
    &.column-4 { // database legacy fallback
        :deep(.three-bloc-item) {
            flex: 0 0 calc(25% - (1.2rem * 3 / 4));
            @media screen and (max-width: 1120px) {
                flex: 0 0 calc(50% - 1.2rem / 2);
            }
            @media screen and (max-width: 860px) {
                flex: 0 0 100%;
            }
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