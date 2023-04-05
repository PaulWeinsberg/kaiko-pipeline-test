<template>
    <div id="app">
        <TplError />
    </div>
</template>

<script>
    export default {
        name: 'Error',
        layout: 'error',
        head() {
            return {
                meta: [
                    {
                        hid: 'robots',
                        name: 'robots',
                        content: 'noindex',
                    },
                ],
            }
        },
    }
</script>

<style scoped lang="scss">
    #app {
        min-height: auto;
    }
</style>
