<template>
    <SIWrapper
        flex-direction="column"
        class="datatable-body"
    >
        <div v-if="filteredRows.length > 0" class="datatable-body__table">
            <!-- Header Row -->
            <div class="datatable-body__row datatable-body__row--header">
                <div class="datatable-body__cell datatable-body__cell--header">
                    Row Name
                </div>
                <div
                    v-for="column in columns"
                    :key="column.id"
                    class="datatable-body__cell datatable-body__cell--header"
                >
                    <span class="datatable-body__column-name">{{ column.name }}</span>
                    <span v-if="column.description" class="datatable-body__column-description">
                        {{ column.description }}
                    </span>
                </div>
            </div>

            <!-- Data Rows -->
            <DatatableRow
                v-for="row in filteredRows"
                :key="row.id"
                :row="row"
                :columns="columns"
            />
        </div>

        <!-- Empty State -->
        <div v-else class="datatable-body__empty">
            No data available for the selected tab.
        </div>
    </SIWrapper>
</template>

<script>
    import SIWrapper from '../atoms/SIWrapper'
    import DatatableRow from './DatatableRow.vue'

    export default {
        name: 'DatatableBody',
        components: {
            SIWrapper,
            DatatableRow,
        },
        props: {
            rows: {
                type: Array,
                required: true,
                default: () => [],
            },
            columns: {
                type: Array,
                required: true,
                default: () => [],
            },
        },
        computed: {
            filteredRows() {
                return this.rows
            },
        },
    }
</script>

<style scoped lang="scss">


    .datatable-body {
        width: 100%;

        &__table {
            width: 100%;
        }

        &__row {
            display: flex;
            flex-wrap: nowrap;
            align-items: stretch;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

            &--header {
                background-color: #f5f5f5;
                font-weight: 600;
                text-transform: uppercase;
                font-size: 0.85rem;
                letter-spacing: 0.05em;
            }

            &:last-of-type {
                border-bottom: none;
            }
        }

        &__cell {
            padding: 1.2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;

            &--header {
                background-color: #f9f9f9;
                border-bottom: 2px solid rgba(0, 0, 0, 0.1);
            }

            &:first-child {
                font-weight: 600;
                border-right: 1px solid rgba(0, 0, 0, 0.1);
            }
        }

        &__column-name {
            font-size: 1rem;
            font-weight: 500;
            margin-bottom: 0.25rem;
        }

        &__column-description {
            font-size: 0.85rem;
            color: #666;
            font-weight: 400;
        }

        &__empty {
            padding: 3.2rem;
            text-align: center;
            color: #666;
            font-size: 1rem;
        }

        @media screen and (max-width: $tabletBreakPoint) {
            &__row {
                flex-direction: column;
                gap: 0.8rem;
                padding: 0.8rem;
                background-color: #fff;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }

            &__cell {
                padding: 0.4rem 0;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                border-right: none;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }

            &__cell--header {
                display: none;
            }

            &__column-name {
                margin-bottom: 0;
            }

            &__column-description {
                font-size: 0.75rem;
            }
        }
    }
</style>
