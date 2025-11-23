<template>
    <SIFormGroup :error="!!error">
        <SILabel :name="nameUnique" :title="label" :required="required" />
        <fieldset class="si-checkbox">
            <SICheckboxItem
                v-for="(item, i) in itemsIntern"
                ref="checkbox"
                :key="i"
                :name="item[itemName]"
                :checked="item.checked"
                :label="item[itemText]"
                :all-name="allName"
                :fake="item.all"
                :values="valueInternal"
                v-bind="elAttr"
                @input="onInputIntern"
                @click:fake="onClickFake"
            >
                <template v-for="(slot, name) in $scopedSlots" #[name]="data">
                    <slot :name="name" v-bind="{ ...data, item }" />
                </template>
            </SICheckboxItem>
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
    import SICheckboxItem from './SICheckboxItem'
    export default {
        name: 'SICheckbox',
        components: { SICheckboxItem, SILabel, SIFormGroup },
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
            legend: {
                type: String,
                required: false,
                default: null,
            },
            all: {
                type: String,
                required: false,
                default: null,
            },
            allName: {
                type: String,
                required: false,
                default: null,
            },
            elAttr: {
                type: Object,
                required: false,
                default: null,
            },
        },
        computed: {
            itemsIntern() {
                const {
                    items,
                    all,
                    allName,
                    itemText,
                    itemName,
                    valueInternal,
                } = this
                if (!all) return items

                const allValues = { all: true }
                allValues[itemText] = all
                allValues[itemName] = allName
                allValues.checked = !valueInternal || !valueInternal.length

                return [allValues, ...items]
            }
        },
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
             * Permet de récupérer les valeurs des checkbox
             * @param {string} name Le nom de la checkbox
             * @param {boolean} checked Est-ce qu'elle est cochée ou non
             * @return {*[]}
             */
            getCheckboxValues({ name, checked }) {
                const { valueInternal } = this
                let checkboxValues = valueInternal || []
                checkboxValues = checkboxValues.filter(el => el.name !== name)
                if (checked) checkboxValues.push({ name, checked })
                return checkboxValues
            },
            /**
             * Permet de reset les checkbox
             */
            resetIntern() {
                this.$refs.checkbox.forEach(checkbox => {
                    checkbox.reset()
                })
                return []
            },
            /**
             * Quand on fait une modif dans une checkbox
             * @param {string} name Le nom de la checkbox
             * @param {boolean} checked Est-ce qu'elle ai coché ou non
             */
            onInputIntern({ name, checked }) {
                this.valueInternal = this.getCheckboxValues({
                    name,
                    checked,
                })
                this.emitInput()
            },
            /**
             * Quand on clique sur la fausse checkbox "All"
             */
            onClickFake() {
                this.valueInternal = []
                this.resetIntern()
                this.emitInput()
            },
            /**
             * Permet d'emit un input
             */
            emitInput() {
                const { nameUnique } = this
                this.dirty = true

                const isValid = this.isValid()
                this.$emit('input', {
                    name: nameUnique,
                    val: this.valueInternal,
                    isValid,
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-checkbox {
        margin-top: 0.5rem;
    }
</style>
