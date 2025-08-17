<template>
    <SIFormGroup :error="!!error">
        <SILabel :name="nameUnique" :title="label" :required="required" />
        <div :class="classNames">
            <SIIcon v-if="icon" class="icon-field" :name="icon" />
            <textarea
                :id="nameUnique"
                ref="field"
                class="field"
                :value="valueInternal"
                :placeholder="placeholder"
                @input="onInput"
            />
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
        name: 'SITextArea',
        components: { SIIcon, SILabel, SIFormGroup },
        mixins: [formComponentsMixin],
        props: {
            placeholder: {
                type: String,
                required: true,
            },
        },
        computed: {
            classNames() {
                const { iconPosition, icon } = this
                return ['si-textarea', icon ? `icon-${iconPosition}` : '']
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
        .si-textarea {
            .si-icon {
                top: 1.2rem;
            }
            textarea.field {
                min-height: 6.7rem;
                border-radius: 0.8rem;
                padding-top: 0.6rem;
                padding-bottom: 0.6rem;
                resize: vertical;
            }
        }
    }
</style>
