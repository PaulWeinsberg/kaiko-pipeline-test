<template>
    <a
        v-if="(to && isExternal && !prevent) || (isAnchor && !prevent)"
        :class="classNames"
        :href="path_"
        :target="_target"
        rel="noopener"
        @click="onClick"
    >
        <SIIcon v-if="icon && iconPosition === 'left'" :name="icon" />
        <span v-if="title" class="si-link-title">{{ title }}</span>
        <slot />
        <SIIcon v-if="icon && iconPosition === 'right'" :name="icon" />
    </a>
    <NuxtLink
        v-else-if="to && !prevent"
        :class="classNames"
        :to="to"
        :target="_target"
    >
        <SIIcon v-if="icon && iconPosition === 'left'" :name="icon" />
        <span v-if="title" class="si-link-title">{{ title }}</span>
        <slot />
        <SIIcon v-if="icon && iconPosition === 'right'" :name="icon" />
    </NuxtLink>
    <component :is="tag" v-else :class="classNames">
        <SIIcon v-if="icon && iconPosition === 'left'" :name="icon" />
        <span v-if="title" class="si-link-title">{{ title }}</span>
        <slot />
        <SIIcon v-if="icon && iconPosition === 'right'" :name="icon" />
    </component>
</template>

<script>
    import { scrollTo } from '../../core'

    export default {
        name: 'SILink',
        props: {
            tag: {
                type: String,
                required: false,
                default: 'p',
            },
            title: {
                type: String,
                required: false,
                default: null,
            },
            path: {
                type: String,
                required: false,
                default: null,
            },
            name: {
                type: String,
                required: false,
                default: null,
            },
            params: {
                type: Object,
                required: false,
                default: () => ({}),
            },
            target: {
                type: String,
                required: false,
                default: null,
            },
            backgroundColor: {
                type: String,
                required: false,
                default: 'white-100',
            },
            btn: {
                type: Boolean,
                required: false,
                default: false,
            },
            link: {
                type: Boolean,
                required: false,
                default: false,
            },
            icon: {
                type: String,
                required: false,
                default: null,
            },
            iconPosition: {
                type: String,
                required: false,
                default: 'left',
            },
            reverse: {
                type: Boolean,
                required: false,
                default: false,
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            },
            prevent: {
                type: Boolean,
                required: false,
                default: false,
            },
            mimicPath: {
                type: Boolean,
                required: false,
                default: true,
            },
            design: {
                type: String,
                required: false,
                default: 'primary',
            },
            hover: {
                type: Boolean,
                required: false,
                default: null,
            },
        },
        computed: {
            classNames() {
                const {
                    btn,
                    link,
                    backgroundColor,
                    icon,
                    reverse,
                    prevent,
                    isActive,
                    isExactActive,
                    mimicPath,
                    path,
                    design,
                    iconPosition,
                    hover,
                } = this
                const classNames = [
                    'si-link',
                    backgroundColor,
                    design,
                    { hover },
                    { 'has-icon': icon },
                    { 'mimic-path': (mimicPath && !path) || !!path },
                    { reverse },
                    { prevent },
                ]

                if (!btn && link) classNames.push('link')
                if (btn && !link) classNames.push('btn')
                if (icon) classNames.push(`icon-${iconPosition}`)
                if (isActive && prevent) classNames.push('nuxt-link-active')
                if (isExactActive && prevent) {
                    classNames.push('nuxt-link-exact-active')
                }
                return classNames
            },
            path_() {
                const { $config, path } = this
                if (!path || (!path.startsWith($config.baseUrl) && !path.startsWith($config.alternateBaseUrl))) return path
                const processedPath = path
                    .replace($config.alternateBaseUrl, '/')
                    .replace($config.baseUrl, '/')
                    .replace(/^\/\//, '/')
                return processedPath === '/#nolink' ? '' : processedPath;
            },
            isExternal() {
                const { path_ } = this
                return path_.startsWith('http')
            },
            to() {
                const { path_, params, name } = this
                if (path_ && path_ !== '#') return path_
                if (name) return { name, params }
                return null
            },
            _target() {
                const { isExternal, target } = this
                if (isExternal) return '_blank'
                return target
            },
            isActive() {
                const { to, $route } = this
                if (!to || !to.path || to.path === '#') return false
                return $route.path.includes(to.path)
            },
            isExactActive() {
                const { to, $route } = this
                if (!to || !to.path || to.path === '#') return false
                return to.path === $route.path
            },
            isAnchor() {
                const { path_ } = this
                if (!path_) return false
                return path_.startsWith('#')
            },
        },
        methods: {
            onClick(e) {
                const { isAnchor, path_ } = this
                if (!isAnchor) return false
                e.preventDefault()
                scrollTo(path_, {
                    toVars: { duration: 0.3 },
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-link {
        display: flex;
        align-items: center;
        &.link {
            font-weight: 700;
            font-size: 0.8rem;
            line-height: 100%;
            &.primary {
                color: var(--sunflower-700);
            }
            &.secondary {
                color: var(--electric-blue-700);
            }
            &.tertiary {
                color: var(--white-100);
            }
            &.quaternary {
                color: var(--midnight-blue-700);
            }

            &.has-icon {
                &.icon-left {
                    .si-icon {
                        margin-right: 0.4rem;
                    }
                }
                &.icon-right {
                    .si-icon {
                        margin-left: 0.4rem;
                    }
                }
            }
        }
        &.btn {
            @extend %btn;
            &.primary {
                @extend %btnPrimary;
            }
            &.secondary {
                background-color: transparent;
                border-color: var(--black-400);
                .si-icon {
                    color: var(--black-400);
                }
                &:hover,
                &:focus,
                &.hover {
                    color: var(--midnight-blue-700);
                    .si-icon {
                        color: var(--midnight-blue-700);
                    }
                    &:before {
                        background-color: var(--black-400);
                    }
                }
            }
            &.tertiary {
                background-color: transparent;
                border-color: var(--electric-blue-700);
                .si-icon {
                    color: var(--electric-blue-700);
                }
                &:before {
                    background-color: var(--electric-blue-700);
                }
                &:hover,
                &:focus,
                &.hover {
                    &,
                    .si-icon {
                        color: var(--white-100);
                    }
                }
            }
            &.quaternary {
                background-color: transparent;
                &:before {
                    background-color: var(--midnight-blue-700);
                }
                &:hover,
                &:focus,
                &.hover {
                    &,
                    .si-icon {
                        color: var(--white-100);
                    }
                }

                .b-midnight-blue-700 & {
                    &:before {
                        background-color: var(--white-100);
                    }

                    &:hover,
                    &:focus,
                    &.hover {
                        color: var(--midnight-blue-700);
                        &,
                        .si-icon {
                            color: var(--midnight-blue-700);
                        }
                    }
                }
            }

            &.has-icon {
                &.icon-left {
                    .si-icon {
                        margin-right: 1.45rem;
                    }
                }
                &.icon-right {
                    .si-icon {
                        margin-left: 1.45rem;
                    }
                }
            }
        }
    }

    a.si-link {
        &.link {
            .si-link-title {
                @extend %underlineAnimated;
            }
            &:hover,
            &:focus,
            &.hover {
                .si-link-title {
                    @extend %underlineAnimatedHover;
                }
            }
        }
    }
</style>
