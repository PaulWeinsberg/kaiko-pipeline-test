<template>
    <component :is="tag[type]" v-bind="attr(item)" class="type-post" grid />
</template>

<script>
    import GridPost from '../molecules/GridPost.vue'
    import CardReportVideo from './CardReportVideo.vue'
    import CardInsightNew from '../molecules/CardInsightNew.vue'
    import CardRedirection from '../molecules/CardRedirection.vue'
    import CardNews from '../molecules/CardNews.vue'

    export default {
        name: 'TypePost',
        components: {
            GridPost,
            CardReportVideo,
            CardInsightNew,
            CardRedirection,
            CardNews,
        },
        props: {
            item: {
                type: Object,
                required: true,
            },
            type: {
                type: [String, Object],
                required: true,
            },
        },
        data: () => ({
            tag: {
                report: 'CardReportVideo',
                video: 'CardReportVideo',
                insight: 'CardInsightNew',
                redirection: 'CardRedirection',
                new: 'CardNews',
            },
        }),
        methods: {
            attr(item) {
                const { type } = this
                if (type === 'redirection') {
                    return {
                        title: item.customTitle || item.post.title,
                        content: item.customExcerpt || item.post.excerpt,
                        image: item?.customImage?.url || item.post.image,
                        link: item.post.url,
                    }
                } else if (type === 'new') {
                    return {
                        excerpt: item.fields.excerpt,
                        location: item.fields.location,
                        date: item.fields.publication_date,
                        tags: item.taxonomies.tag,
                        link: item.url,
                        image: item.image,
                        truncated: 250,
                        title: item.title,
                    }
                } else {
                    const valuesShared = {
                        title: item.title,
                        content: item.fields.excerpt || null,
                        path: item.url,
                        image: item.image,
                        taxonomies: item.taxonomies,
                        file: item.fields.document,
                        tag: 'li',
                        primary: true,
                        date: item.fields.publication_date,
                    }
                    if (type === 'report' || type === 'video')
                        return {
                            ...valuesShared,
                            design: type,
                        }
                    if (type === 'insight')
                        return {
                            ...valuesShared,
                            tags: item.taxonomies.tag,
                        }
                    return valuesShared
                }
            },
        },
    }
</script>
