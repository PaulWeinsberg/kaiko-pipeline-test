<template>
    <li class="card-document-download">
        <div class="head">
            <p class="title h6">{{ title }}</p>
            <SIIcon :name="icon" />
        </div>
        <div class="content">
            <SIWys v-if="content" class="excerpt" :content="content" />
            <SILink
                link
                class="more"
                :title="button"
                :icon="wordings.icon"
                icon-position="left"
                :path="linkButton"
            />
        </div>
    </li>
</template>

<script>
    import { mapState } from 'vuex'
    import SIIcon from '../atoms/SIIcon.vue'
    import SILink from './SILink.vue'
    import SIWys from './SIWys.vue'

    export default {
        name: 'CardDocumentDownload',
        components: { SIWys, SIIcon, SILink },
        props: {
            icon: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: false,
                default: null,
            },
            document: {
                type: Object,
                required: true,
            },
        },
        computed: {
            ...mapState({
                wordings: state =>
                    state.options.options.wordings.g_doc_download,
            }),
            button() {
                const { wordings, title } = this
                if (title) return wordings.text.replace('{{TITLE}}', title)
                return wordings.text.replace('{{TITLE}}', '')
            },
            linkButton() {
                const { file_link, file, file_type } = this.document
                if (file_type === 'link') return file_link
                return file.url
            },
        },
    }
</script>

<style scoped lang="scss">
    .card-document-download {
        display: flex;
        flex-direction: column;
        color: var(--white-100);
        padding: 2rem;
        min-height: 29vw;
        box-sizing: border-box;
        .head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2rem;
            .si-icon {
                font-size: 3rem;
                @media screen and (max-width: $littleTabletBreakPoint) {
                    font-size: 2rem;
                }
            }
        }
        .content {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            .excerpt {
                margin-bottom: 1rem;
            }
        }
    }
</style>
