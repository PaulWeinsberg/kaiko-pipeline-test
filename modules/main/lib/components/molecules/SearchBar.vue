<template>
    <SIForm ref="form" class="search-bar" @submit="onSubmit">
        <SIFormRow>
            <SITextField
                class="search"
                :placeholder="wordings.g_search.placeholder"
                name="s"
                :value="values.val.s"
                icon="search"
                icon-position="right"
                icon-color="sunflower-700"
                @click:icon:append="onClickIcon"
            />
        </SIFormRow>
    </SIForm>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'SearchBar',
        props: {
            baseUrl: {
                type: String,
                required: false,
                default: '',
            },
        },
        computed: {
            ...mapState({
                values: state => state.search.values,
                wordings: state => state.options.options.wordings,
            }),
        },
        methods: {
            onClickIcon() {
                this.$refs.form.onSubmit()
            },
            onSubmit(e) {
                const { baseUrl, $store } = this
                $store.dispatch('search/setValues', { val: e, baseUrl })
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-form.search-bar {
        width: 10rem;
        margin-right: 1.6rem;
        flex-shrink: 0;
        @media screen and (max-width: $menuBreakpoint) {
            order: 1;
            margin: 1.2rem 0 0 0;
            width: 100%;
            border-bottom: 1px solid var(--black-400);
            padding-bottom: 1.2rem;
        }
        .si-form-row {
            margin: 0;
            :deep(.si-icon) {
                cursor: pointer;
            }
        }
    }
</style>
