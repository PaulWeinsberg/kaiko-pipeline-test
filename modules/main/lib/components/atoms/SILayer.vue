<template>
    <div
        v-si-background-color="backgroundColor"
        class="si-layer"
        :style="{ opacity, 'z-index': zIndex }"
    />
</template>

<script>
    import { backgroundColors } from '../../data/validator.data'

    export default {
        name: 'SILayer',
        props: {
            zIndex: {
                type: Number,
                required: false,
                default: 0,
            },
            opacity: {
                type: Number,
                required: false,
                default: 0.5,
            },
            backgroundColor: {
                type: [String, Boolean],
                required: false,
                default: 'black-900',
                validator: val => backgroundColors.includes(val),
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-layer {
        display: flex;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }
</style>
