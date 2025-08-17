<template>
    <SIFormGroup :error="!!error">
        <SILabel :name="nameUnique" :title="label" :required="required" />
        <div class="si-file">
            <div
                class="si-file-container"
                @mouseenter="onMouseEnter"
                @mouseleave="onMouseLeave"
            >
                <input
                    :id="nameUnique"
                    ref="input"
                    class="hidden"
                    :multiple="multiple"
                    type="file"
                    :name="nameUnique"
                    :accept="accept"
                    @input="onInputIntern"
                />
                <SILink
                    btn
                    :hover="hover"
                    tag="div"
                    :title="buttonTitle"
                    background-color="grey-100"
                />
            </div>
            <TransitionGroup
                appear
                tag="ul"
                class="si-file-list"
                :css="false"
                @before-enter="beforeEnter"
                @enter="enter"
                @leave="leave"
            >
                <TagDeletable
                    v-for="(file, i) in files"
                    :key="file.id"
                    :title="file.name"
                    @click.native="onItemClick(i)"
                />
            </TransitionGroup>
        </div>
        <p v-if="message" class="message">{{ message }}</p>
        <p v-if="error" class="message error">{{ error }}</p>
    </SIFormGroup>
</template>

<script>
    import { gsap } from 'gsap'
    import { stringSlugify } from '../../core'
    import SIFormGroup from '../atoms/SIFormGroup'
    import SILabel from '../atoms/SILabel'
    import formComponentsMixin from '../../mixins/formComponentsMixin'
    import SILink from './SILink'
    import TagDeletable from './TagDeletable'
    export default {
        name: 'SIFile',
        components: { TagDeletable, SILink, SILabel, SIFormGroup },
        mixins: [formComponentsMixin],
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
            multiple: {
                type: Boolean,
                required: false,
                default: false,
            },
            label: {
                type: String,
                required: false,
                default: null,
            },
            maxSize: {
                type: [Number, String],
                required: false,
                default: 5,
            },
            accept: {
                type: String,
                required: false,
                default: 'image/*, application/pdf',
            },
            buttonTitle: {
                type: String,
                required: false,
                default: 'Choisir un fichier',
            },
        },
        data: () => ({
            hover: false,
            files: [],
            animIndex: 0,
        }),
        computed: {
            maxSizeIntern() {
                const { maxSize } = this
                // mo to octet
                return maxSize * 1000000
            },
        },
        methods: {
            /**
             * Quand on ajoute un fichier
             */
            onInputIntern(e) {
                const { nameUnique } = this
                // On reset l'animation
                this.animIndex = 0
                // On parcourt nos fichiers
                this.readFiles(e)
                // On créer un nouveau type de fichier pour le back
                const fileForm = new FormData()
                fileForm.append(this.name, this.files)
                // On set nos valeurs pour que les erreurs soient gérées comme le reste
                this.valueInternal = this.files
                // On emit nos datas importantes
                this.$nuxt.$emit('input', {
                    name: nameUnique,
                    val: fileForm,
                    isValid: this.isValid(),
                })
            },
            /**
             * Quand on passe au hover sur un élément
             */
            onMouseEnter() {
                this.hover = true
            },
            /**
             * Quand on quitte le hover sur un élément
             */
            onMouseLeave() {
                this.hover = false
            },
            /**
             * Permet de lire les fichiers présent dans le champ
             * @param {Event} e
             */
            readFiles(e) {
                const { maxSizeIntern, multiple } = this
                if (!multiple) this.files = []
                // On récupère la liste des fichiers
                const { files } = e.target
                if (!files || !files.length) return
                // On les parcours
                Array.from(files).forEach(file => {
                    if (file.size > maxSizeIntern) {
                        this.$toaster.error(
                            `Ce fichier est trop lourd : ${file.name}`
                        )
                        return
                    }
                    // On met un id unique
                    file.id = `${stringSlugify(file.name)}_${Math.random()}}`
                    this.files.push(file)
                })
                // On reset les fichiers contenues dans le champ
                const fileBuffer = new DataTransfer()
                this.$refs.input.files = fileBuffer.files
            },
            /**
             * Au click sur un item
             * @param {number} index L'index de l'élément
             */
            onItemClick(index) {
                // On supprime l'élément
                this.files.splice(index, 1)
                this.isValid()
            },
            /**
             * Permet de vérifier que le champ est valide
             * @return {boolean} Est-ce que le champ est valide ou non
             */
            isValid() {
                const { required, files } = this
                return required ? !!files.length : true
            },
            /**
             * Permet de gérer l'élément avant l'animation d'entrée
             */
            beforeEnter(el) {
                gsap.set(el, {
                    opacity: 0,
                    y: 10,
                })
            },
            /**
             * Animation d'entrée
             */
            enter(el, done) {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    delay: this.animIndex * 0.1,
                    duration: 0.3,
                    onComplete: () => done(),
                })
                this.animIndex++
            },
            /**
             * Animation de sortie
             */
            leave(el, done) {
                gsap.to(el, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => done(),
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-file {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        .si-file-container {
            display: flex;
            position: relative;
            width: 100%;
            input {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 5;
                opacity: 0;
                cursor: pointer;
            }
            .si-link {
                position: relative;
                justify-content: center;
                text-align: center;
                width: 100%;
                text-transform: initial;
                font-weight: 400;
                padding: 0.8rem 1.25rem;
            }
        }
        .si-file-list {
            display: flex;
            flex-wrap: wrap;
            li {
                display: flex;
                margin: 0.4rem 0.4rem 0 0;
                background-color: var(--blue-100);
                color: var(--dark-blue-200);
                border-radius: 4px;
                cursor: pointer;
                transition: color 0.3s var(--cubicBezier),
                    background-color 0.3s var(--cubicBezier);
                &:hover {
                    background-color: var(--dark-blue-200);
                    color: var(--blue-100);
                }
                p {
                    display: flex;
                    align-items: center;
                    padding: 0.3rem 0.45rem;
                    span.title {
                        margin-right: 0.45rem;
                        line-height: 1.4em;
                    }
                    .si-icon {
                        font-size: 0.65rem;
                        transition: none;
                    }
                }
            }
        }
    }
</style>
