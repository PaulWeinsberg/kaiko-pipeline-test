<template>
    <div class="grid-search-results">
        <SILoader :show="loading" />
        <ul v-if="items && items.length">
            <CardRedirection
                v-for="(item, i) in items"
                :key="i"
                tag="li"
                :content="item.excerpt"
                :title="item.title"
                :link="item.url"
                :image="item.image"
            />
        </ul>
        <NoResult v-else />
    </div>
</template>

<script>
    import CardRedirection from '../molecules/CardRedirection.vue'
    import NoResult from '../molecules/NoResult.vue'

    export default {
        name: 'GridSearchResults',
        components: { NoResult, CardRedirection },
        props: {
            items: {
                type: Array,
                required: false,
                default: null,
            },
            loading: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
    }
</script>

<style scoped lang="scss">
    .grid-search-results {
        display: flex;
        position: relative;
        width: 100%;
        ul {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
            grid-gap: 3.2rem 1.2rem;
            width: 100%;
            @media screen and (min-width: 621px) {
                .card-redirection {
                    margin-right: 0 !important;
                }
            }
            @media screen and (max-width: $littleTabletBreakPoint) {
                grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
            }
            @media screen and (max-width: 620px) {
                grid-template-columns: 1fr;
                .card-redirection {
                    margin: 0 auto;
                }
            }
        }
    }
</style>
