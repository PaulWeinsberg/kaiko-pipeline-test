<template>
    <SectionEdito :content="content" :class="classNames">
        <template v-if="datatable.fields.tabs.length" #afterTitle>
            <DatatableTabs
                :tabs="datatable.fields.tabs"
                :active-tab="activeTab"
                @tab-change="handleTabChange"
            />
        </template>
        <DatatableBody
            :rows="filteredRows"
            :columns="filteredColumns"
            :active-tab="activeTab"
        />
    </SectionEdito>
</template>

<script>
    import SectionEdito from './SectionEdito.vue'
    import DatatableTabs from './DatatableTabs.vue'
    import DatatableBody from './DatatableBody.vue'

    export default {
        name: 'ContainerDatatable',
        components: {
            SectionEdito,
            DatatableTabs,
            DatatableBody,
        },
        props: {
            content: {
                type: Object,
                required: true,
            },
            author: {
                type: Boolean,
                required: false,
                default: null,
            },
        },
        data: () => ({
            activeTab: null,
        }),
        computed: {
            datatable() {
                const { content } = this
                return content.datatable || {}
            },
            classNames() {
                return [
                    'container-datatable',
                ]
            },
            filteredRows() {
                if (!this.activeTab) return []
                return this.datatable.fields.rows.filter(row =>
                    row.tabs?.some(tab => tab.id === this.activeTab)
                )
            },
            filteredColumns() {
                if (!this.activeTab) return []
                return this.datatable.fields.columns.filter(column =>
                    column.tabs?.some(tab => tab.id === this.activeTab)
                )
            },
        },
        watch: {
            'datatable.fields.tabs': {
                immediate: true,
                handler(newTabs) {
                    if (newTabs && newTabs.length > 0) {
                        this.activeTab = newTabs[0].id
                    }
                },
            },
        },
        methods: {
            handleTabChange(tabId) {
                this.activeTab = tabId
            },
        },
    }
</script>

<style scoped lang="scss">


    .container-datatable {
        :deep(.datatable-body__scroller) {
            color: var(--midnight-blue-700);
        }
        :deep(.si-wrapper) {
            align-items: center;
        }
    }
</style>
