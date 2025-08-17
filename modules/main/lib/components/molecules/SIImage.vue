<template>
    <component
        :is="tag"
        v-if="background"
        v-lazy-background
        :class="classNames"
        :lazy-background="src"
        :style="_style"
    >
        <SILayer
            v-if="filterOpacity !== null"
            :opacity="filterOpacity"
            :background-color="filterBackgroundColor"
        />
        <slot />
    </component>
    <figure v-else-if="image" :class="classNames">
        <img v-if="lazyLoad" v-lazy-load :data-src="src" :alt="alt" />
        <img v-else :src="src" :alt="alt" />
        <SILayer
            v-if="filterOpacity !== null"
            :opacity="filterOpacity"
            :background-color="filterBackgroundColor"
        />
        <SICaption
            v-if="image.caption || caption"
            :caption="caption || image.caption"
        />
        <slot />
    </figure>
</template>

<script>
    import { backgroundColors } from '../../data/validator.data'
    export default {
        name: 'SIImage',
        props: {
            image: {
                type: [Object, String],
                required: true,
            },
            alt: {
                type: String,
                required: false,
                default: '',
            },
            size: {
                type: [Boolean, String],
                required: false,
                default: 'medium_large',
            },
            background: {
                type: Boolean,
                required: false,
                default: false,
            },
            caption: {
                type: String,
                required: false,
                default: null,
            },
            backgroundSize: {
                type: String,
                required: false,
                default: 'cover',
            },
            tag: {
                type: String,
                required: false,
                default: 'div',
            },
            filterOpacity: {
                type: Number,
                required: false,
                default: null,
            },
            filterBackgroundColor: {
                type: [String, Boolean],
                required: false,
                default: 'black-900',
                validator: val => backgroundColors.includes(val),
            },
            lazyLoad: {
                type: Boolean,
                required: false,
                default: true,
            },
        },
        computed: {
            classNames() {
                const { background } = this
                return ['si-image', { background }]
            },
            _style() {
                const { backgroundSize } = this
                return {
                    backgroundSize,
                }
            },
            src() {
                const { image, size } = this
                if (!image) return null
                if (typeof image === 'string') return image
                const { url, sizes } = image
                if (size && sizes[size]) return sizes[size]
                return url
            },
            backgroundImage() {
                const { src, format } = this
                if (!src) return null
                const imgUrl = this.$img(src, {
                    format,
                    preload: true,
                })
                return imgUrl || null
            },
            format() {
                const { src } = this
                const preserve = ['svg', 'gif']
                const extension = src ? src.split('.').pop() : null
                return preserve.includes(extension) ? null : 'webp'
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-image {
        display: flex;
        position: relative;
        overflow: hidden;
        width: 100%;
        &.background {
            min-height: 100%;
            background-position: center;
            background-repeat: no-repeat;
        }
        img {
            max-width: 100%;
            max-height: 100%;
            width: 100%;
            object-fit: cover;
        }
        :deep {
            .si-caption {
                position: absolute;
                bottom: 0.5rem;
                right: 1rem;
                margin-left: 1rem;
                color: var(--white-100);
                background-color: rgba(0, 0, 0, 0.65);
                padding: 0.5rem;
                font-size: 0.8rem;
            }
        }
    }
</style>
