<template>
    <SectionEdito class="container-code" :column="isColumn" :content="content">
        <pre>
          <code v-si-highlight="content.code" class="cURL" />
        </pre>
        <SILink
            v-if="content.add_cta && !isColumn"
            class="link-after"
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
    import { mapState } from 'vuex'
    import SectionEdito from './SectionEdito.vue'

    export default {
        name: 'ContainerCode',
        components: { SectionEdito },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        data: () => ({
            code: '',
        }),
        computed: {
            ...mapState({
                windowWidth: state => state.general.windowWidth,
            }),
            isColumn() {
                const { windowWidth } = this
                return windowWidth && windowWidth > 920
            },
        },
    }
</script>

<style scoped lang="scss">
    @import url('highlightjs/styles/night-owl.css');

    .container-code {
        :deep(.si-wrapper) {
            align-items: center !important;
            @media screen and (max-width: $littleTabletBreakPoint) {
                align-items: flex-start !important;
            }
            .header {
                flex: 1;
            }
        }
        pre {
            display: flex;
            width: 50%;
            @media screen and (max-width: $littleTabletBreakPoint) {
                width: 100%;
            }
            code {
                width: 100%;
                white-space: break-spaces;
            }
        }
        .link-after {
            margin-top: 2rem;
            @media screen and (min-width: $littleTabletBreakPointMin) {
                display: none;
            }
        }
    }
</style>

<style lang="scss">
    .hljs {
        &-keyword {
            color: #50fa7b;
        }
        &-selector-tag {
            color: #8be9fd;
        }
        &-literal {
            color: #8be9fd;
        }
        &-section {
            color: #8be9fd;
        }
        &-link {
            color: #8be9fd;
        }
        &-function .snippet-keyword {
            color: #ff79c6;
        }
        &-subst {
            color: #f8f8f2;
        }
        &-string {
            color: #f1fa8c;
        }
        &-title {
            color: #f1fa8c;
        }
        &-name {
            color: #f1fa8c;
        }
        &-type {
            color: #f1fa8c;
        }
        &-attribute {
            color: #f1fa8c;
        }
        &-symbol {
            color: #f1fa8c;
        }
        &-bullet {
            color: #f1fa8c;
        }
        &-addition {
            color: #f1fa8c;
        }
        &-variable {
            color: #f1fa8c;
        }
        &-template-tag {
            color: #f1fa8c;
        }
        &-template-variable {
            color: #f1fa8c;
        }
        &-comment {
            color: #6272a4;
        }
        &-quote {
            color: #6272a4;
        }
        &-deletion {
            color: #6272a4;
        }
        &-meta {
            color: #6272a4;
        }
        &-emphasis {
            font-style: italic;
        }
    }
</style>
