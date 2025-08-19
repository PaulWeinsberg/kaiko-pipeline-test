<template>
    <section v-si-background-color="color" v-si-color="textColorIntern">
        <SIImage
            v-if="image"
            class="si-section-background-image"
            :image="image"
            size="full_screen"
            :lazy-load="lazyLoad"
        />
        <slot />
    </section>
</template>

<script>
    import SIImage from '../molecules/SIImage.vue'
    import { backgroundColors } from '../../data/validator.data'

    export default {
        name: 'SISection',
        components: { SIImage },
        props: {
            background: {
                type: Object,
                required: false,
                default: () => ({}),
            },
            backgroundColor: {
                type: String,
                required: false,
                default: null,
                validator: val => backgroundColors.includes(val),
            },
            backgroundImage: {
                type: [Object, String],
                required: false,
                default: null,
            },
            textColor: {
                type: [String, Boolean],
                required: false,
                default: null,
            },
            lazyLoad: {
                type: Boolean,
                required: false,
                default: true,
            },
        },
        computed: {
            isColor() {
                const { background, backgroundColor } = this
                const designColor = background.design === 'color'
                if (backgroundColor || designColor) return true
                return null
            },
            image() {
                const { isColor, background, backgroundImage } = this
                if (isColor) return null
                if (backgroundImage) return backgroundImage
                return background.background_image
            },
            color() {
                const { isColor, background, backgroundColor } = this
                if (!isColor) return null
                if (backgroundColor) return backgroundColor
                return background.background_color
            },
            textColorIntern() {
                const { textColor, background } = this
                if (background.design === 'image') return textColor
                return null
            },
        },
    }
</script>

<style scoped lang="scss">
    section {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;
        z-index: 1;
        .si-section-background-image {
            position: absolute;
            inset: 0;
            z-index: -1;
        }
    }
</style>
