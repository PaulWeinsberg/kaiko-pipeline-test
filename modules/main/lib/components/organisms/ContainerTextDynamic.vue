<template>
    <SectionEdito class="container-text-dynamic" :content="content">
        <ul ref="content" class="content">
            <CardTextDynamic
                v-for="(item, i) in content.texts"
                :key="i"
                ref="items"
                :title="item.title"
                :content="item.content"
                :show="active === i"
                :is-mobile="isMobile"
                @click:item="onClickItem($event, i)"
            />
        </ul>
    </SectionEdito>
</template>

<script>
    import gsap from 'gsap'
    import { mapState } from 'vuex'
    import CardTextDynamic from '../molecules/CardTextDynamic.vue'
    import SectionEdito from './SectionEdito.vue'

    export default {
        name: 'ContainerTextDynamic',
        components: { CardTextDynamic, SectionEdito },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
        data: () => ({
            active: 0,
        }),
        computed: {
            ...mapState({
                windowWidth: state => state.general.windowWidth,
            }),
            isMobile() {
                const { windowWidth } = this
                return windowWidth && windowWidth <= 720
            },
        },
        watch: {
            isMobile(nV) {
                if (nV) this.setHeight(0)
            },
        },
        mounted() {
            this.observerHeight()
            window.addEventListener('resize', this.setHeight, false)
        },
        destroyed() {
            window.removeEventListener('resize', this.setHeight, false)
        },
        methods: {
            /**
             * Permet de récupérer la première height de l'élément et à la set
             */
            setHeight(height = null) {
                const { active, $refs } = this
                const { items, content } = $refs
                items[active].setCardHeight()
                let minHeight = items[active].height
                if (height !== null) minHeight = height
                gsap.set(content, {
                    minHeight: `${minHeight}px`,
                })
            },
            /**
             * Au clic sur un élement
             * @param {Number} height La hauteur de l'élément
             * @param {Number} i L'index de l'élément
             */
            onClickItem({ height }, i) {
                this.active = i
                this.smoothHeightChange(height)
            },
            /**
             * Permet d'avoir un changement de hauteur smooth pour les texts
             */
            smoothHeightChange(height) {
                const { content } = this.$refs
                gsap.to(content, {
                    minHeight: `${height}px`,
                    duration: 0.5,
                })
            },
            /**
             * Permet de calculer la hauteur dès que le bloc s'affiche à l'écran
             */
            observerHeight() {
                const options = {
                    threshold: 0,
                }
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) this.setHeight()
                    })
                }, options)
                observer.observe(this.$el)
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-text-dynamic {
        .content {
            display: flex;
            flex-direction: column;
            width: 100%;
            position: relative;
        }
    }
</style>
