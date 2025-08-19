<template>
    <div class="hero-insight-new">
        <CardInsightNew
            v-if="primary"
            primary
            v-bind="attr(primary)"
            :truncated="230"
        />
        <ul class="container">
            <CardInsightNew
                v-bind="attr(others[0])"
                tag="li"
                :truncated="100"
            />
            <li class="separator"><hr /></li>
            <CardInsightNew
                v-bind="attr(others[1])"
                tag="li"
                :truncated="100"
            />
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import CardInsightNew from '../molecules/CardInsightNew.vue'
    export default {
        name: 'HeroInsightNew',
        components: { CardInsightNew },
        props: {
            design: {
                type: String,
                required: true,
            },
            primary: {
                type: Object,
                required: true,
            },
            others: {
                type: Array,
                required: true,
            },
        },
        computed: {
            ...mapState({
                options: state => state.options.options,
            }),
        },
        methods: {
            attr(item) {
                const { options } = this
                return {
                    date: item.item.fields.publication_date,
                    title: item.item.title,
                    content: item.item.fields.excerpt,
                    path: item.item.url,
                    image: item.item.image || options.default_image,
                    taxonomies: item.item.taxonomies,
                    tags: item.item.tags,
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .hero-insight-new {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1.2rem;
        @media screen and (max-width: 1360px) {
            grid-template-columns: 40% 60%;
        }
        @media screen and (max-width: 1180px) {
            grid-template-columns: 1fr;
            grid-gap: 2rem;
        }
        .container {
            display: flex;
            flex-direction: column;
            @media screen and (max-width: 1180px) {
                display: grid;
                grid-gap: 2rem;
            }
            .separator {
                margin: 1.2rem 0;
                hr {
                    border: none;
                    width: 100%;
                    border-bottom: 1px solid var(--midnight-blue-500);
                }
                @media screen and (max-width: 1181px) {
                    display: none;
                }
            }
        }
    }
</style>
