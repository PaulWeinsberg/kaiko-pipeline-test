<template>
    <div id="mega-menu-body">
        <SIImage
            v-if="backgroundImage"
            class="background-image"
            :image="backgroundImage"
            size="full_screen"
        />
        <SIWrapper align-items="flex-start" overflow="">
            <div class="container">
                <MegaMenuMenu
                    :style="style"
                    :items="items"
                    @show:children="onShowChildren"
                />
            </div>
        </SIWrapper>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import MegaMenuMenu from './MegaMenuMenu.vue'
    export default {
        name: 'MegaMenuBody',
        components: { MegaMenuMenu },
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
        data: () => ({
            height: '',
        }),
        computed: {
            ...mapState({
                backgroundImage: state =>
                    state.options.options.mega_menu_background_image,
            }),
            style() {
                const { height } = this
                return {
                    minHeight: height ? `${height}px` : '',
                }
            },
        },
        methods: {
            onShowChildren({ menu }) {
                if (!menu) return
                this.height = 0
                this.$nextTick(() => {
                    this.height = menu.clientHeight
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    #mega-menu-body {
        display: flex;
        height: 100%;
        width: 100%;
        position: relative;
        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .si-wrapper {
            padding: 0 3.6rem;
            min-height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            @media screen and (max-width: $littleLaptopBreakPoint) {
                padding: 0 0.8rem;
            }
            .container {
                display: flex;
                width: 100%;
                position: relative;
                padding: 4.5rem 0;
                box-sizing: border-box;
                min-height: 100%;
                overflow: hidden;
            }
        }
    }
</style>
