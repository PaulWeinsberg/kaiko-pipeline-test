<template>
    <div class="panel-filter-sort">
        <SIForm
            ref="form"
            submit-on-change
            @submit="onSubmit"
            @change="onSubmit"
        >
            <SIFormRow>
                <SISelect
                    ref="order"
                    name="order"
                    value="DESC"
                    :items="orderByItems"
                />
            </SIFormRow>
        </SIForm>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import SIForm from '../atoms/SIForm'
    import SIFormRow from '../atoms/SIFormRow'
    import SISelect from '../molecules/SISelect'
    export default {
        name: 'PanelSort',
        components: { SIFormRow, SISelect, SIForm },
        computed: {
            ...mapState({
                wordings: state => state.options.options.wordings,
            }),
            placeholder() {
                const { wordings } = this
                return wordings?.g_grid?.order_by_placeholder ?? null
            },
            orderByItems() {
                const { wordings } = this
                return [
                    {
                        value: 'DESC',
                        text: wordings.g_grid.order_by_desc,
                    },
                    {
                        value: 'ASC',
                        text: wordings.g_grid.order_by_asc,
                    },
                ]
            },
        },
        emits: ['filters:change'],
        methods: {
            onSubmit(e) {
                this.$emit('filters:change', e.val)
            },
        },
    }
</script>

<style scoped lang="scss">
    .panel-filter-sort {
        display: flex;
        min-width: 15rem;
        margin-bottom: 1rem;
        @media screen and (max-width: $tabletBreakPoint) {
            margin: 0 0 1rem 0;
        }
        .si-form {
            .si-form-row {
                margin: 0;
            }
        }
    }

    @media screen and (min-width: $tabletBreakPointMin) {
        * + .panel-filter-sort {
            margin-left: 1rem;
        }
    }
</style>
