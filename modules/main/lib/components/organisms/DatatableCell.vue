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
        <div
            v-else
            class="datatable-cell__placeholder"
        >
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
        &, * { box-sizing: border-box; }

        &__check {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4caf50; /* Green checkmark color */
            font-size: 1.5rem;
        }
        &__placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            align-items: center;
            height: 1rem;

            &::before {
                content: '';
                width: .6rem;
                height: 2px;
                background-color: var(--black-400);
                border-radius: 2px;
            }
        }
    }
</style>