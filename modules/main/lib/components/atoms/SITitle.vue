<template>
    <!-- eslint-disable vue/no-v-html -->
    <component
        :is="tag"
        ref="title"
        v-si-color="color"
        :class="classNames"
        v-html="titleIntern"
    />
</template>

<script>
    import { colors } from '../../data/validator.data'

    export default {
        name: 'SITitle',
        props: {
            title: {
                type: [String, Number],
                required: true,
            },
            center: {
                type: Boolean,
                required: false,
                default: false,
            },
            h1: {
                type: Boolean,
                required: false,
                default: false,
            },
            h2: {
                type: Boolean,
                required: false,
                default: false,
            },
            h3: {
                type: Boolean,
                required: false,
                default: false,
            },
            h4: {
                type: Boolean,
                required: false,
                default: false,
            },
            h5: {
                type: Boolean,
                required: false,
                default: false,
            },
            h6: {
                type: Boolean,
                required: false,
                default: false,
            },
            color: {
                type: String,
                required: false,
                default: null,
                validator: val => colors.includes(val),
            },
            design: {
                type: String,
                required: false,
                default: null,
                validator: val => {
                    const data = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
                    return data.includes(val)
                },
            },
        },
        computed: {
            classNames() {
                const { center, designIntern } = this
                return ['si-title', { center }, designIntern]
            },
            /**
             * On ajoute le tag
             * @returns {string}
             */
            tag() {
                const valideTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
                let tag
                valideTags.forEach(el => {
                    if (this[el]) tag = el
                })
                return tag
            },
            /**
             * On peut ajouter un design différent du tag
             * @returns {string}
             */
            designIntern() {
                const { tag, design } = this
                return design || tag
            },
            /**
             * On ajoute des spans autour de la ponctuation pour pouvoir les styliser
             * @returns {string}
             */
            titleIntern() {
                const { title, designIntern } = this
                if (designIntern !== 'h1') return title

                const splitted = title.split(' ')
                const lastWord = splitted[splitted.length - 1]
                splitted[splitted.length - 1] = lastWord.replace(
                    /([.,?!:;+])/g,
                    `<span class="ponctuation">$1</span>`
                )

                return splitted.join(' ')
            },
        },
    }
</script>

<style lang="scss">
    .si-title {
        .custom-icon {
            font-size: inherit !important;
            line-height: 100% !important;
            margin: 0 !important;
        }
    }
    .h1 {
        font-weight: 300;
        font-size: 3.2rem;
        line-height: 120%;
        .ponctuation {
            color: var(--sunflower-700);
        }
        @media screen and (max-width: $mobileBreakPoint) {
            font-size: 2rem;
        }
    }
    .h2 {
        font-weight: 500;
        font-size: 2rem;
        line-height: 140%;
    }
    .h3 {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 140%;
    }
    .h4 {
        font-weight: 700;
        font-size: 1rem;
        line-height: 140%;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--sunflower-700);
    }
    .h5 {
        font-weight: 500;
        font-size: 1rem;
        line-height: 140%;
        color: var(--electric-blue-700);
        .b-midnight-blue-700 & {
            color: var(--white-100);
        }
    }
    .h6 {
        font-weight: 700;
        font-size: 0.75rem;
        line-height: 1.4em;
        text-transform: uppercase;
    }
</style>
