<template>
    <div
        class="datatable-row"
        :class="{ 'datatable-row--toggleable': hasActiveBlocks, 'datatable-row--expanded': isExpanded }"
        @click="handleRowClick"
    >

        <div class="datatable-row__cells">
            <!-- Row Name Column (Hardcoded First Column) -->
            <div class="datatable-row__cell datatable-row__cell--name">
                <span class="datatable-row__name">{{ row.name }}</span>
            </div>

            <!-- Data Columns with Check Icons -->
            <DatatableCell
                class="datatable-row__cell"
                v-for="column in columns"
                :key="column.id"
                :row="row"
                :column="column"
            />

            <div class="datatable-row__toggle-wrapper">
                <SIIcon
                    v-if="hasActiveBlocks"
                    class="datatable-row__toggle-arrow"
                    name="c-caret-right"
                    :class="{ 'datatable-row__toggle-arrow--expanded': isExpanded }"
                    size="s"
                />
            </div>
        </div>

        <!-- Blocks Section (Toggleable) -->
        <div v-if="hasActiveBlocks" class="datatable-row__blocks-wrapper" :class="{ 'datatable-row__blocks-wrapper--expanded': isExpanded }">
            <DatatableRowBlock
                v-for="block in blocks"
                :key="block.id"
                :block="block"
                :active-tab="activeTab"
            />
        </div>
    </div>
</template>

<script>
    import DatatableCell from './DatatableCell.vue'
    import DatatableRowBlock from './DatatableRowBlock.vue'
    import SIIcon from '../atoms/SIIcon.vue'

    export default {
        name: 'DatatableRow',
        components: {
            DatatableCell,
            DatatableRowBlock,
            SIIcon,
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
            blocks: {
                type: Array,
                required: false,
                default: () => [],
            },
            activeTab: {
                type: [Number, String],
                required: true,
            },
        },
        data() {
            return {
                isExpanded: true,
            }
        },
        computed: {
            hasActiveBlocks() {
                // A row is toggleable if it has at least one active block for the current tab
                if (!this.blocks || !Array.isArray(this.blocks)) {
                    return false
                }
                return this.blocks.some(block => {
                    if (!block.tabs || !Array.isArray(block.tabs)) {
                        return false
                    }
                    return block.tabs.some(tab => tab.term_id === this.activeTab)
                })
            },
        },
        methods: {
            handleRowClick() {
                if (this.hasActiveBlocks) {
                    this.isExpanded = !this.isExpanded
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .datatable-row {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        background-color: #fff;
        transition: background-color 0.2s ease;
        cursor: default;

        &--toggleable {
            cursor: pointer;

            &:hover {
                background-color: #f0f0f0;
            }
        }

        &:last-of-type {
            border-bottom: none;
        }

        &__cells {
            position: relative;
            display: flex;
            gap: 0;
            justify-content: stretch;
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

        &__toggle-wrapper {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 1.2rem;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }

        &__toggle-arrow {
            display: inline-block;
            font-size: 0.7rem;
            color: #666;
            transition: transform 0.2s ease;
            margin-left: auto;

            &--expanded {
                transform: rotate(90deg);
            }
        }

        &__name {
            display: inline-block;
        }

        &__blocks-wrapper {
            display: none;
            background-color: #f9f9f9;
            border-top: 1px solid rgba(0, 0, 0, 0.05);

            &--expanded {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 0.8rem;
                padding: 1.2rem;
                margin-top: 0.8rem;
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
