<template>
    <SectionEdito class="container-faq" :column="isColumn" :content="content">
        <ul class="list-faq">
            <CardFAQ
                v-for="(faq, i) in content.faq"
                :key="i"
                :title="faq.title"
                :answer="faq.fields.answer"
            />
        </ul>
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
    import CardFAQ from '../molecules/CardFAQ.vue'
    import SectionEdito from './SectionEdito.vue'

    export default {
        name: 'ContainerFAQ',
        components: { CardFAQ, SectionEdito },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
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
    .container-faq {
        :deep(.si-wrapper) {
            @media screen and (max-width: $littleTabletBreakPoint) {
                align-items: flex-start !important;
            }
            .header {
                min-width: 12rem;
            }
        }
        .list-faq {
            display: flex;
            flex-direction: column;
            padding: 2rem;
            background: var(--gradient-blue-100);
            width: 100%;
            box-sizing: border-box;
        }
        .link-after {
            margin-top: 2rem;
            @media screen and (min-width: $littleTabletBreakPointMin) {
                display: none;
            }
        }
    }
</style>
