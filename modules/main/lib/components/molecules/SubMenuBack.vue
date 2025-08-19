<template>
    <div class="sub-menu-back" @click="onClickBack">
        <SIIcon name="c-caret-right" />
        <p>{{ title }}</p>
    </div>
</template>

<script>
    export default {
        name: 'SubMenuBack',
        props: {
            title: {
                type: String,
                required: true,
            },
            column: {
                type: Number,
                required: false,
                default: 0,
            },
        },
        methods: {
            onClickBack() {
                const { column } = this
                this.$nuxt.$emit('header:mobile:show', { column })
            },
        },
    }
</script>

<style scoped lang="scss">
    .sub-menu-back {
        display: none;
        align-items: center;
        padding: 1.3rem 0;
        color: var(--midnight-blue-400);
        box-sizing: border-box;
        border-bottom: 1px solid var(--black-400);
        width: calc(100% - 1.6rem);
        margin: 0 auto;
        cursor: pointer;
        @media screen and (max-width: $menuBreakpoint) {
            display: flex;
        }
        &:hover {
            p {
                text-decoration: underline;
            }
        }
        .si-icon {
            transform: rotate(180deg);
            font-size: 0.6rem;
            padding: 0 0.25rem;
            margin-right: 0.6rem;
        }
        p {
            font-weight: 400;
            font-size: 0.7rem;
            line-height: 140%;
        }
    }
</style>
