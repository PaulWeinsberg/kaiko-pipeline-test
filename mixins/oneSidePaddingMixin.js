import { getOneSidePadding } from '@/utils/helpers'

export default {
    data: () => ({
        oneSidePadding: 0,
    }),
    beforeMount() {
        this.setPaddingWysiwyg()
    },
    mounted() {
        window.addEventListener('resize', this.setPaddingWysiwyg, false)
    },
    destroyed() {
        window.removeEventListener('resize', this.setPaddingWysiwyg, false)
    },
    methods: {
        setPaddingWysiwyg() {
            this.oneSidePadding = getOneSidePadding({})
        },
    },
}
