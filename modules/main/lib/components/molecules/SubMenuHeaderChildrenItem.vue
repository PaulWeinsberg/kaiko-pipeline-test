<template>
    <li class="sub-menu-header-children-item">
        <SILink :title="title" :path="path" :icon="icon" :target="target">
            <p v-if="excerpt" class="excerpt">{{ excerpt }}</p>
        </SILink>
    </li>
</template>

<script>
    export default {
        name: 'SubMenuHeaderChildrenItem',
        props: {
            title: {
                type: String,
                required: true,
            },
            path: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                required: false,
                default: null,
            },
            target: {
                type: String,
                required: false,
                default: null,
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
    .sub-menu-header-children-item {
        display: flex;
        .si-link {
            flex-wrap: wrap;
            align-items: flex-start;
            &.nuxt-link-active {
                :deep(.si-link-title),
                :deep(.si-icon) {
                    color: var(--sunflower-700) !important;
                }
            }
            :deep(.si-link-title) {
                font-weight: 600;
                font-size: 0.8rem;
                text-transform: uppercase;
            }
            :deep(.si-icon) {
                font-size: 0.9rem;
                margin-right: 0.4rem;
                margin-top: 0.1rem;
            }
            .excerpt {
                width: 100%;
            }
            @media screen and (max-width: $menuBreakpoint) {
                margin: 0;
                padding: 0.75rem 0;
                &:not(:first-child) {
                    border-top: 1px solid var(--black-400);
                }
            }
        }
    }
</style>
