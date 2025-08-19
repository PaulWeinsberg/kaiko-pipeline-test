<template>
    <SIFormGroup :error="!!error">
        <SILabel :name="nameUnique" :title="label" :required="required" />
        <div :class="classNames">
            <SIIcon v-if="icon" class="icon-field" :name="icon" />
            <select
                :id="nameUnique"
                ref="field"
                :name="nameUnique"
                class="field"
                @input="onInput"
            >
                <option
                    v-if="placeholder"
                    value=""
                    :disabled="required"
                    :selected="!value"
                >
                    {{ placeholder }}
                </option>
                <option
                    v-for="(item, i) in items"
                    :key="i"
                    :value="item[itemValue]"
                    :selected="item[itemValue] === value"
                >
                    {{ item[itemText] }}
                </option>
            </select>
            <SIIcon name="c-caret-right" class="icon-arrow" />
        </div>
        <p v-if="message" class="message">{{ message }}</p>
        <p v-if="error" class="message error">{{ error }}</p>
    </SIFormGroup>
</template>

<script>
    import SIFormGroup from '../atoms/SIFormGroup'
    import SIIcon from '../atoms/SIIcon'
    import SILabel from '../atoms/SILabel'
    import formComponentsMixin from '../../mixins/formComponentsMixin'
    export default {
        name: 'SISelect',
        components: { SIIcon, SILabel, SIFormGroup },
        mixins: [formComponentsMixin],
        props: {
            placeholder: {
                type: String,
                required: false,
                default: null,
            },
            items: {
                type: Array,
                required: true,
            },
            itemText: {
                type: String,
                required: false,
                default: 'text',
            },
            itemValue: {
                type: String,
                required: false,
                default: 'value',
            },
        },
        computed: {
            classNames() {
                const { iconPosition, icon } = this
                return ['si-select', icon ? `icon-${iconPosition}` : '']
            },
        },
        create() {
            this.setBaseValue()
        },
        methods: {
            /**
             * Permet de vérifier que le champ est valide
             * @return {boolean} Est-ce que le champ est valide ou non
             */
            isValid() {
                const { required, valueInternal } = this
                return required ? !!valueInternal : true
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-form-group {
        .si-select {
            select {
                &.field {
                    appearance: none;
                    padding-right: calc(0.9rem + 1rem + 0.9rem);
                }
            }
            .icon-arrow {
                position: absolute;
                right: 1.2rem;
                font-size: 0.5rem;
                top: 50%;
                color: var(--black-700);
                transform: translateY(-50%) rotate(90deg);
                pointer-events: none;
            }
        }
    }
</style>
