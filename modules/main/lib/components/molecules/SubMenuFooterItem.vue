<template>
    <li class="sub-menu-footer-item">
        <SILink link :title="item.title" :path="item.url" />
    </li>
</template>

<script>
    export default {
        name: 'SubMenuFooterItem',
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .sub-menu-footer-item {
        display: flex;
        align-items: center;

        &:not(:last-child) {
            &::after {
                content: '';
                background-color: var(--sunflower-700);
                width: 6px;
                height: 6px;
                border-radius: 50%;
                display: block;
                margin: 0 0.8em;
            }
        }

        :deep(.si-link-title) {
            font-weight: 600;
            font-size: 0.7rem;
            color: var(--black-500);
        }
    }
</style>
