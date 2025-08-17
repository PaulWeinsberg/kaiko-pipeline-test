<template>
    <li class="mega-menu-footer-item">
        <SILink :path="path">
            <p class="title">
                <span>{{ title }}</span>
                <SIIcon name="c-arrow-right" />
            </p>
            <span v-if="excerpt" class="excerpt">{{ excerpt }}</span>
        </SILink>
    </li>
</template>

<script>
    import SILink from './SILink.vue'

    export default {
        name: 'MegaMenuFooterItem',
        components: { SILink },
        props: {
            title: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            excerpt: {
                type: String,
                required: false,
                default: null,
            },
        },
    }
</script>

<style scoped lang="scss">
    .mega-menu-footer-item {
        display: flex;
        max-width: 16.5rem;
        .si-link {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-transform: uppercase;
            padding: 1.8rem 1.2rem;
            transition: all 0.3s var(--cubicBezier);
            @media screen and (max-width: $mobileBreakPoint) {
                padding: 2rem 0.6rem;
            }
            .title {
                span:not(.si-icon) {
                    @extend %underlineAnimated;
                }
            }
            &:hover {
                .title {
                    span:not(.si-icon) {
                        @extend %underlineAnimatedHover;
                    }
                }
            }
            > * {
                transition: all 0.3s var(--cubicBezier);
                font-weight: 700;
            }
            .title {
                display: flex;
                font-size: 1rem;
                letter-spacing: 0.16em;
                color: var(--white-100);
                .si-icon {
                    font-size: 1.3rem;
                    font-weight: 400;
                    transform: rotate(-45deg);
                    margin-left: 1.25rem;
                }
            }
            .excerpt {
                font-size: 0.75rem;
                color: var(--electric-blue-300);
                margin-top: 0.7rem;
                line-height: 140%;
            }
        }
    }
</style>
