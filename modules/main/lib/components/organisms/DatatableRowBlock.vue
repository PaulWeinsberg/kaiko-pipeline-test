<template>
    <div v-if="isActive" class="datatable-row-block">
        <h3 class="datatable-row-block__title">{{ block.title }}</h3>
        <div class="datatable-row-block__content" v-html="block.content"></div>
        <div class="datatable-row-block__links">
            <SILink
                v-for="link in block.links"
                :key="link.url"
                :href="link.url"
                btn
                tag="a"
                size="xs"
                icon="c-arrow-right"
                icon-position="right"
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
        }
    }
</script>

<style scoped lang="scss">
    .datatable-row-block {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        padding: 1.2rem;
        background-color: white;
        border: 1px solid var(--black-300);
        border-radius: .5rem;

        &, * { box-sizing: border-box; }
        &__title {
            margin: 0;
            font-size: .7rem;
            font-weight: 600;
            color: var(--midnight-blue-700);
        }

        &__content {
            font-size: .7rem;
            margin: 0;
            line-height: 1.6;
            color: var(--black-500);
            :deep(ul) {
                list-style-type: disc;
                padding-left: 1rem;
            }
            :deep(ul) ::marker {
                color: var(--sunflower-700); /* Replace with your desired color */
            }
        }

        &__links {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
        }
    }
</style>
