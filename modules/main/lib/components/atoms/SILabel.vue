<template>
    <!-- eslint-disable vue/no-v-html -->
    <label v-if="title" :class="classNames" :for="name" v-html="title" />
</template>

<script>
    export default {
        name: 'SILabel',
        props: {
            name: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: false,
                default: null,
            },
            required: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            classNames() {
                const { required } = this
                return ['si-label', { required }]
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-label {
        display: flex;
        font-size: 0.8rem;
        line-height: 1.5em;
        margin-bottom: 0.2rem;
        &.required {
            &:after {
                content: '*';
                color: var(--red-600);
                margin-left: 0.2rem;
            }
        }
    }
</style>
