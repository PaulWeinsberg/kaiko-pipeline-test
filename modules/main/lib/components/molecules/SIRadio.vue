<template>
    <SIFormGroup :error="!!error">
        <SILabel :name="nameUnique" :title="label" :required="required" />
        <fieldset class="si-radio">
            <SIRadioItem
                v-for="(item, i) in items"
                :key="i"
                :name="item[itemName]"
                :checked="item.checked"
                :label="item[itemText]"
                :value="item[itemValue]"
                :active="active"
                @input="onInputIntern"
            />
        </fieldset>
        <p v-if="message" class="message">{{ message }}</p>
        <!-- eslint-disable vue/no-v-html -->
        <p v-if="legend" class="legend" v-html="legend" />
        <p v-if="error" class="message error">{{ error }}</p>
    </SIFormGroup>
</template>

<script>
    import SIFormGroup from '../atoms/SIFormGroup'
    import SILabel from '../atoms/SILabel'
    import formComponentsMixin from '../../mixins/formComponentsMixin'
    import SIRadioItem from './SIRadioItem'
    export default {
        name: 'SIRadio',
        components: { SIRadioItem, SILabel, SIFormGroup },
        mixins: [formComponentsMixin],
        props: {
            items: {
                type: Array,
                required: true,
            },
            itemText: {
                type: String,
                required: false,
                default: 'text',
            },
            itemName: {
                type: String,
                required: false,
                default: 'name',
            },
            itemValue: {
                type: String,
                required: false,
                default: 'value',
            },
            legend: {
                type: String,
                required: false,
                default: null,
            },
        },
        data: () => ({
            active: 0,
        }),
        methods: {
            /**
             * Permet de vérifier que le champ est valide
             * @return {boolean} Est-ce que le champ est valide ou non
             */
            isValid() {
                const { required, hasValueInternal } = this
                return required ? hasValueInternal : true
            },
            /**
             * Quand on fait une modif dans une radio
             * @param {string} name Le nom de la radio
             * @param {boolean} checked Est-ce qu'elle ai coché ou non
             */
            onInputIntern({ name, value, checked }) {
                const { nameUnique } = this
                this.dirty = true

                this.valueInternal = {
                    name,
                    value,
                    checked,
                }

                this.active = value

                const isValid = this.isValid()
                this.$nuxt.$emit('input', {
                    name: nameUnique,
                    val: this.valueInternal,
                    isValid,
                })
            },
        },
    }
</script>
