<template>
    <HeroInsightNew
        v-if="design === 'insight' || design === 'new'"
        v-bind="attr"
    />
    <HeroReportVideo v-else v-bind="attr" />
</template>

<script>
    import HeroReportVideo from './HeroReportVideo.vue'
    import HeroInsightNew from './HeroInsightNew.vue'

    export default {
        name: 'HeroPostObject',
        components: { HeroReportVideo, HeroInsightNew },
        props: {
            design: {
                type: String,
                required: true,
            },
            items: {
                type: Array,
                required: false,
                default: null,
            },
        },
        computed: {
            primary() {
                const { items } = this
                if (!items || !items.length) return null
                return items[0]
            },
            others() {
                const { items } = this
                return items.filter((el, i) => i > 0)
            },
            attr() {
                const { design, primary, others } = this
                return {
                    design,
                    primary,
                    others,
                }
            },
        },
    }
</script>
