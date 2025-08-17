<template>
    <SISection
        :text-color="content?.background?.text_color"
        :background="content?.background"
        :class="classNames"
    >
        <SIWrapper
            :flex-direction="column ? 'row' : 'column'"
            align-items="revert"
            overflow="visible"
        >
            {{ filterComponent }}
            <div
                v-if="
                    content.title ||
                    content.description ||
                    content.add_cta ||
                    $slots.afterTitle
                "
                class="header"
            >
                <div
                    v-if="
                        content.title || content.description || content.add_cta
                    "
                    class="container"
                >
                    <SIWys
                        v-if="content.title"
                        :content="content.title"
                        :class="[
                            'title',
                            { 'has-description': !!content.description },
                        ]"
                    />
                    <SIWys
                        v-if="content.description"
                        :content="content.description"
                        class="description"
                    />
                    <SILink
                        v-if="content.add_cta && column"
                        :path="content.group_link.link"
                        :title="content.group_link.text"
                        :icon="content.group_link.icon"
                        icon-position="right"
                        :design="content.group_link.design"
                        btn
                    />
                </div>
                <slot name="afterTitle" />
            </div>
            <slot />
        </SIWrapper>
    </SISection>
</template>

<script>
    import SISection from '../atoms/SISection'
    import SIWrapper from '../atoms/SIWrapper'

    export default {
        name: 'SectionEdito',
        components: { SISection, SIWrapper },
        props: {
            content: {
                type: Object,
                required: true,
            },
            filterComponent: {
                type: String,
                required: false,
                default: null,
            },
            column: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            hasFilters() {
                return !!this.$slots.filters
            },
            classNames() {
                const { hasFilters, column } = this
                return [
                    'section-edito',
                    { 'has-filters': hasFilters },
                    { column },
                ]
            },
        },
    }
</script>

<style scoped lang="scss">
    .section-edito {
        .header {
            display: flex;
            align-items: flex-start;
            width: 100%;
            flex-wrap: wrap;
            @include parent-has-class('.column') {
                flex-direction: column;
            }
            @media screen and (max-width: $tabletBreakPoint) {
                flex-direction: column;
            }
            .container {
                display: flex;
                width: 100%;
                margin-bottom: 3.2rem;
                justify-content: space-between;
                flex: 1;
                box-sizing: border-box;
                @include parent-has-class('.column') {
                    padding-right: 1.2rem;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    margin-bottom: 0;
                }
                @media screen and (max-width: $tabletBreakPoint) {
                    flex-direction: column;
                    margin-bottom: 2rem;
                }
                :deep {
                    .si-wys {
                        &.title {
                            margin-right: 1.6rem;
                            width: 100%;
                            .si-title {
                                margin-bottom: 0;
                            }
                            @include parent-has-class('.column') {
                                margin-right: 0;
                                margin-bottom: 1.6rem;
                            }
                            @include parent-has-class(':not(.column)') {
                                &.has-description {
                                    max-width: 18.8rem;
                                }
                            }
                            @media screen and (max-width: $tabletBreakPoint) {
                                margin-right: 0;
                                margin-bottom: 2rem;
                                max-width: 100%;
                            }
                        }
                        &.description {
                            @include parent-has-class('.column') {
                                margin-bottom: 1.6rem;
                            }
                            @include parent-has-class(':not(.column)') {
                                margin-top: 0.15rem;
                            }
                            .si-title {
                                font-size: 1rem;
                                line-height: 1em;
                                font-weight: 500;
                                @media screen and (max-width: $tabletBreakPoint) {
                                    margin-bottom: 2.5rem;
                                }
                            }
                        }
                    }
                    .si-link {
                        margin-top: auto;
                    }
                }
            }
        }
        &.has-filters {
            .header {
                align-items: center;
            }
        }
    }
</style>
