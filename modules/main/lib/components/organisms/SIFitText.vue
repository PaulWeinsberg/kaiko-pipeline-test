<template>
    <p class="si-fit-text">
        <span ref="innerSpan" class="si-fit-text-fitted">
            <slot />
        </span>
    </p>
</template>

<script>
    // Composant Nuxt.JS basé sur ce repo : https://github.com/STRML/textFit/blob/master/textFit.js
    import { defineComponent } from 'vue'
    import { elementGetInnerWidth } from '../../core'

    export default defineComponent({
        name: 'SIFitText',
        props: {
            fontSize: {
                type: Number,
                required: false,
                default: null,
            },
            minFontSize: {
                type: Number,
                required: false,
                default: 6,
            },
            maxFontSize: {
                type: Number,
                required: false,
                default: 80,
            },
        },
        emits: ['mounted'],
        data: () => ({
            fontSizeIntern: null,
            innerSpan: null,
            originalWidth: null,
        }),
        watch: {
            fontSize(nV) {
                this.$refs.innerSpan.style.fontSize = nV + 'px'
            },
        },
        mounted() {
            this.fitText()
            window.addEventListener('resize', this.fitText, false)
            this.$nextTick(() => {
                this.$emit('mounted')
            })
        },
        destroyed() {
            window.removeEventListener('resize', this.fitText, false)
        },
        methods: {
            /**
             * Permet de définir la taille du texte
             */
            fitText() {
                const { $el, minFontSize, maxFontSize } = this
                // On récupère la largeur de base
                this.originalWidth = elementGetInnerWidth($el)

                let mid
                let low = minFontSize
                let high = maxFontSize

                // On fait une recherche binaire pour trouver le meilleur match
                let size = low
                while (low <= high) {
                    mid = (high + low) >> 1
                    this.$refs.innerSpan.style.fontSize = mid + 'px'
                    const innerSpanBoundingRec =
                        this.$refs.innerSpan.getBoundingClientRect()
                    if (innerSpanBoundingRec.width <= this.originalWidth) {
                        size = mid
                        low = mid + 1
                    } else {
                        high = mid - 1
                    }
                }

                this.$refs.innerSpan.style.fontSize = size + 'px'
                this.fontSizeIntern = size
            },
        },
    })
</script>

<style lang="scss" scoped>
    .si-fit-text {
        display: flex;
        width: 100%;
        .si-fit-text-fitted {
            display: flex;
            line-height: 1em;
            white-space: pre;
        }
    }
</style>
