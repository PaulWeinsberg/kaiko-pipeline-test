<template>
    <header id="base-header" :class="classNames">
        <UponHeader
            v-if="options.headband_text"
            :text="options.headband_text"
            :link="options.headband_link"
            :duration="options.headband_base_duration"
        />
        <div class="header">
            <SIWrapper name="menu" overflow="initial">
                <SILogo ref="logo" />
                <div class="container">
                    <div ref="content" class="content">
                        <MenuHeader ref="menu" :items="headerItems" />
                        <SearchBar
                            v-if="search"
                            ref="search"
                            :base-url="baseUrl"
                        />
                        <div v-if="buttons" ref="buttons" class="buttons">
                            <SILink
                                v-for="(button, i) in buttons"
                                :key="i"
                                :class="{
                                    'hide-responsive': button.hide_responsive,
                                }"
                                btn
                                :target="
                                    button.type === 'external' ? '_blank' : ''
                                "
                                :design="button.design"
                                :title="button.text"
                                :path="button.link"
                                icon="c-arrow-right"
                                icon-position="right"
                            />
                        </div>
                    </div>
                </div>
                <MenuBurger ref="burger" @click="onClickBurger" />
            </SIWrapper>
        </div>
    </header>
</template>

<script>
    import gsap from 'gsap'
    import { mapState } from 'vuex'
    import MenuBurger from '../atoms/MenuBurger.vue'
    import SearchBar from '../molecules/SearchBar.vue'
    import SILink from '../molecules/SILink.vue'
    import UponHeader from '../molecules/UponHeader.vue'

    export default {
        name: 'BaseHeader',
        components: { SearchBar, UponHeader, MenuBurger, SILink },
        props: {
            search: {
                type: Boolean,
                required: false,
                default: false,
            },
            hasMegaMenu: {
                type: Boolean,
                required: false,
                default: true,
            },
            baseUrl: {
                type: String,
                required: false,
                default: '',
            },
        },
        data: () => ({
            headerItemsIntern: null,
            headerItemsRemoved: [],
            open: false,
            mobileColumn: 0,
        }),
        computed: {
            ...mapState({
                header: state => state.menu.menu,
                windowWidth: state => state.general.windowWidth,
                options: state => state.options.options,
            }),
            classNames() {
                const { open, hasMegaMenu } = this
                return [{ open }, { 'has-mega-menu': hasMegaMenu }]
            },
            buttons() {
                const { header } = this
                const { custom_fields } = header
                if (!custom_fields) return null
                return custom_fields.buttons || null
            },
            headerItems() {
                const { header, headerItemsRemoved } = this
                const items = [...header.items]

                return items.map(item => {
                    return {
                        ...item,
                        hide: headerItemsRemoved.includes(item.id),
                    }
                })
            },
        },
        mounted() {
            this.$nuxt.$on('header:mobile:show', this.onMobileShow)
            this.$nuxt.$on('header:close', this.closeHeader)
            this.$nuxt.$on('navigation:show', ({ show }) => {
                if (!show) this.closeHeader()
            })
        },
        methods: {
            closeHeader() {
                const { burger, content } = this.$refs
                this.open = false
                if (burger) burger.close()

                // Quand on ferme le menu, on clean la CSS inline pour ne pas péter le menu desktop
                if (!content) return
                gsap.set(content, {
                    clearProps: 'all',
                })
            },
            onClickBurger({ open }) {
                this.open = open
                if (open) {
                    this.onMobileShow({ column: 0, transition: false })
                }

                this.$nuxt.$emit('navigation:show', { show: open })
            },
            onMobileShow({ column, transition = true }) {
                const { content } = this.$refs
                if (!content) return
                gsap.to(content, {
                    x: column * 100 === 0 ? '' : `${-(column * 100)}%`,
                    duration: transition ? 0.3 : 0,
                    ease: 'basic',
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    #base-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        height: var(--baseHeaderHeight);
        width: 100%;
        margin: 0 auto;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: var(--white-100);
        box-sizing: border-box;
        @media screen and (max-width: $menuBreakpoint) {
            border-bottom: 1px solid transparent;
            &.open {
                border-color: var(--black-300);
            }
        }
        .header {
            display: flex;
            width: 100%;
            height: var(--headerHeight);
            .si-wrapper {
                height: 100%;
                .container {
                    display: flex;
                    width: 100%;
                    @media screen and (min-width: $menuBreakpointMin) {
                        height: 100%;
                    }
                    @media screen and (max-width: $menuBreakpoint) {
                        display: none;
                        flex-direction: column;
                        background-color: var(--white-100);
                        position: absolute;
                        left: 0;
                        top: var(--headerHeight);
                        width: 100%;
                        height: calc(100vh - var(--headerHeight));
                        overflow-y: auto;
                        overflow-x: hidden;
                        @include parent-has-class('.open') {
                            display: flex;
                        }
                    }
                    .content {
                        display: flex;
                        box-sizing: border-box;
                        width: 100%;
                        @media screen and (max-width: $menuBreakpoint) {
                            position: relative;
                            flex-direction: column;
                            padding: 0 0.8rem 4rem;
                        }
                        .buttons {
                            display: flex;
                            align-items: center;
                            @media screen and (max-width: $menuBreakpoint) {
                                flex-direction: column;
                                margin-top: 1.2rem;
                            }
                            > * {
                                @media screen and (max-width: $menuBreakpoint) {
                                    justify-content: center;
                                }
                                &:not(:first-child) {
                                    @media screen and (min-width: $menuBreakpointMin) {
                                        margin-left: 1.2rem;
                                    }
                                    @media screen and (max-width: $menuBreakpoint) {
                                        margin-top: 1.2rem;
                                    }
                                }
                            }
                            .hide-responsive {
                                @media screen and (max-width: 1220px) {
                                    display: none;
                                }
                            }
                        }
                    }
                }
                .si-burger {
                    display: none;
                    margin-left: 1.8rem;
                    @include parent-has-class('.has-mega-menu') {
                        display: flex;
                    }
                    @media screen and (max-width: $menuBreakpoint) {
                        display: flex;
                        margin-left: auto;
                    }
                }
            }
        }
    }
</style>
