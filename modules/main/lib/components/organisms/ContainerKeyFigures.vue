<template>
    <SectionEdito class="container-key-figures" :content="content">
        <ul class="key-figures">
            <KeyFigure
                v-for="(figure, i) in content.key_figures"
                ref="keyFigures"
                :key="i"
                :content="figure.content"
                :prefix="figure.key_figure.prefix"
                :number="figure.key_figure.number"
                :suffix="figure.key_figure.suffix"
                :title="figure.title"
                :title-color="figure.title_color"
                :font-size="fontSizeLowest"
            />
        </ul>
        <SILink
            v-if="content.add_cta"
            class="cta-end"
            :path="content.group_link.link"
            :title="content.group_link.text"
            :icon="content.group_link.icon"
            icon-position="right"
            :design="content.group_link.design"
            btn
        />
    </SectionEdito>
</template>

<script>
    import KeyFigure from '../molecules/KeyFigure.vue'
    import SILink from '../molecules/SILink.vue'
    import SectionEdito from './SectionEdito.vue'

    export default {
        name: 'ContainerKeyFigures',
        components: { SILink, KeyFigure, SectionEdito },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        data: () => ({
            fontSizeLowest: null,
        }),
        mounted() {
            this.getFontSizeLowest()
            window.addEventListener('resize', this.getFontSizeLowest, false)
        },
        destroyed() {
            window.removeEventListener('resize', this.getFontSizeLowest, false)
        },
        methods: {
            /**
             * Permet de récupérer la font-size la plus petite
             */
            getFontSizeLowest() {
                const { $refs } = this
                this.fontSizeLowest = null
                this.$nextTick(() => {
                    // On parcourt les KeyFigure
                    $refs.keyFigures.forEach(keyFigure => {
                        // On récupère la ref du composant fitText
                        const fitText = keyFigure.$refs.fitText
                        // On vérifie si la font est plus petite que celle actuelle ou non
                        if (
                            !this.fontSizeLowest ||
                            this.fontSizeLowest >= fitText.fontSizeIntern
                        ) {
                            this.fontSizeLowest = fitText.fontSizeIntern
                        }
                    })
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .container-key-figures {
        .key-figures {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            width: 100%;
        }
        .cta-end {
            margin: 1rem auto 0;
        }
    }
</style>
