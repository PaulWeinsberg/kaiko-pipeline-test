<template>
    <component :is="tag" class="tag-deletable">
        <p>
            <span class="title">{{ title }}</span>
            <SIIcon name="cross-circle" />
        </p>
    </component>
</template>

<script>
    import SIIcon from '../atoms/SIIcon'
    export default {
        name: 'TagDeletable',
        components: { SIIcon },
        props: {
            title: {
                type: String,
                required: true,
            },
            tag: {
                type: String,
                required: false,
                default: 'li',
            },
        },
    }
</script>

<style scoped lang="scss">
    .tag-deletable {
        display: flex;
        margin: 0.4rem 0.4rem 0 0;
        background-color: var(--blue-100);
        color: var(--dark-blue-200);
        border-radius: 4px;
        cursor: pointer;
        transition: color 0.3s var(--cubicBezier),
            background-color 0.3s var(--cubicBezier);
        &:hover {
            background-color: var(--dark-blue-200);
            color: var(--blue-100);
        }
        p {
            display: flex;
            align-items: center;
            padding: 0.3rem 0.45rem;
            span.title {
                margin-right: 0.45rem;
                line-height: 1.4em;
            }
            .si-icon {
                font-size: 0.65rem;
                transition: none;
            }
        }
    }
</style>
