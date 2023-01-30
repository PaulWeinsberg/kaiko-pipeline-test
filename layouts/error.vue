<template>
    <div id="app">
        <!--        <TplError />-->
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'Error',
        layout: 'error',
        props: {
            error: {
                type: Object,
                required: true,
            },
        },
        computed: {
            ...mapState({
                options: state => state.options.options,
            }),
        },
    }
</script>

<style scoped lang="scss">
    #error-page {
        flex: 1;
        align-items: center;
        justify-content: center;
        .si-wrapper {
            flex: 1;
        }
    }
</style>
