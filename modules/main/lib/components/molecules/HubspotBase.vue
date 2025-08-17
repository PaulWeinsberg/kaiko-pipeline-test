<template>
    <div v-si-uid class="hubspot-base" />
</template>

<script>
    export default {
        name: 'HubspotBase',
        props: {
            vars: {
                type: Object,
                required: false,
                default: null
            },
            portalId: {
                type: String,
                required: false,
                default: null
            },
            formId: {
                type: String,
                required: false,
                default: null
            },
            onSubmit: {
                type: String,
                required: false,
                default: null,
            },
            file: {
                type: [Object, Boolean],
                required: false,
                default: null,
            },
        },
        data: () => ({
            loaded: false,
        }),
        watch: {
            loaded(nV) {
                if (nV) this.onLoad()
            },
        },
        mounted() {
            this.addScript()
            this.setIsLoadedRecursive()
        },
        methods: {
            /**
             * Insert le scrip permettant de faire fonctionner l'API Hubspot
             */
            addScript() {
                const scriptId = 'hubspot-script'
                const alreadySet = document.getElementById(scriptId)
                // Si c'est déjà inséré, on ne fait rien
                if (alreadySet) return null
                // Sinon on met le script
                const tag = document.createElement('script')
                const firstScriptTag =
                    document.getElementsByTagName('script')[0]
                tag.src = 'https://js.hsforms.net/forms/v2.js'
                tag.id = scriptId

                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
            },
            /**
             * Permet de vérifier si Hubspot existe. Si ce n'est pas le cas, on relance cette fonction
             */
            setIsLoadedRecursive() {
                setTimeout(() => {
                    if (typeof hbspt !== 'undefined') {
                        this.loaded = true
                    } else {
                        this.setIsLoadedRecursive()
                    }
                }, 100)
            },
            /**
             * Quand Hubspot est chargé, on peut commencer à jour avec
             */
            onLoad() {
                this.createForm()
            },
            /**
             * Permet de créer un formulaire Hubspot
             */
            createForm() {
                const { portalId, formId, $el, onSubmit, file, vars } = this
                const _vars = {
                    target: `#${$el.getAttribute('id')}`,
                    region: 'eu1',
                    ...vars
                }
                if(portalId) _vars.portalId = portalId
                if(formId) _vars.formId = formId

                if (onSubmit && onSubmit === 'file' && file) {
                    _vars.onFormSubmit = () => {
                        window.open(file.url, '_blank')
                    }
                }

                if(_vars.formId) hbspt.forms.create(_vars)
            },
        },
    }
</script>

