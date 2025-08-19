<template>
    <footer class="base-footer">
        <SIWrapper align-items="unset" justify-content="space-between">
            <SILogo footer />
            <MenuFooter v-if="footer" :content="footer" />
            <GridContactFooter
                :information="options"
                :social-medias="socialMedias"
            />
        </SIWrapper>
        <SubMenuFooter v-if="subFooter" :sub-footer="subFooter" />
        <SISignature />
    </footer>
</template>

<script>
    export default {
        name: 'BaseFooter',
        props: {
            footer: {
                type: Array,
                required: true,
            },
            options: {
                type: Object,
                required: true,
            },
            subFooter: {
                type: Array,
                required: false,
                default: null,
            },
            socialMedias: {
                type: Array,
                required: false,
                default: null,
            },
        },
    }
</script>

<style scoped lang="scss">
    .base-footer {
        display: flex;
        flex-direction: column;
        background-color: var(--midnight-blue-700);
        .si-wrapper {
            padding-bottom: 0;
            @media screen and (max-width: $tabletBreakPoint) {
                flex-wrap: wrap;
            }
            @media screen and (max-width: $mobileBreakPointMin) {
                padding-top: 4rem;
            }
            .si-logo {
                flex-shrink: 0;
                margin-bottom: 2rem;
                margin-right: 6.5%;
            }
        }
    }
</style>
