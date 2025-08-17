<template>
    <main class="si-main">
        <slot />
    </main>
</template>

<script>
    export default {
        name: 'SIMain',
    }
</script>

<style scoped lang="scss">
    main {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        margin-top: var(--baseHeaderHeight);
    }
</style>
