<template>
    <div class="panel-filter-type-resource">
        <SIForm ref="form" @submit="onSubmit">
            <SIFormRow>
                <SITextField
                    class="search"
                    placeholder="Search"
                    name="s"
                    icon="search"
                    icon-position="right"
                    icon-color="sunflower-700"
                    @input="onInput"
                />
                <SISelect
                    ref="order"
                    name="order"
                    value="DESC"
                    :items="orderByItems"
                    @input="onInput"
                />
            </SIFormRow>
            <SIFormRow v-if="filters" class="start">
                <SIArrow ref="prev" icon="c-arrow-left" />
                <FiltersPostType
                    v-if="filters[filterTag]"
                    ref="filters"
                    :items="filters[filterTag]"
                    :tags="filterTag"
                    @input="onInput"
                />
                <SIArrow ref="next" icon="c-arrow-right" />
            </SIFormRow>
        </SIForm>
    </div>
</template>

<script>
    import { Swiper, Navigation } from 'swiper'
    import { mapState } from 'vuex'
    import SIArrow from '../atoms/SIArrow.vue'
    import SIForm from '../atoms/SIForm'
    import SIFormRow from '../atoms/SIFormRow'
    import SISelect from '../molecules/SISelect'
    import SISwiper from '../organisms/SISwiper.vue'
    import FiltersPostType from './FiltersPostType.vue'
    import SITextField from './SITextField.vue'
    export default {
        name: 'PanelFilterTypeResource',
        components: {
            SIArrow,
            SISwiper,
            FiltersPostType,
            SITextField,
            SIFormRow,
            SISelect,
            SIForm,
        },
        props: {
            filters: {
                type: Object,
                required: false,
                default: null,
            },
        },
        emits: ['filters:change'],
        computed: {
            ...mapState({
                wordings: state => state.options.options.wordings,
            }),
            orderByItems() {
                const { wordings } = this
                return [
                    {
                        value: 'DESC',
                        text: wordings.g_grid.order_by_desc,
                    },
                    {
                        value: 'ASC',
                        text: wordings.g_grid.order_by_asc,
                    },
                ]
            },
            filterTag() {
                return 'resource_category'
            },
        },
        beforeMount() {
            Swiper.use([Navigation])
        },
        mounted() {
            this.createSwiper()
        },
        methods: {
            createSwiper() {
                const { $refs } = this
                if (!$refs?.filters?.$el) return
                const options = {
                    slidesPerView: 'auto',
                    watchOverflow: true,
                    wrapperClass: 'si-checkbox',
                    navigation: {
                        nextEl: this.$refs.next.$el,
                        prevEl: this.$refs.prev.$el,
                    },
                }
                this.swiper = new Swiper($refs.filters.$el, options)
            },
            onSubmit(e) {
                this.$emit('filters:change', e.val)
            },
            onInput() {
                this.$refs.form.onSubmit()
            },
        },
    }
</script>

<style scoped lang="scss">
    .panel-filter-type-resource {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 3.2rem;
        .si-form {
            .si-form-row {
                margin: 0;
                align-items: center;
                &.start {
                    flex-direction: row !important;
                }
                &:not(:last-child) {
                    > * {
                        margin-bottom: 3.2rem;
                        @media screen and (max-width: $littleTabletBreakPoint) {
                            margin-bottom: 1rem;
                        }
                    }
                }
                &:not(.start) {
                    align-items: center;
                    justify-content: center;
                }
                > *:not(:first-child) {
                    margin-left: 1.2rem;
                }
                > * {
                    max-width: 100%;
                    overflow: hidden;
                }
                .search {
                    max-width: 20.8rem;
                    width: 100%;
                }
                .si-arrow {
                    flex-shrink: 0;
                    border: 1px solid var(--orange-700);
                }
            }
        }
    }
</style>
