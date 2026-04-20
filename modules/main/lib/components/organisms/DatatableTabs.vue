<template>
    <div class="datatable-tabs">
        <SILink
            v-for="tab in tabs"
            :key="tab.id"
            btn
            tag="button"
            :class="[
                'datatable-tabs__tab',
                {
                    'hover': activeTab === tab.id,
                },
            ]"
            @click.native="$emit('tab-change', tab.id)"
        >
            {{ tab.name }}
        </SILink>
    </div>
</template>

<script>
    import SILink from '../molecules/SILink'

    export default {
        name: 'DatatableTabs',
        components: {
            SILink,
        },
        props: {
            tabs: {
                type: Array,
                required: true,
                default: () => [],
            },
            activeTab: {
                type: [Number, String],
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">


    .datatable-tabs {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 3.2rem;
        flex-wrap: wrap;
        gap: 0.8rem;
        width: 100%;

        &__tab {
            padding: 0.8rem 1.6rem;
            font-weight: 500;
            border-radius: 4px;
            background-color: transparent;
            border: 1px solid currentColor;
            color: inherit;

            &:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }
        }
    }
</style>
