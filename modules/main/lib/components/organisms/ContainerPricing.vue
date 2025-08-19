<template>
    <SISection
        :text-color="content.background.text_color"
        :class="classNames"
        :background="content.background"
    >
        <SIWrapper align-items="flex-start" flex-direction="column">
            <PanelFilterPricing
                :items="options"
                @filters:change="setSelectedOption"
            />
        </SIWrapper>
        <div class="wrapper" :style="style">
            <ul class="options">
                <template v-for="(pricing, i) in content.pricings">
                    <SISwiper
                        v-show="selectedOption === i"
                        :key="i"
                        ref="swiper"
                        tag-el="li"
                        class="pricings"
                        :grab-cursor="false"
                    >
                        <CardPricing
                            v-for="(item, j) in pricing.items"
                            :key="j"
                            :title="item.pricing.title"
                            :price="item.pricing.price"
                            :recurrence="item.pricing.recurrence"
                            :features="item.pricing.features"
                            :button="item.pricing.button"
                            :highlighted="item.pricing.highlighted"
                            :is-mobile="isMobile"
                        />
                    </SISwiper>
                </template>
            </ul>
        </div>
    </SISection>
</template>
<script>
    import { mapState } from 'vuex'
    import SISection from '../atoms/SISection.vue'
    import SIWrapper from '../atoms/SIWrapper.vue'
    import PanelFilterPricing from '../molecules/PanelFilterPricing.vue'
    import CardPricing from '../molecules/CardPricing.vue'
    import SISwiper from '../organisms/SISwiper.vue'
    import oneSidePaddingMixin from '../../mixins/oneSidePaddingMixin'

    export default {
        name: 'ContainerPricing',
        components: {
            SIWrapper,
            SISection,
            PanelFilterPricing,
            CardPricing,
            SISwiper,
        },
        mixins: [oneSidePaddingMixin],
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        data: () => ({
            selectedOption: 0,
        }),
        computed: {
            ...mapState({
                windowWidth: state => state.general.windowWidth,
            }),
            style() {
                const { oneSidePadding } = this
                return {
                    paddingLeft: `${oneSidePadding}px`,
                    paddingRight: 0,
                }
            },
            isMobile() {
                return this.windowWidth <= 721
            },
            classNames() {
                return ['container-pricing']
            },
            options() {
                const { content } = this
                return content.pricings.map((pricing, index) => {
                    return {
                        text: pricing.title,
                        value: index,
                        name: 'option',
                    }
                })
            },
        },
        watch: {
            selectedOption(nV) {
                const { swiper } = this.$refs
                this.$nextTick(() => {
                    if (swiper[nV]) {
                        swiper[nV].update()
                    }
                })
            },
        },
        methods: {
            setSelectedOption(option) {
                this.selectedOption = option
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-pricing {
        display: flex;
        .si-wrapper {
            padding-bottom: 0;
            margin-bottom: 3rem;
        }
        .wrapper {
            display: flex;
            max-width: 100%;
            padding-bottom: var(--wrapperPaddingHorizontal);
            .options {
                display: flex;
                width: 100%;
            }
        }
    }
</style>
