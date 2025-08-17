<template>
    <div class="hero-tag">
        <div class="tags">
            <Tag v-for="(tag, i) in tags" :key="i" :title="tag.name" />
        </div>
        <WrittenBy v-if="authors && authors.length" :authors="authors" />
        <DateText v-if="publicationDate" :date="publicationDate" />
    </div>
</template>

<script>
    import Tag from '../atoms/Tag.vue'
    import DateText from '../molecules/DateText.vue'
    import WrittenBy from '../molecules/WrittenBy.vue'

    export default {
        name: 'HeroTag',
        components: { WrittenBy, DateText, Tag },
        props: {
            authors: {
                type: Array,
                required: false,
                default: null,
            },
            tags: {
                type: Array,
                required: false,
                default: null,
            },
            publicationDate: {
                type: String,
                required: false,
                default: null,
            },
        },
    }
</script>

<style scoped lang="scss">
    .hero-tag {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.1rem;
        width: 100%;
        .tags {
            display: flex;
            flex-wrap: wrap;
            .tag {
                margin: 0.4rem;
            }
        }
        .written-by {
            color: var(--white-100);
            margin-top: 1.2rem;
            text-align: center;
            max-width: 80%;
        }
        .date-text {
            margin-top: 0.5rem;
            :deep(:not(.si-icon)) {
                font-size: 0.7rem;
                font-weight: 400;
                line-height: 1.4em;
            }
        }
    }
</style>
