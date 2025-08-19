<template>
    <div class="panel-filter-pricing">
        <SIForm
            ref="form"
            submit-on-change
            @submit="onSubmit"
            @change="onSubmit"
        >
            <SIFormRow>
                <SIRadio name="option" :items="items" />
            </SIFormRow>
        </SIForm>
    </div>
</template>

<script>
    import SIForm from '../atoms/SIForm'
    import SIFormRow from '../atoms/SIFormRow'
    import SIRadio from '../molecules/SIRadio'
    export default {
        name: 'PanelFilterPricing',
        components: { SIFormRow, SIRadio, SIForm },
        props: {
            items: {
                type: Array,
                required: false,
                default: null,
            },
        },
        emits: ['filters:change'],
        methods: {
            onSubmit(e) {
                this.$emit('filters:change', e.val.option.value)
            },
        },
    }
</script>

<style scoped lang="scss">
    .panel-filter-pricing {
        width: 100%;
        :deep(.si-form) {
            width: 100%;
            align-items: center;
            .si-form-row {
                &,
                .si-form-group {
                    display: flex;
                    justify-content: center;
                    fieldset {
                        display: flex;
                        flex-wrap: wrap;
                        width: fit-content;
                        margin: auto;
                        @media screen and (max-width: $littleMobileBreakPoint) {
                            flex-direction: column;
                        }
                    }
                }
            }
        }
    }
</style>
