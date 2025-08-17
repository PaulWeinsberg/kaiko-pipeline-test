<template>
    <button :class="classNames" @click="onClick">
        <SIIcon :name="icon" :color="color" />
    </button>
</template>

<script>
    import { colors } from '../../data/validator.data'
    import SIIcon from './SIIcon.vue'

    export default {
        name: 'SIArrow',
        components: { SIIcon },
        props: {
            color: {
                type: String,
                required: false,
                default: 'white-100',
                validator: val => colors.includes(val),
            },
            icon: {
                type: String,
                required: false,
                default: 'c-arrow-right',
            },
            next: {
                type: Boolean,
                required: false,
                default: false,
            },
            disable: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            classNames() {
                const { disable } = this
                return ['si-arrow', { disable }]
            },
        },
        methods: {
            onClick() {
                const { next } = this
                this.$emit('click', { next })
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-arrow {
        padding: 1rem;
        display: flex;
        background-color: var(--white-100);
        border-radius: 50%;
        transition: all 0.4s var(--cubicBezier);
        @extend %btn;
        @extend %btnPrimary;
        border: none;
        .si-icon {
            font-size: 0.7rem;
            color: var(--midnight-blue-700);
        }
        &:after {
            display: none;
        }
        &.disable,
        &.swiper-button-disabled {
            opacity: 0;
            &:hover {
                cursor: initial;
            }
        }
    }
</style>
