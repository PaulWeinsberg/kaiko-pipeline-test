<template>
    <div v-if="isActive" class="datatable-row-block">
        <h3 class="datatable-row-block__title">{{ block.title }}</h3>
        <div class="datatable-row-block__content" v-html="block.content"></div>
        <div class="datatable-row-block__links">
            <SILink
                v-for="link in block.links"
                :key="link.url"
                :href="link.url"
                target="_blank"
            >
                {{ link.title }}
            </SILink>
        </div>
    </div>
</template>

<script>
    import SILink from '../molecules/SILink'

    export default {
        name: 'DatatableRowBlock',
        components: {
            SILink,
        },
        props: {
            block: {
                type: Object,
                required: true,
            },
            activeTab: {
                type: [Number, String],
                required: true,
            },
        },
        computed: {
            isActive() {
                // A block is active if the current activeTab matches any of the block's tabs
                if (!this.block.tabs || !Array.isArray(this.block.tabs)) {
                    return false
                }
                return this.block.tabs.some(tab => tab.term_id === this.activeTab)
            },
        },
    }
</script>

<style scoped lang="scss">
    .datatable-row-block {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        padding: 1.2rem;
        background-color: #f9f9f9;
        margin-top: 0.8rem;

        &__title {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
            color: #333;
        }

        &__content {
            margin: 0;
            line-height: 1.6;
            color: #555;

            ul {
                margin: 0;
                padding-left: 1.2rem;
            }

            li {
                margin-bottom: 0.4rem;
            }
        }

        &__links {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
    }

    @media screen and (max-width: $tabletBreakPoint) {
        .datatable-row-block {
            padding: 0.8rem;
            gap: 0.8rem;

            &__title {
                font-size: 0.9rem;
            }

            &__content {
                font-size: 0.9rem;
            }
        }
    }
</style>
