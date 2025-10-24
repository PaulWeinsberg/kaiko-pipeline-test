<template>
    <div :class="classNames">
        <SIWys
            v-for="(item, i) in blocks"
            :key="i"
            :content="item.content"
        />
    </div>
</template>
<script>
    import SIWys from '../molecules/SIWys.vue'

    export default {
        name: 'TextBlock',
        components: { SIWys },
        props: {
            blocks: {
                type: Array,
                required: true,
            },
            layout: {
                type: String,
                required: true,
            },
        },
        computed: {
            classNames() {
                return [`grid-multiple-blocs`,`column-${this.layout}`]
            },
        },
    }
</script>

<style scoped lang="scss">
.grid-multiple-blocs {
    flex: 0 0 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 1.2rem;
    width: 100%;
    flex-wrap: wrap;

    // Column 1 layouts
    &.column-1--100 {
        :deep(.si-wys) {
            flex: 0 0 100%;
            justify-content: center;
        }
    }

    &.column-2--50-50 {
        :deep(.si-wys) {
            flex: 0 0 calc(50% - 1.2rem / 2);
            justify-content: center;
            @media screen and (max-width: 920px) {
                flex: 0 0 100%;
            }
        }
    }

    &.column-2--70-30 {
        :deep(.si-wys) {
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
        :deep(.si-wys) {
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
    &.column-3--33-33-33 {
        :deep(.si-wys) {
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
        :deep(.si-wys) {
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
        :deep(.si-wys) {
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
        :deep(.si-wys) {
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
    &.column-4--25-25-25-25 {
        :deep(.si-wys) {
            flex: 0 0 calc(25% - (1.2rem * 3 / 4));
            @media screen and (max-width: 1120px) {
                flex: 0 0 calc(50% - 1.2rem / 2);
            }
            @media screen and (max-width: 860px) {
                flex: 0 0 100%;
            }
        }
    }
}
</style>