<style scoped lang="scss">
    .hubspot-base {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        .hero & {
            margin-top: 0.7rem !important;
        }
        :deep(.submitted-message) {
            margin-top: 1rem;
        }
        :deep(form) {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            width: 100%;
            max-width: 32.8rem;
            @media screen and (max-width: $mobileBreakPoint) {
                flex-direction: column;
                align-items: center;
            }
            &.inline {
              flex-wrap: nowrap;
              @media screen and (min-width: $mobileBreakPoint) {
                gap: 1rem;
              }
            }
            > * {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 100%;
                margin-top: 1rem;
                .hs-main-font-element {
                    display: flex;
                    width: 100%;
                }
            }
            fieldset {
                display: grid;
                align-items: flex-start;
                grid-template-columns: 1fr;
                grid-gap: 1rem;
                width: 100%;
                max-width: unset;
                @media screen and (min-width: $littleMobileBreakPointMin) {
                    @for $i from 2 through 3 {
                        &.form-columns-#{$i} {
                            grid-template-columns: repeat(#{$i}, 1fr);
                        }
                    }
                }
            }
            .field {
                label {
                    display: flex;
                    margin-right: auto;
                }
                &.hs-fieldtype- {
                    &radio,
                    &checkbox,
                    &booleancheckbox {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        .input {
                            display: flex;
                            width: 100%;
                            ul {
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;
                                justify-content: center;
                                width: 100%;
                                li {
                                    display: flex;
                                    label {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        cursor: pointer;
                                        &:hover,
                                        &:focus {
                                            > span {
                                                &:before {
                                                    border-color: var(
                                                        --sunflower-700
                                                    );
                                                    .b-white-100 & {
                                                        border-color: var(
                                                            --orange-700
                                                        );
                                                    }
                                                }
                                            }
                                        }
                                        input {
                                            display: none;
                                        }
                                        input:checked + span::before {
                                            background-color: var(
                                                --sunflower-700
                                            );
                                            border-color: var(--sunflower-700);
                                        }
                                        > span {
                                            display: flex;
                                            align-items: flex-start;
                                            justify-content: center;
                                            font-size: 0.8rem;
                                            line-height: 160%;
                                            &::before {
                                                content: '';
                                                display: flex;
                                                width: 0.9rem;
                                                height: 0.9rem;
                                                flex-shrink: 0;
                                                border-radius: 4px;
                                                appearance: none;
                                                -webkit-appearance: none;
                                                border: 1px solid
                                                    var(--white-100);
                                                box-sizing: border-box;
                                                margin: 0.2rem 0.5rem 0 0;
                                                color: var(--white-100);
                                                transition: all 0.3s
                                                    var(--cubicBezier);
                                                .b-white-100 & {
                                                    border-color: var(
                                                        --sunflower-700
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    &checkbox,
                    &booleancheckbox {
                        > label {
                          .hs-form-required {
                            display: flex;
                          }
                        }
                        .input {
                            ul {
                                li {
                                    label {
                                        input:checked + span::before {
                                            content: '\eb0a';
                                            align-items: center;
                                            justify-content: center;
                                            font-family: var(--iconsFont);
                                            font-size: 0.75rem;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    &radio {
                        .input {
                            ul {
                                li {
                                    label {
                                        span {
                                            &::before {
                                                padding: 0.1rem;
                                                background-clip: content-box;
                                                border-radius: 50%;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    &text,
                    &number,
                    &phonenumber,
                    &select,
                    &textarea,
                    &date {
                        width: 100%;
                        .input {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            input,
                            select,
                            textarea {
                                font-family: var(--fontPrimary);
                                height: 2.4rem;
                                border: none;
                                border-radius: 15rem;
                                padding: 0.6rem 0.8rem;
                                box-sizing: border-box;
                                font-size: 0.8rem;
                                width: 100%;
                                .b-white-100 & {
                                    border: 1px solid var(--sunflower-700);
                                }
                            }
                        }
                    }
                    &select {
                        .input {
                            position: relative;
                            &:before {
                                content: '\eb07';
                                font-family: var(--iconsFont);
                                position: absolute;
                                color: var(--midnight-blue-700);
                                z-index: 5;
                                pointer-events: none;
                                transform: rotate(90deg);
                                right: 0.8rem;
                            }
                            select {
                                appearance: none;
                                padding-right: 2rem;
                            }
                        }
                    }
                    &textarea {
                        .input {
                            textarea {
                                border-radius: 1rem;
                                min-height: 6rem;
                            }
                        }
                    }
                    &date {
                        .input {
                            .hs-dateinput {
                                width: 100%;
                            }
                        }
                    }
                    &file {
                        display: flex;
                        width: 100%;
                    }
                    &date,
                    &file {
                        label {
                            margin-left: auto;
                        }
                    }
                }
                .hs-error-msgs {
                    display: flex;
                    align-self: center;
                    font-size: 0.6rem;
                    color: var(--error);
                    margin: 0.25rem 0 0 auto;
                    width: 100%;
                }
            }
            .hs-submit {
                flex-shrink: 0;
                width: auto;
                .actions {
                    position: relative;
                    @extend %btn;
                    @extend %btnPrimary;
                    padding: 0;
                    input {
                        background-color: transparent;
                        padding: 0.75rem 3.2rem 0.75rem 1.2rem;
                        .b-midnight-blue-700 &,
                        .c-white-100 & {
                            color: var(--white-100);
                        }
                        &:hover {
                            cursor: pointer;
                        }
                    }
                    &:after {
                        content: '\eafc';
                        font-family: var(--iconsFont);
                        position: absolute;
                        right: 1.45rem;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 0.9rem;
                        color: var(--sunflower-700);
                        transition: color 0.3s var(--cubicBezier);
                    }
                    &:hover {
                        input {
                            color: var(--white-100);
                            transition: 0.3s color 0.3s var(--cubicBezier);
                        }
                        &:after {
                            color: var(--white-100);
                            transition: 0.3s color 0.3s var(--cubicBezier);
                        }
                    }
                }
            }
            .hs_error_rollup,
            .hs-form-required {
                display: none;
            }
        }
    }
</style>
