<template>
    <SIMain id="error-page">
        <SISection>
            <SIImage
                v-if="options.page_not_found.image"
                background
                :image="options.page_not_found.image"
                :filter-opacity="0.4"
            />
            <SIWrapper flex-direction="column" justify-content="center">
                <SIWys :content="options.page_not_found.content" />
            </SIWrapper>
        </SISection>
    </SIMain>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'TplError',
        computed: {
            ...mapState({
                options: state => state.options.options,
            }),
        },
    }
</script>

<style scoped lang="scss">
    #error-page {
        section {
            flex: 1;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
            .si-image {
                position: absolute;
                inset: 0;
            }
        }
    }
</style>
