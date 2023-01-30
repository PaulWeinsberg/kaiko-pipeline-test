import { getUid } from '@/uid'

export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        label: {
            type: String,
            required: false,
            default: null,
        },
        value: {
            type: String,
            required: false,
            default: '',
        },
        icon: {
            type: String,
            required: false,
            default: null,
        },
        iconColor: {
            type: String,
            required: false,
            default: null,
        },
        iconPosition: {
            type: String,
            required: false,
            default: 'left',
            validator: val => ['left', 'right'].includes(val),
        },
        message: {
            type: String,
            required: false,
            default: null,
        },
        messageRequired: {
            type: String,
            required: false,
            default: 'Veuillez remplir ce champ',
        },
    },
    data: () => ({
        valueInternal: '',
        dirty: false,
        messageValidationError: null,
    }),
    created() {
        const { value } = this
        if (value) this.valueInternal = value
    },
    computed: {
        nameUnique() {
            const { name } = this
            return `${name}__${getUid()}`
        },
        hasValueInternal() {
            const { valueInternal } = this
            if (typeof valueInternal === 'object') return !!valueInternal.length
            return !!valueInternal
        },
        error() {
            const {
                hasValueInternal,
                dirty,
                required,
                messageRequired,
                messageValidationError,
            } = this

            if (!hasValueInternal && dirty && required) return messageRequired
            if (messageValidationError) return messageValidationError
            return ''
        },
    },
    methods: {
        /**
         * Permet au formulaire de récupérer les informations nécessaires
         */
        onSubmit() {
            const { name, valueInternal } = this
            this.dirty = true

            return {
                isValid: this.isValid(),
                name,
                value: valueInternal,
            }
        },
        /**
         * Quand une modif est effectuée dans le champ
         */
        onInput() {
            const { $refs } = this
            this.dirty = true
            this.valueInternal = $refs.field.value
            const isValid = this.isValid()

            this.$nuxt.$emit('input', {
                val: this.valueInternal,
                isValid,
            })
        },
        reset() {
            this.valueInternal = ''
            this.$refs.field.value = ''
        },
    },
}
