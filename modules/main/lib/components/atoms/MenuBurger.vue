<template>
    <div :class="classNames">
        <div class="click-zone" @click="onClick" />
        <div class="icons">
            <span v-for="i in 3" :key="i" class="icon" />
        </div>
    </div>
</template>

<script>
    import { gsap } from 'gsap'

    export default {
        name: 'MenuBurger',
        props: {
            backgroundColor: {
                type: String,
                required: false,
                default: 'white-100',
            },
            onlyCross: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        emits: ['click'],
        data: () => ({
            open: false,
            tl: gsap.timeline({ paused: true }),
        }),
        computed: {
            classNames() {
                const { open } = this
                return ['si-burger', { open }]
            },
        },
        watch: {
            open(nV) {
                const { tl, onlyCross } = this
                if (!onlyCross) {
                    nV ? tl.play() : tl.reverse()
                }
            },
        },
        methods: {
            onClick() {
                const { open } = this
                this.open = !open
                this.$emit('click', { open: this.open })
            },
            close() {
                this.open = false
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-burger {
        display: flex;
        width: 1.3rem;
        height: 1.3rem;
        cursor: pointer;
        box-sizing: border-box;
        position: relative;
        .icons {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            pointer-events: none;
            .icon {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate(0, -1px);
                width: 0;
                height: 2px;
                box-sizing: border-box;
                background-color: var(--black-900);
                transition: all 0.3s var(--cubicBezier);
                @include parent-has-class(':not(.open):hover') {
                    width: 100% !important;
                }
                &:first-of-type {
                    transform: translate(0, -9px);
                    width: 100%;
                    @include parent-has-class('.open') {
                        width: 0.7rem;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(50deg);
                    }
                    @include parent-has-class('.open:hover') {
                        transform: translate(-50%, -50%) rotate(35deg);
                    }
                }
                &:nth-child(2) {
                    width: 75%;
                    @include parent-has-class('.open') {
                        width: 100%;
                        transform: translateX(-110%);
                    }
                }
                &:last-of-type {
                    transform: translate(0, 7px);
                    width: 50%;
                    @include parent-has-class('.open') {
                        width: 0.7rem;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(-50deg);
                    }
                    @include parent-has-class('.open:hover') {
                        transform: translate(-50%, -50%) rotate(-35deg);
                    }
                }
            }
        }
        .click-zone {
            position: absolute;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 0;
            transform: scale(1.5);
            cursor: pointer;
        }
    }
</style>
