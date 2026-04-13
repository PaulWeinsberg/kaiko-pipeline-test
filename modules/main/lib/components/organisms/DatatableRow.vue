<template>
    <div class="datatable-row">
        <!-- Row Name Column (Hardcoded First Column) -->
        <div class="datatable-row__cell datatable-row__cell--name">
            {{ row.name }}
        </div>

        <!-- Data Columns with Check Icons -->
        <DatatableCell
            class="datatable-row__cell"
            v-for="column in columns"
            :key="column.id"
            :row="row"
            :column="column"
        />
    </div>
</template>

<script>
    import DatatableCell from './DatatableCell.vue'

    export default {
        name: 'DatatableRow',
        components: {
            DatatableCell,
        },
        props: {
            row: {
                type: Object,
                required: true,
            },
            columns: {
                type: Array,
                required: true,
                default: () => [],
            },
        },
    }
</script>

<style scoped lang="scss">


    .datatable-row {
        display: flex;
        gap: 0;
        justify-content: stretch;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        background-color: #fff;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: #fafafa;
        }

        &:last-of-type {
            border-bottom: none;
        }

        &__cell {
            padding: 1.2rem;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            &--name {
                justify-content: flex-start;
                font-weight: 600;
                font-size: 1rem;
            }
        }

        @media screen and (max-width: $tabletBreakPoint) {
            flex-direction: column;
            gap: 0.8rem;
            padding: 0.8rem;

            &__cell {
                padding: 0.4rem 0;
                justify-content: flex-start;
            }

            &__cell--name {
                font-size: 0.9rem;
            }
        }
    }
</style>
