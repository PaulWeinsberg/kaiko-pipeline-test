<template>
    <li class="menu-footer-item">
        <SILink
            link
            :title="item.title"
            :path="item.url"
            icon="c-arrow-right"
            :class="classNames"
        />
        <ul v-if="item.children">
            <MenuFooterItem
                v-for="subItem in item.children"
                :key="subItem.id"
                :item="subItem"
            />
        </ul>
    </li>
</template>

<script>
    export default {
        name: 'MenuFooterItem',
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
        computed: {
            classNames() {
                const { item } = this
                return [{ 'footer-title': item.children }]
            },
        },
    }
</script>

<style scoped lang="scss">
    .menu-footer-item {
        display: flex;
        flex-direction: column;
        &:not(:last-child) {
            margin-bottom: 0.5rem;
        }

        :deep {
            .si-link {
                width: fit-content;
            }

            .si-icon {
                display: none;
            }

            .si-link-title {
                color: var(--black-500);
                font-size: 0.7rem;
                font-weight: 400;
            }

            .link {
                line-height: 1rem;
            }
        }

        .nuxt-link-active {
            :deep {
                .si-icon {
                    display: block;
                }

                .si-link-title {
                    font-weight: 600;
                    color: var(--white-100);
                }
            }
        }

        .footer-title {
            margin-bottom: 0.7rem;
            :deep(.si-link-title) {
                font-weight: 600;
                color: var(--white-100);
                text-transform: uppercase;
            }
        }
    }
</style>
