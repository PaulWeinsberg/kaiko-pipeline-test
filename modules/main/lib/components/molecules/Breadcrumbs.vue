<template>
    <ol v-if="show" class="breadcrumb">
        <li v-for="(item, position) in itemsIntern" :key="position">
            <SILink
                :path="position === itemsIntern.length - 1 ? '' : item.url"
                icon="c-caret-right"
            >
                <span itemprop="name" class="name si-link-title">
                    {{ item.label }}
                </span>
            </SILink>
        </li>
    </ol>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'Breadcrumbs',
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
        computed: {
            ...mapState({
                wordings: state => state.options.options.wordings,
            }),
            isHome() {
                const { $route } = this
                return $route.path === '/'
            },
            show() {
                const { itemsIntern, isHome } = this
                return !isHome && !!itemsIntern.length
            },
            itemsIntern() {
                const { items, $config, wordings } = this
                return [
                    {
                        label: wordings.g_breadcrumb.home,
                        url: $config.baseUrl,
                    },
                    ...items,
                ]
            },
        },
        mounted() {
            this.sendBreadcrumbsHeight()
            window.addEventListener('resize', this.sendBreadcrumbsHeight)
        },
        destroyed() {
            window.removeEventListener('resize', this.sendBreadcrumbsHeight)
        },
        methods: {
            sendBreadcrumbsHeight() {
                const { $store, $el } = this
                $store.commit('general/SET_BREADCRUMB_HEIGHT', $el.clientHeight)
            },
        },
    }
</script>

<style scoped lang="scss">
    .breadcrumb {
        display: flex;
        position: absolute;
        left: 50%;
        top: 0;
        width: 100%;
        max-width: 67rem;
        flex-wrap: wrap;
        margin: 0.5rem 0;
        transform: translateX(-50%);
        padding: 0 1rem;
        box-sizing: border-box;
        z-index: 10;
        :deep(li) {
            display: flex;
            .si-link {
                display: flex;
                flex-direction: row;
                font-size: 0.7rem;
                line-height: 140%;
                opacity: 0.56;
                &:hover {
                    .si-link-title {
                        text-decoration: underline;
                    }
                }
                .si-icon {
                    font-size: 0.5rem;
                    margin: 0 0.2rem;
                }
            }
            &:first-child {
                .si-link {
                    .si-icon {
                        display: none;
                    }
                }
            }
            &:last-child {
                .si-link {
                    opacity: 1;
                    .si-link-title {
                        font-weight: bold;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>
