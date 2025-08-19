<template>
    <SISection
        :text-color="background.text_color"
        :class="classNames"
        :background="background"
        :lazy-load="false"
    >
        <Breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
        <SIWrapper
            ref="wrapper"
            name="hero"
            :flex-direction="isRow ? 'row' : 'column'"
            overflow="visible"
        >
            <SIWys v-if="content" class="content" :content="content" />
            <slot />
        </SIWrapper>
    </SISection>
</template>

<script>
    import { gsap } from 'gsap'
    import { mapState } from 'vuex'
    import Breadcrumbs from '../molecules/Breadcrumbs.vue'

    export default {
        name: 'HeroBase',
        components: { Breadcrumbs },
        props: {
            isRow: {
                type: Boolean,
                required: false,
                default: false,
            },
            isSmall: {
                type: Boolean,
                required: false,
                default: false,
            },
            content: {
                type: String,
                required: true,
            },
            background: {
                type: Object,
                required: true,
            },
            breadcrumbs: {
                type: Array,
                required: false,
                default: null,
            },
        },
        computed: {
            ...mapState({
                breadcrumbHeight: state => state.general.breadcrumbHeight,
            }),
            classNames() {
                const { isSmall, isRow } = this
                return ['hero', { small: isSmall }, { row: isRow }]
            },
        },
        watch: {
            breadcrumbHeight() {
                this.setWrapperPadding()
            },
        },
        methods: {
            /**
             * Permet de décaler le header pour ne pas qu'il mange sur le breadcrumb
             */
            setWrapperPadding() {
                const { breadcrumbHeight, $refs } = this
                const wrapper = $refs.wrapper.$el
                const padding = parseFloat(getComputedStyle(wrapper).paddingTop)
                const isBigger = breadcrumbHeight >= padding

                gsap.set(wrapper, {
                    marginTop: isBigger ? breadcrumbHeight - padding + 20 : 0,
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .hero {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        z-index: 5;
        :deep(.si-section-background-image) {
            img {
                object-position: left;
            }
        }
        .si-wrapper {
            @include parent-has-class('.small') {
                max-width: 60rem;
            }
            @media screen and (max-width: $littleTabletBreakPoint) {
                flex-direction: column !important;
            }

            @include parent-has-class(':not(.row)') {
                :deep(> * + *) {
                    margin-top: 1.7rem;
                }
            }
        }
        .si-wys {
            &.content {
                max-width: 42.8rem;
                @media screen and (min-width: $littleTabletBreakPointMin) {
                    @include parent-has-class('.row') {
                        max-width: 27rem;
                    }
                }
                :deep(p) {
                    font-weight: 500;
                }
            }
        }
    }
</style>
