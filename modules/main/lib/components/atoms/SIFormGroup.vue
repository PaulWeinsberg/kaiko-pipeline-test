<template>
    <div :class="classNames">
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'SIFormGroup',
        props: {
            error: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            classNames() {
                const { error } = this
                return ['si-form-group', { 'has-error': !!error }]
            },
        },
    }
</script>

<style scoped lang="scss">
    $padding: 0.9rem;
    .si-form-group {
        display: flex;
        flex-direction: column;
        &,
        & > div,
        & > fieldset {
            display: flex;
            position: relative;
            .icon-field {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: 1rem;
            }
            .field {
                border: 1px solid var(--black-400);
                border-radius: 0.8rem;
                padding: 0 0.8rem;
                height: 2.4rem;
                width: 100%;
                font-size: 16px;
                line-height: 160%;
                box-sizing: border-box;
                font-family: var(--fontPrimary);
                transition: border-color 0.3s var(--cubicBezier);
                &:hover,
                &:focus {
                    border-color: var(--dark-blue-800);
                }
                &::placeholder {
                    color: var(--black-500);
                }
            }
            &.icon-left {
                .icon-field {
                    left: $padding;
                }
                .field {
                    padding-left: calc(#{$padding} + 1rem + #{$padding});
                }
            }
            &.icon-right {
                .icon-field {
                    right: $padding;
                }
                .field {
                    padding-right: calc(#{$padding} + 1.1rem + #{$padding});
                }
            }
        }

        .message {
            margin-top: 0.2rem;
            font-size: 0.6rem;
        }

        .error {
            color: var(--red-600);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s var(--cubicBezier);
        }

        .legend {
            margin-top: 1rem;
            line-height: 1.2em;
        }

        &.has-error {
            & > div,
            & > fieldset {
                .field {
                    border-color: var(--red-600);
                }
            }
            .error {
                opacity: 1;
                visibility: visible;
            }
        }
    }
</style>
