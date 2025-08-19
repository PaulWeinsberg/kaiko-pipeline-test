<template>
    <div ref="test" class="si-radio-item">
        <div class="container">
            <input
                :id="id"
                type="radio"
                :name="name"
                :value="value"
                class="hidden"
                @input="onInput"
            />
            <span :class="['input', { checked: active === value }]" />
        </div>
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script>
    export default {
        name: 'SIRadioItem',
        props: {
            name: {
                type: String,
                required: true,
            },
            value: {
                type: [String, Number],
                required: false,
                default: null,
            },
            label: {
                type: String,
                required: false,
                default: null,
            },
            checked: {
                type: Boolean,
                required: false,
                default: false,
            },
            active: {
                type: [String, Number],
                required: false,
                default: null,
            },
        },
        computed: {
            id() {
                const { name, value } = this
                return `${name}-${value}`
            },
        },
        methods: {
            onInput() {
                const { name, value } = this
                this.$emit('input', {
                    name,
                    value,
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-radio-item {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 0;
        margin-top: 0.5rem;
        &:not(:last-of-type) {
            margin-right: 3.2rem;
            @media screen and (max-width: $mobileBreakPointMin) {
                margin-right: 2.3rem;
            }
        }
        .container {
            display: flex;
            position: relative;
            .hidden {
                opacity: 0;
            }
            input {
                width: 0.9rem;
                height: 0.9rem;
                margin: 0;
                cursor: pointer;
            }
            .input {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                z-index: 5;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                border: 1px solid var(--black-400);
                border-radius: 50%;
                box-sizing: border-box;
                overflow: hidden;
                height: 100%;
                width: 100%;
                pointer-events: none;
                transition: all 0.3s var(--cubicBezier);
                &.checked {
                    border-width: 0.25rem;
                    border-color: var(--sunflower-700);
                }
                .si-icon {
                    font-size: 0.5rem;
                }
            }
        }
        label {
            font-size: 1rem;
            line-height: 140%;
            font-weight: 500;
            padding-left: 1.6rem;
            cursor: pointer;
            @media screen and (max-width: $mobileBreakPointMin) {
                padding-left: 2rem;
            }
        }
        &:hover,
        &:focus {
            .container {
                .input {
                    border-color: var(--sunflower-700);
                }
            }
        }
    }
</style>
