<template>
    <div class="datatable-cell">
        <div
            v-if="isColumnActive"
            class="datatable-cell__check"
        >
            <SIIcon
                name="c-check"
                color="sunflower-700"
                size="l"
            />
        </div>
    </div>
</template>

<script>
    import SIIcon from '../atoms/SIIcon'

    export default {
        name: 'DatatableCell',
        components: {
            SIIcon,
        },
        props: {
            row: {
                type: Object,
                required: true,
            },
            column: {
                type: Object,
                required: true,
            },
        },
        computed: {
            isColumnActive() {
                // Check if the column's ID is in the row's columns array
                // The row's columns array contains the column IDs that should have checkmarks
                return this.row.columns?.some(
                    ({ id }) => id === this.column.id
                )
            },
        },
    }
</script>

<style scoped lang="scss">


    .datatable-cell {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &__check {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4caf50; /* Green checkmark color */
            font-size: 1.5rem;
        }
    }
</style>
