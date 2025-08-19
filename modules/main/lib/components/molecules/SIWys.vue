<script>
    import SITitle from '../atoms/SITitle.vue'
    import SILink from './SILink.vue'

    export default {
        name: 'SIWys',
        props: {
            content: {
                type: String,
                required: true,
            },
        },
        methods: {
            /**
             * Permet d'échapper une string avec du contenu html
             * @param unsafe
             * @returns {*}
             */
            escapeHtml(unsafe) {
                return unsafe
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;')
            },
            /**
             * On remplace les titres de section venant du contenu par notre composant
             */
            replaceHeading(string) {
                const regex =
                    /<h([1-6])*( style=".*?")?(?: data-(design=".*?"))?>(.*?)<\/h\1>/gms
                const replacer = (match, p1, p2, p3, p4) => {
                    const htmlContent = this.escapeHtml(p4)
                    return `<SITitle h${p1} ${p2} ${p3} title="${htmlContent}" />`
                }

                return string.replaceAll(regex, replacer)
            },
            /**
             * On remplace les boutons venant du contenu par notre composant
             */
            replaceButton(string) {
                const regex =
                    /<a.*?class=("[^"]+") *?href="([^"]+)"(?: target="([^"]+)")?.*? *?data-design="([^"]+)">(.*?)<\/a>/g

                return string.replaceAll(
                    regex,
                    '<SILink btn icon="c-arrow-right" icon-position="right" path="$2" target="$3" design="$4" title="$5" />'
                )
            },
        },
        render(h) {
            const contentWithHeading = this.replaceHeading(this.content)
            const contentWithButton = this.replaceButton(contentWithHeading)
            return h({
                components: { SITitle, SILink },
                template: `<div class="si-wys">${contentWithButton}</div>`,
            })
        },
    }
</script>

<style lang="scss" scoped>
    .si-wys {
        width: 100%;
        box-sizing: border-box;
        :deep {
            > * ~ * {
                margin: 1rem 0 0;
            }
            .custom-icon {
                font-family: var(--iconsFont);
                font-size: 1.15rem;
                vertical-align: bottom;
                margin-right: 0.675rem;
                color: var(--sunflower-700);
            }
            p {
                font-size: 0.8rem;
                line-height: 140%;
            }
            ol,
            ul {
                display: flex;
                flex-direction: column;
                padding-left: 1rem;
                margin-top: 0;
                width: 100%;
                box-sizing: border-box;
                li {
                    margin-top: 0.3rem;
                    line-height: 1.1rem;
                    &:last-of-type {
                        ul li:last-of-type {
                            margin-bottom: 0;
                        }
                    }
                }
            }

            ol {
                li {
                    list-style-type: decimal;
                }
            }

            ul {
                li {
                    list-style-type: '–  ';
                }
            }
            em {
                font-style: italic;
            }
            a {
                &.btn {
                    display: inline-flex;
                    font-weight: 700;
                    width: fit-content;
                    margin: 0.5rem 0.25rem;
                    .si-link-title {
                        line-height: initial;
                    }
                }
                &:not(.btn) {
                    text-decoration: underline;
                    &:hover {
                        text-decoration: none;
                    }
                }
            }
            img {
                max-width: 100%;
                height: auto;
                &.alignleft {
                    float: left;
                    margin: 0.5em 1em 0.5em 0;
                }
                &.aligncenter {
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                }
                &.alignright {
                    float: right;
                    margin: 0.5em 0 0.5em 1em;
                }
            }
        }
    }
</style>
