<template>
    <div class="panel-filter-search-results">
        <SIForm ref="form" @submit="onSubmit">
            <SIFormRow>
                <SITextField
                    class="search"
                    :placeholder="wordings.g_search.placeholder"
                    name="s"
                    icon="search"
                    icon-position="right"
                    icon-color="sunflower-700"
                    :validations="[{ 'min-3': '' }]"
                    :value="values.val.s"
                    @input="onInput"
                />
                <SISelect
                    ref="order"
                    name="order"
                    value="DESC"
                    :items="orderByItems"
                    @input="onInput"
                />
            </SIFormRow>
        </SIForm>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'PanelFilterSearchResults',
        emits: ['submit'],
        data: () => ({
            sIntern: null,
        }),
        computed: {
            ...mapState({
                values: state => state.search.values,
                wordings: state => state.options.options.wordings,
            }),
            orderByItems() {
                const { wordings } = this
                return [
                    {
                        value: 'ASC',
                        text: wordings.g_grid.order_by_desc,
                    },
                    {
                        value: 'DESC',
                        text: wordings.g_grid.order_by_asc,
                    },
                ]
            },
        },
        methods: {
            onInput() {
                this.$refs.form.onSubmit()
            },
            onSubmit($event) {
                this.$emit('submit', $event)
            },
        },
    }
</script>

<style scoped lang="scss">
    .panel-filter-search-results {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 3.2rem;
        .si-form {
            .si-form-row {
                margin: 0;
                &:not(:last-child) {
                    > * {
                        margin-bottom: 3.2rem;
                        @media screen and (max-width: $littleTabletBreakPoint) {
                            margin-bottom: 1rem;
                        }
                    }
                }
                &:not(.start) {
                    align-items: center;
                    justify-content: center;
                }
                > *:not(:first-child) {
                    margin-left: 1.2rem;
                }
                > * {
                    max-width: 100%;
                    overflow: hidden;
                }
                .search {
                    max-width: 20.8rem;
                    width: 100%;
                }
            }
        }
    }
</style>
