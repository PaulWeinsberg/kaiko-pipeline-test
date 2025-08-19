<template>
    <SILink :class="classNames" path="/">
        <SIImage :image="logo" />
    </SILink>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'SILogo',
        props: {
            footer: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            ...mapState({
                options: state => state.options.options,
            }),
            classNames() {
                return ['si-logo']
            },
            logo() {
                const { footer, options } = this
                const { logo_footer, logo } = options
                if (footer && logo_footer) return logo_footer
                return logo
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-logo {
        width: auto;
        height: 50%;
        @media screen and (max-width: $mobileBreakPoint) {
            height: 70%;
        }
        :deep(figure) {
            height: 100%;
            img {
                object-fit: contain;
            }
        }
    }
</style>
