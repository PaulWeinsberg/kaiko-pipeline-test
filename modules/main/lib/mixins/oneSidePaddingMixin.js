import { elementGetOneSidePadding } from './../core'

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
            this.oneSidePadding = elementGetOneSidePadding({})
        },
    },
}
