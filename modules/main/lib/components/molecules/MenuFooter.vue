<template>
    <div class="menu-footer">
        <ul v-for="(item, i) in content" :key="i">
            <MenuFooterItem :key="item.id" :item="item" />
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'MenuFooter',
        props: {
            content: {
                type: Array,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .menu-footer {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
        grid-gap: 1rem;
        max-width: 30rem;
        width: 100%;
        margin: 0 4.5% 2rem 0;
        ul {
            display: flex;
            flex-direction: column;
        }
    }
</style>
