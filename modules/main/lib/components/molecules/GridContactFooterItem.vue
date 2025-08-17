<template>
    <li class="grid-contact-footer-item">
        <SIIcon name="location_3" />
        <SIWys :content="content.informations" />
    </li>
</template>

<script>
    export default {
        name: 'GridContactFooterItem',
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .grid-contact-footer-item {
        color: var(--white-100);
        .si-icon {
            float: left;
            margin-right: 0.5rem;
            color: var(--sunflower-700);
        }
        :deep(.si-wys p) {
            font-size: 0.7rem;
            line-height: 140%;
        }
    }
</style>
