<template>
    <SICheckbox
        class="filters-post-type"
        :items="items"
        item-text="name"
        item-name="slug"
        all="All"
        all-name="all"
        :name="tags"
        :el-attr="{ class: 'swiper-slide' }"
        v-on="$listeners"
    >
        <template #label="{ data, item }">
            <label :for="data.name">
                <SIIcon v-if="item?.fields?.icon" :name="item.fields.icon" />
                <p>{{ data.label }}</p>
            </label>
        </template>
    </SICheckbox>
</template>

<script>
    export default {
        name: 'FiltersPostType',
        props: {
            items: {
                type: Array,
                required: true,
            },
            tags: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .filters-post-type {
        overflow: hidden;
        :deep(.si-checkbox) {
            margin: 0;
            .si-checkbox-item {
                background: var(--white-100);
                color: var(--black-700);
                border-radius: 0.8rem;
                justify-content: center;
                margin-right: 0.8rem;
                transition: color 0.3s var(--cubicBezier);
                margin-bottom: 0;
                width: auto;
                margin-top: 0;
                overflow: hidden;
                @extend %backgroundFromLeft;
                &:before {
                    background: var(--gradient-blue-500);
                    border-radius: unset;
                }
                &.checked,
                &:hover {
                    color: var(--white-100);
                    &:before {
                        transform: translateX(0%);
                    }
                }
                .container {
                    display: none;
                }
                label {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 5.75rem;
                    height: 5.75rem;
                    cursor: pointer;
                    .si-icon {
                        font-size: 1.2rem;
                        margin-bottom: 0.6rem;
                    }
                }
            }
        }
    }
</style>
