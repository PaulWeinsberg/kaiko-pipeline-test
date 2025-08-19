<template>
    <component
        :is="tag"
        :class="classNames"
        :style="{
            flexDirection,
            alignItems,
            justifyContent,
            zIndex,
            flexWrap,
            overflow,
        }"
    >
        <slot />
    </component>
</template>

<script>
    export default {
        name: 'SIWrapper',
        props: {
            name: {
                type: String,
                default: 'main',
                required: false,
            },
            flexDirection: {
                type: String,
                default: null,
                required: false,
            },
            justifyContent: {
                type: String,
                default: 'flex-start',
                required: false,
            },
            alignItems: {
                type: String,
                default: 'center',
                required: false,
            },
            flexWrap: {
                type: String,
                default: null,
                required: false,
            },
            zIndex: {
                type: String,
                default: null,
                required: false,
            },
            overflow: {
                type: String,
                default: 'hidden',
                required: false,
            },
            tag: {
                type: String,
                default: 'div',
                required: false,
            },
        },
        computed: {
            classNames() {
                const { name } = this
                return ['si-wrapper', `w-${name}`]
            },
        },
    }
</script>

<style lang="scss" scoped>
    .si-wrapper {
        display: flex;
        width: 100%;
        padding: var(--wrapperPaddingVertical) var(--wrapperPaddingHorizontal);
        margin: 0 auto;
        box-sizing: border-box;
        position: relative;
        max-width: var(--wrapper);
        &.w- {
            &menu {
                max-width: 71.2rem;
                padding: 0 0.8rem;
            }
            &hero {
                padding-top: 4rem;
                padding-bottom: 4rem;
            }
            &testimonial {
                max-width: 50rem;
            }
        }
    }
</style>
