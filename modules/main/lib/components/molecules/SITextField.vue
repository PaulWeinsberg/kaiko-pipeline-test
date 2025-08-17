<template>
    <SIFormGroup :error="!!error">
        <SILabel :name="nameUnique" :title="label" :required="required" />
        <div :class="classNames">
            <SIIcon
                v-if="icon"
                class="icon-field"
                :name="icon"
                :color="iconColor"
                @click.native="onClickIconAppend"
            />
            <input
                :id="nameUnique"
                ref="field"
                class="field"
                :value="valueInternal"
                :type="type"
                :placeholder="placeholder"
                :minlength="min"
                :maxlength="max"
                :name="nameUnique"
                @keydown="onKeyDown"
                @input="onInput"
            />
        </div>
        <p v-if="message" class="message">{{ message }}</p>
        <p v-if="error" class="message error">{{ error }}</p>
    </SIFormGroup>
</template>

<script>
    import { regexMatch } from '../../core'
    import SIFormGroup from '../atoms/SIFormGroup'
    import SIIcon from '../atoms/SIIcon'
    import SILabel from '../atoms/SILabel'
    import formComponentsMixin from '../../mixins/formComponentsMixin'

    export default {
        name: 'SITextField',
        components: { SIIcon, SILabel, SIFormGroup },
        mixins: [formComponentsMixin],
        props: {
            placeholder: {
                type: String,
                required: true,
            },
            validations: {
                type: Array,
                required: false,
                default: null,
            },
            charsAccepted: {
                type: [RegExp, String],
                required: false,
                default: null,
            },
            type: {
                type: String,
                required: false,
                default: 'text',
            },
            messageEmailInvalid: {
                type: String,
                required: false,
                default: 'Cet email est invalide',
            },
        },
        emits: ['click:icon:append'],
        computed: {
            classNames() {
                const { iconPosition, icon } = this
                return ['si-text-field', icon ? `icon-${iconPosition}` : '']
            },
            charsAcceptedIntern() {
                const { charsAccepted, type } = this
                // Only number and +
                if (type === 'phone') return /^[0-9+][\b]*$/
                return charsAccepted
            },
            validationsIntern() {
                const { validations, type, messageEmailInvalid } = this
                if (type === 'email') {
                    const validationsTmp = validations || []
                    return [{ email: messageEmailInvalid }, ...validationsTmp]
                }

                return validations
            },
            min() {
                const { validationsIntern } = this
                if (!validationsIntern || !validationsIntern.length) return null
                let min = null

                validationsIntern.forEach(el => {
                    const key = Object.keys(el)[0]
                    if (key.startsWith('min-')) {
                        min = parseFloat(key.split('-')[1])
                    }
                })
                return min
            },
            max() {
                const { validationsIntern } = this
                if (!validationsIntern || !validationsIntern.length) return null
                let max = null

                validationsIntern.forEach(el => {
                    const key = Object.keys(el)[0]
                    if (key.startsWith('max-') || key.startsWith('char-')) {
                        max = parseFloat(key.split('-')[1])
                    }
                })
                return max
            },
        },
        watch: {
            value(nV) {
                this.valueInternal = nV
            },
        },
        created() {
            this.setBaseValue()
        },
        methods: {
            /**
             * Quand on presse une touche
             * @param {KeyboardEvent} e L'évènement levé
             */
            onKeyDown(e) {
                this.onRegExpTest(e)
            },
            /**
             * Quand on test une regexp
             * @param {KeyboardEvent} e L'évènement levé
             */
            onRegExpTest(e) {
                const { charsAcceptedIntern } = this
                if (!charsAcceptedIntern) return
                const accepted = ['Backspace', 'Tab']
                const isRegex = typeof charsAcceptedIntern !== 'string'

                // Si la regex est valide
                const isValidRegex = regexMatch({
                    val: e.key,
                    regex: isRegex ? charsAcceptedIntern : null,
                    name: !isRegex ? charsAcceptedIntern : null,
                })
                const isValidAccepted = accepted.includes(e.key) // Si la touche est acceptée
                const isValidSelectAll = e.metaKey && e.key === 'a' // Si on veut tout sélectionner

                if (isValidRegex || isValidAccepted || isValidSelectAll) return
                e.preventDefault()
            },
            /**
             * Permet de vérifier que le champ est valide
             * @return {boolean} Est-ce que le champ est valide ou non
             */
            isValid() {
                const { validationsIntern, required, valueInternal } = this
                let error = false

                if (!validationsIntern) return required ? !!valueInternal : true
                // On parcourt nos validations
                validationsIntern.forEach(validation => {
                    if (error) return

                    const key = Object.keys(validation)[0]
                    if (key.startsWith('char-')) {
                        error = !this.isValidChar(key)
                    }
                    if (key.startsWith('max-')) {
                        error = !this.isValidMax(key)
                    }
                    if (key.startsWith('min-')) {
                        error = !this.isValidMin(key)
                    }
                    if (key === 'email') {
                        error = !this.isValidEmail(key)
                    }

                    this.messageValidationError = error ? validation[key] : ''
                })

                return !error
            },
            /**
             * Permet de savoir si le champ respecte le nombre de caractère exact donné
             * @param {string} key La clé
             * @return {boolean} Est-ce valide ?
             */
            isValidChar(key) {
                const { valueInternal } = this
                const max = parseFloat(key.split('-')[1])
                return valueInternal.length === max
            },
            /**
             * Permet de savoir si le champ respecte le nombre de caractère maximum donné
             * @param {string} key La clé
             * @return {boolean} Est-ce valide ?
             */
            isValidMax(key) {
                const { valueInternal } = this
                const max = parseFloat(key.split('-')[1])
                return valueInternal.length <= max
            },
            /**
             * Permet de savoir si le champ respecte le nombre de caractère minimum donné
             * @param {string} key La clé
             * @return {boolean} Est-ce valide ?
             */
            isValidMin(key) {
                const { valueInternal, required } = this
                const min = parseFloat(key.split('-')[1])
                return (
                    (!required && !valueInternal) || valueInternal.length >= min
                )
            },
            isValidEmail() {
                const { valueInternal } = this
                return regexMatch({ name: 'email', val: valueInternal })
            },
            onClickIconAppend($event) {
                this.$emit('click:icon:append', $event)
            },
        },
    }
</script>
