<template>
    <component :is="tag" :class="classNames">
        <SILink
            :title="title"
            design="tertiary"
            link
            @click.native="handleClick"
        />
    </component>
</template>
<script>
    import { scrollTo } from '../../plugins/helpers.client'
    import SILink from '../molecules/SILink.vue'

    export default {
        name: 'ContainerAnchorItem',
        components: { SILink },
        props: {
            title: {
                type: String,
                required: false,
                default: null,
            },
            target: {
                type: String,
                required: false,
                default: null,
            },
            tag: {
                type: String,
                required: false,
                default: 'li',
            },
        },
        computed: {
            classNames() {
                return ['container-anchor-item', 'swiper-slide']
            },
        },
        methods: {
            handleClick() {
                const { target } = this
                scrollTo(document.getElementById(target))
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-anchor-item {
        width: auto;
        display: inline-flex;
        justify-content: center;
        margin: 0 2rem;
        @media screen and (max-width: $mobileBreakPointMin) {
            margin: 0 1rem;
        }
        &:first-child {
            margin-left: auto;
        }
        &:last-child {
            margin-right: auto;
        }
        :deep(.si-link) {
            cursor: pointer;
            font-size: 0.7rem;
            font-weight: 500;
            line-height: 1rem;
            text-align: center;
            text-transform: uppercase;
            @extend %underlineAnimated;
            &:hover {
                @extend %underlineAnimatedHover;
            }
        }
    }
</style>
