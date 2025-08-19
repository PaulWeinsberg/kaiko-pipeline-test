<template>
    <SIMain
        v-si-background-color="'gradient-grey-100'"
        class="tpl-search-results"
    >
        <SIWrapper flex-direction="column">
            <SIWys :content="wordings.g_search.title" />
            <PanelFilterSearchResults @submit="setValues" />
            <GridSearchResults :loading="loading" :items="itemsIntern" />
        </SIWrapper>
    </SIMain>
</template>

<script>
    import { mapState } from 'vuex'
    import SIMain from '../atoms/SIMain.vue'
    import SITitle from '../atoms/SITitle.vue'
    import SIWrapper from '../atoms/SIWrapper.vue'
    import PanelFilterSearchResults from '../molecules/PanelFilterSearchResults.vue'
    import SIWys from '../molecules/SIWys.vue'
    import GridSearchResults from '../organisms/GridSearchResults.vue'

    export default {
        name: 'TplSearchResults',
        components: {
            SIWys,
            PanelFilterSearchResults,
            SIWrapper,
            GridSearchResults,
            SIMain,
        },
        props: {
            items: {
                type: Array,
                required: false,
                default: null,
            },
        },
        data: () => ({
            itemsTmp: null,
        }),
        computed: {
            ...mapState({
                values: state => state.search.values,
                loading: state => state.search.loading,
                wordings: state => state.options.options.wordings,
            }),
            itemsIntern: {
                get() {
                    const { items, itemsTmp } = this
                    return itemsTmp || items
                },
                set(nV) {
                    this.itemsTmp = nV
                },
            },
        },
        watch: {
            values(nV) {
                this.onSubmit(nV)
            },
        },
        created() {
            this.$store.commit('search/SET_SEARCH', this.$route.query.s || '')
        },
        methods: {
            setValues(e) {
                this.$store.dispatch('search/setValues', { val: e })
            },
            async onSubmit(e) {
                const { $api } = this
                if (!e.isValid) return

                this.$store.commit('search/SET_LOADING', true)
                try {
                    const { data } = await $api.get('search', {
                        params: {
                            orderby: 'post_date',
                            ...e.val,
                        },
                    })

                    this.$store.commit('search/SET_LOADING', false)
                    this.itemsIntern = data.list || []
                } catch (err) {
                    this.$store.commit(
                        'search/SET_LOADING',
                        err.message === 'Canceled'
                    )
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .tpl-search-results {
        .si-wrapper {
            .si-wys {
                margin-bottom: 3rem;
            }
        }
    }
</style>
