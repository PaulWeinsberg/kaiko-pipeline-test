<template>
    <transition appear @enter="$animations.fadeIn" @leave="$animations.fadeOut">
        <div v-if="show" :class="classNames">
            <SILayer :opacity="opacity" :background-color="backgroundColor" />
            <span class="loader"></span>
        </div>
    </transition>
</template>

<script>
    import SILayer from './SILayer'
    export default {
        name: 'SILoader',
        components: { SILayer },
        props: {
            show: {
                type: Boolean,
                required: false,
                default: false,
            },
            opacity: {
                type: Number,
                required: false,
                default: 0.5,
            },
            backgroundColor: {
                type: String,
                required: false,
                default: 'black-900',
            },
            float: {
                type: Boolean,
                required: false,
                default: true,
            },
            outside: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            classNames() {
                const { float, outside } = this
                return ['si-loader', { float }, { outside }]
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-loader {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        z-index: 150;
        &:not(.float) {
            min-height: 70vh;
            position: relative;
        }
        &.float {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            &.outside {
                width: calc(100% + 1rem);
                height: calc(100% + 1rem);
            }
        }

        .loader {
            width: 48px;
            height: 48px;
            display: inline-block;
            position: relative;
        }
        .loader::after,
        .loader::before {
            content: '';
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #fff;
            position: absolute;
            left: 0;
            top: 0;
            box-sizing: border-box;
            transform: scale(0);
            animation: animloader 2s ease-in-out infinite;
        }
        .loader::after {
            animation-delay: 1s;
        }
        .loader::before {
            transform: scale(0.5);
            opacity: 1;
        }

        @keyframes animloader {
            0%,
            100% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                transform: scale(1);
                opacity: 0;
            }
        }
    }
</style>
