<template>
    <div :class="classNames" @click="onClick">
        <div class="container">
            <input
                v-if="!fake"
                :id="uniqueId"
                v-model="checkedIntern"
                class="hidden"
                type="checkbox"
                :name="uniqueId"
                @change="onChange"
            />
            <span :class="['input', { checked: checkedIntern }]">
                <SIIcon v-if="checkedIntern" name="check" color="white-100" />
            </span>
        </div>
        <slot name="label" :data="{ name, label }" :uniqueId="uniqueId" />
        <label v-if="!$scopedSlots.label" :for="uniqueId">{{ label }}</label>
    </div>
</template>

<script>
    import SIIcon from '../atoms/SIIcon'
    export default {
        name: 'SICheckboxItem',
        components: { SIIcon },
        props: {
            name: {
                type: String,
                required: true,
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
            fake: {
                type: Boolean,
                required: false,
                default: false,
            },
            allName: {
                type: String,
                required: false,
                default: null,
            },
            values: {
                type: [Array, String],
                required: false,
                default: null,
            }
        },
        data: () => ({
            checked_: null,
            checkedFake_: null,
        }),
        computed: {
            classNames() {
                const { checkedIntern, fake, checkedFake } = this
                const checked = fake ? checkedFake : checkedIntern

                return ['si-checkbox-item', { checked }]
            },
            checkedIntern: {
                get() {
                    const { checked_, checked } = this
                    if (checked_ !== null) return checked_
                    return checked
                },
                set(nV) {
                    this.checked_ = nV
                },
            },
            checkedFake: {
                get() {
                    const { checkedFake_, values } = this
                    if (checkedFake_ !== null) return checkedFake_
                    return !values || !values.length
                },
                set(nV) {
                    this.checkedFake_ = nV
                },
            },
            uniqueId: {
                get() {
                    return this.name + '___' + Math.random().toString(36).substring(2, 9);
                },
            }
        },
        watch: {
            values(nV) {
                this.checkedFake = !nV || !nV.length
            },
        },
        methods: {
            onChange() {
                const { name, checkedIntern, allName } = this
                if (allName === name && checkedIntern) return
                this.$emit('input', {
                    name,
                    checked: checkedIntern,
                })
            },
            onClick() {
                const { name, fake, checkedFake } = this
                if (!fake || checkedFake) return

                this.checkedFake = true
                this.$emit('click:fake', { name, checked: this.checkedFake })
            },
            reset() {
                this.checkedIntern = false
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-checkbox-item {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 0;
        &:not(:last-of-type) {
            margin-bottom: 1.1rem;
        }
        .container {
            display: flex;
            position: relative;
            margin: 0 0.4rem auto 0;
            .hidden {
                opacity: 0;
            }
            input {
                width: 16px;
                height: 16px;
                margin: 0;
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
                border: 1px solid var(--grey-200);
                border-radius: 2px;
                box-sizing: border-box;
                overflow: hidden;
                height: 100%;
                width: 100%;
                pointer-events: none;
                transition: all 0.3s var(--cubicBezier);
                &.checked {
                    border-color: var(--orange-300);
                    background-color: var(--orange-300);
                }
                .si-icon {
                    font-size: 0.5rem;
                }
            }
        }
        label {
            font-size: 0.8rem;
        }
    }
</style>
