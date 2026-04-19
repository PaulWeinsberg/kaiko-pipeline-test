<template>
    <div v-if="filteredRows.length > 0" class="datatable-body__table">
        <!-- Header Row -->
        <div class="datatable-body__row datatable-body__row--header">
            <div class="datatable-body__cell datatable-body__cell--header feature">
                Feature
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
            :blocks="row.blocks"
            :active-tab="activeTab"
        />
    </div>

    <!-- Empty State -->
    <div v-else class="datatable-body__empty">
        No data available for the selected tab.
    </div>
</template>

<script>
    import DatatableRow from './DatatableRow.vue'

    export default {
        name: 'DatatableBody',
        components: {
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
            activeTab: {
                type: [Number, String],
                required: true,
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

        &__table {
            width: 100%;
            border-radius: .5rem;
            overflow: hidden;
            border: 1px solid var(--black-300);
        }

        &__row {
            display: flex;
            flex-wrap: nowrap;
            align-items: stretch;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

            &--header {
                background-color: #f5f5f5;
                font-weight: 600;
                font-size: 0.8rem;
            }


            &:last-of-type {
                border-bottom: none;
            }
        }

        &__cell {
            padding: .8rem 1.2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;

            &--header {
                text-align: center;
                background-color: #f9f9f9;

                &.feature {
                    text-align: left;
                }
            }

            &:first-child {
                flex: 0 0 200px;
                font-weight: 600;
                color: var(--black-500);
            }
        }

        &__column-name {
            font-size: .8rem;
            font-weight: 500;
        }

        &__column-description {
            font-size: 0.7rem;
            color: #666;
            font-weight: 400;
        }

        &__empty {
            padding: 3.2rem;
            text-align: center;
            color: #666;
            font-size: 1rem;
        }
    }
</style>
