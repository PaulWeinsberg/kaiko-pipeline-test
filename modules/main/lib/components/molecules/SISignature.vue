<template>
    <p class="si-signature">
        <SILink
            link
            path="https://www.spin-interactive.com/"
            type="external"
            target="_blank"
            title="Powered by Spin Interactive "
        />
    </p>
</template>

<script>
    export default {
        name: 'SISignature',
    }
</script>

<style scoped lang="scss">
    .si-signature {
        padding-bottom: 1.6rem;
        text-align: center;
        background-color: var(--midnight-blue-700);

        &:before {
            padding-bottom: 1.6rem;
            content: '';
            display: block;
            border-top: 1px solid var(--midnight-blue-500);
        }

        .si-link {
            display: unset;
        }

        :deep(.si-link-title) {
            color: var(--black-500);
            font-size: 0.7rem;
        }

        @media screen and (max-width: $mobileBreakPointMin) {
            padding-left: var(--wrapperPaddingHorizontal);
            padding-right: var(--wrapperPaddingHorizontal);
        }
    }
</style>
