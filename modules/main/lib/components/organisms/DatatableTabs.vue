<template>
    <SIWrapper
        flex-direction="row"
        align-items="center"
        justify-content="center"
        class="datatable-tabs"
    >
        <SILink
            v-for="tab in tabs"
            :key="tab.id"
            btn
            :class="[
                'datatable-tabs__tab',
                { 'datatable-tabs__tab--active': tab.id === activeTab },
            ]"
            @click.native="$emit('tab-change', tab.id)"
        >
            {{ tab.name }}
        </SILink>
    </SIWrapper>
</template>

<script>
    import SIWrapper from '../atoms/SIWrapper'
    import SILink from '../molecules/SILink'

    export default {
        name: 'DatatableTabs',
        components: {
            SIWrapper,
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
        margin-bottom: 3.2rem;
        flex-wrap: wrap;
        gap: 0.8rem;

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

            &--active {
                background-color: currentColor;
                color: #fff;
            }

            @media screen and (max-width: $tabletBreakPoint) {
                padding: 0.6rem 1.2rem;
                font-size: 0.9rem;
            }
        }
    }
</style>
