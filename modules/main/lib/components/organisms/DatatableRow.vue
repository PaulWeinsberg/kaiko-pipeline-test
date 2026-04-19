<template>
    <div
        class="datatable-row"
        :class="{ 'datatable-row--toggleable': isToggleable, 'datatable-row--expanded': isExpanded }"
    >

        <div class="datatable-row__cells" @click="handleRowClick">
            <!-- Row Name Column (Hardcoded First Column) -->
            <div class="datatable-row__cell datatable-row__cell--name">
                <span class="datatable-row__name">{{ row.name }}</span>
                <div class="datatable-row__arrow-wrapper">
                    <SIIcon
                        v-if="isToggleable"
                        class="datatable-row__toggle-arrow"
                        name="c-caret-right"
                        :class="{ 'datatable-row__toggle-arrow--expanded': isExpanded }"
                        size="xxs"
                    />
                </div>
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

        <!-- Blocks Section (Toggleable) -->
        <div v-if="isToggleable" class="datatable-row__toggle-wrapper" :class="{ 'datatable-row__toggle-wrapper--expanded': isExpanded }">
            <SIWys class="content" v-if="row.content" :content="row.content">

            </SIWys>
            <div class="blocks">
                <DatatableRowBlock
                    v-for="block in blocks"
                    :key="block.id"
                    :block="block"
                    :active-tab="activeTab"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import DatatableCell from './DatatableCell.vue'
    import DatatableRowBlock from './DatatableRowBlock.vue'
    import SIIcon from '../atoms/SIIcon.vue'
    import SIWys from '../molecules/SIWys.vue';

    export default {
        name: 'DatatableRow',
        components: {
            DatatableCell,
            DatatableRowBlock,
            SIIcon,
            SIWys,
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
                isExpanded: false,
            }
        },
        computed: {
            isToggleable() {
                return this.hasActiveBlocks || Boolean(this.row.content?.length)
            },

            hasActiveBlocks() {
                return this.blocks.some(block => {
                    if (!block.tabs || !Array.isArray(block.tabs)) {
                        return false
                    }
                    return block.tabs.some(tab => tab.term_id === this.activeTab)
                });
            }
        },
        methods: {
            handleRowClick() {
                if (this.isToggleable) {
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
            .datatable-row__cells {
                cursor: pointer;
            }

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
                position: relative;
                justify-content: flex-start;
                flex: 0 0 200px;
                font-weight: 400;
                font-size: .8rem;
                padding-right: 2rem;
            }
        }

        &__arrow-wrapper {
            position: absolute;
            top: 50%;
            right: 1.2rem;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
        }

        &__toggle-arrow {
            display: inline-block;
            font-size: 0.7rem;
            color: var(--black-500);
            transform: rotate(90deg);
            transition: transform 0.2s ease;
            margin-left: auto;

            &--expanded {
                transform: rotate(-90deg);
                color: var(--sunflower-700);
            }
        }

        &__name {
            display: inline-block;
        }

        &__toggle-wrapper {
            display: none;
            background-color: #f9f9f9;
            border-top: 1px solid rgba(0, 0, 0, 0.05);

            &--expanded {
                display: block;
                padding: 1.2rem;
            }

            .content {
                margin-bottom: 1rem;
            }

            .blocks {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 0.8rem;
            }
        }
    }
</style>
