<template>
    <ul class="sub-menu-footer">
        <SubMenuFooterItem
            v-for="item in subFooter"
            :key="item.id"
            :item="item"
        />
    </ul>
</template>

<script>
    export default {
        name: 'SubMenuFooter',
        props: {
            subFooter: {
                type: Array,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .sub-menu-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.9rem 0.5rem 2rem;
        flex-wrap: wrap;
    }
</style>
