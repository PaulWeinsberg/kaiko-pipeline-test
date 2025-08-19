<template>
    <form class="si-form" @submit="onSubmit" @change="onChange">
        <SILoader :show="loader" />
        <slot />
    </form>
</template>

<script>
    import SILoader from './SILoader'

    export default {
        name: 'SIForm',
        components: {
            SILoader,
        },
        props: {
            loader: {
                type: Boolean,
                default: false,
            },
            submitOnChange: {
                type: Boolean,
                default: false,
                required: false,
            },
        },
        data: () => ({
            isValid: false,
            components: [],
            values: {},
        }),
        mounted() {
            this.recursiveGetFromElementComponent()
        },
        methods: {
            onChange(e = null) {
                const { submitOnChange } = this
                if (submitOnChange) this.onSubmit(e)
            },
            /**
             * Permet de récupérer la liste des éléments avec la fonction "onSubmit".
             * @param {array} $children Les composants enfants
             */
            recursiveGetFromElementComponent($children = this.$children) {
                $children.forEach(el => {
                    if (el.onSubmit) this.components.push(el)
                    if (el.$children.length) {
                        this.recursiveGetFromElementComponent(el.$children)
                    }
                })
            },
            /**
             * Quand on submit
             * @param {Event} e L'évènement
             */
            onSubmit(e = null) {
                if (e) e.preventDefault()
                // On reset nos composants
                this.components = []
                // On récupère la liste des composants pouvant renvoyer des valeurs
                this.recursiveGetFromElementComponent()

                let isValid = true
                const values = {}

                // On parcourt nos composants
                this.components.forEach(el => {
                    const componentValues = el.onSubmit()
                    values[componentValues.name] = componentValues.value
                    if (!componentValues.isValid) isValid = false
                })

                this.isValid = isValid

                this.$emit('submit', { isValid, val: values })
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
</style>
