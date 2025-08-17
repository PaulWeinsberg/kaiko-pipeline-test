<template>
    <SectionEdito :content="content" :class="classNames" :column="isColumn">
        <ul class="list-info-icon">
            <InfosIconItem
                v-for="(item, i) in content.informations_pictograms"
                :key="i"
                :icon="item.icon"
                :color="item.color_pictogram"
                :text="item.text"
                :placement="content.pictogram_placement.placement_desktop"
            />
        </ul>
    </SectionEdito>
</template>
<script>
    import InfosIconItem from '../molecules/InfosIconItem.vue'
    import SectionEdito from './SectionEdito.vue'

    export default {
        name: 'ContainerInfosIcons',
        components: { SectionEdito, InfosIconItem },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        computed: {
            classNames() {
                const { pictogram_placement, informations_pictograms } =
                    this.content
                const { placement_desktop, placement_mobile } =
                    pictogram_placement
                return [
                    'container-infos-icons',
                    `list-${placement_desktop}`,
                    `mobile-${placement_mobile}`,
                    { 'bloc-three': informations_pictograms.length === 3 },
                ]
            },
            isColumn() {
                const { placement_desktop } = this.content.pictogram_placement
                return placement_desktop !== 'next-two'
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-infos-icons {
        :deep {
            .si-wrapper {
                justify-content: space-between !important;
                @media screen and (max-width: $tabletBreakPoint) {
                    flex-direction: column !important;
                }
                @include parent-has-class('.list-next-two') {
                    display: flex;
                }
                @include parent-has-class('.list-next') {
                    grid-template-areas: 'content icons icons' 'cta icons icons';
                    grid-template-columns: repeat(3, 1fr);
                }
                @include parent-has-class('.list-below') {
                    grid-template-areas: 'content icons' 'cta icons';
                    grid-template-columns: repeat(2, 1fr);
                }
                @media screen and (min-width: $tabletBreakPointMin) {
                    display: grid;
                    grid-column-gap: 1.2rem;
                }
                @include parent-has-class(':not(.list-next-two)') {
                    .header {
                        height: fit-content;
                    }
                    .si-link {
                        height: fit-content;
                        margin-top: auto;

                        @media screen and (max-width: $tabletBreakPoint) {
                            margin-bottom: 2rem;
                        }
                    }
                }
                .header {
                    grid-area: content;
                    @media screen and (min-width: $tabletBreakPointMin) {
                        margin-right: 1.2rem;
                    }
                    @include parent-has-class('.list-below') {
                        @media screen and (min-width: $tabletBreakPointMin) {
                            width: 31.4rem;
                        }
                    }

                    & + .si-link.btn {
                        grid-area: cta;
                        width: fit-content;
                        @include parent-has-class('.list-next-two') {
                            order: 2;
                            margin: 2rem auto 0;
                            @media screen and (min-width: $tabletBreakPointMin) {
                                margin-left: calc(20.4rem + 1.6rem);
                                margin-top: 3.2rem;
                            }
                        }
                    }
                }
                .list-info-icon {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    height: fit-content;
                    grid-area: icons;
                    @include parent-has-class(':not(.list-next)') {
                        flex-direction: column;
                        width: auto;
                    }
                    @include parent-has-class('.list-next-two') {
                        order: 1;
                        display: grid;
                        grid-gap: 1.2rem 6rem;
                        @media screen and (min-width: $littleTabletBreakPointMin) {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        @media screen and (min-width: $tabletBreakPointMin) {
                            width: calc(100% - 20.4rem);
                            margin-left: auto;
                        }
                    }
                    @media screen and (max-width: $mobileBreakPoint) {
                        flex-direction: column;
                    }
                    @include parent-has-class('.list-next') {
                        @include parent-has-class(':not(.bloc-three)') {
                            display: grid;
                            grid-template-columns: repeat(4, 1fr);
                            grid-gap: 2rem 1.2rem;
                            @media screen and (max-width: $littleTabletBreakPoint) {
                                grid-template-columns: repeat(2, 1fr);
                            }
                            @include parent-has-class('.mobile-one-column') {
                                @media screen and (max-width: $mobileBreakPoint) {
                                    grid-template-columns: 1fr;
                                }
                            }
                        }
                    }
                    .infos-icon-item {
                        flex: 1;
                        @include parent-has-class('.list-next') {
                            @include parent-has-class('.bloc-three') {
                                &:not(:last-child) {
                                    margin-right: 1rem;
                                    @media screen and (max-width: $mobileBreakPoint) {
                                        margin-right: 0;
                                        margin-bottom: 1.25rem;
                                    }
                                }
                            }
                        }
                        @include parent-has-class('.list-below') {
                            margin-bottom: 2rem;
                            &:last-of-type {
                                margin-bottom: 0;
                            }
                        }
                        .si-wys {
                            ul {
                                width: auto;
                            }
                        }
                        &.item-below {
                            align-items: center;
                        }
                    }
                }
            }
        }
    }
</style>
