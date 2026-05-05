<template>
    <component :is="tag[type]" v-bind="attr(item)" class="type-post" grid />
</template>

<script>
    import GridPost from '../molecules/GridPost.vue'
    import CardReportVideo from './CardReportVideo.vue'
    import CardInsightNew from '../molecules/CardInsightNew.vue'
    import CardRedirection from '../molecules/CardRedirection.vue'
    import CardNews from '../molecules/CardNews.vue'
    import CardResource from './CardResource.vue'

    export default {
        name: 'TypePost',
        components: {
            GridPost,
            CardReportVideo,
            CardInsightNew,
            CardRedirection,
            CardNews,
            CardResource
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
            background: {
                type: Object,
                required: false,
                default: null
            },
        },
        data: () => ({
            tag: {
                report: 'CardReportVideo',
                video: 'CardReportVideo',
                insight: 'CardInsightNew',
                redirection: 'CardRedirection',
                new: 'CardNews',
                resource: 'CardResource',
            },
        }),
        methods: {
            attr(item) {
                const { type, background } = this
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
                    if (type === 'resource') {
                        return {
                            ...valuesShared,
                            path: item.fields.download_only
                            ? item.fields.download_file?.url ?? item.fields.download_link
                            : item.url,
                            target: item.fields.download_only ? '_blank' : undefined,
                            hideCategories: item.hideCategories,
                            background
                        }
                    }
                    return valuesShared
                }
            },
        },
    }
</script>
