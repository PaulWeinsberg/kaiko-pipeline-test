<template>
    <footer id="mega-menu-footer">
        <SIWrapper>
            <ul>
                <MegaMenuFooterItem
                    v-for="(button, i) in items"
                    :key="i"
                    :title="button.text"
                    :path="button.link"
                    :excerpt="button.excerpt"
                />
            </ul>
        </SIWrapper>
    </footer>
</template>

<script>
    import SIWrapper from '../atoms/SIWrapper.vue'
    import MegaMenuFooterItem from './MegaMenuFooterItem.vue'

    export default {
        name: 'MegaMenuFooter',
        components: { MegaMenuFooterItem, SIWrapper },
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    #mega-menu-footer {
        display: flex;
        background-color: var(--electric-blue-700);
        width: 100%;
        margin-top: auto;
        .si-wrapper {
            padding: 0 2.4rem;
            @media screen and (max-width: $mobileBreakPoint) {
                padding: 0 2rem;
            }
            ul {
                display: flex;
                flex-wrap: wrap;
            }
        }
    }
</style>
