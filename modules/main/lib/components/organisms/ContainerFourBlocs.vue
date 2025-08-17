<template>
    <SectionEdito class="container-four-blocs" :content="content">
        <SISwiper class="grid-four-blocs">
            <CardOffice
                v-for="(office, i) in content.offices"
                :key="i"
                :content="office.content"
                :image="office.picture"
            />
        </SISwiper>
    </SectionEdito>
</template>

<script>
    import CardOffice from '../molecules/CardOffice.vue'
    import SectionEdito from './SectionEdito.vue'
    import SISwiper from './SISwiper.vue'

    export default {
        name: 'ContainerFourBlocs',
        components: { CardOffice, SISwiper, SectionEdito },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-four-blocs {
        :deep {
            .si-wrapper {
                overflow: hidden !important;
                .grid-four-blocs {
                    display: flex;
                    .swiper {
                        overflow: visible;
                    }
                }
            }
        }
    }
</style>
