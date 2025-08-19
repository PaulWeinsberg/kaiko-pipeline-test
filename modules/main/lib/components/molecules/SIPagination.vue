<template>
    <div v-if="pagesCount.length > 0 && max > 1" class="si-pagination">
        <p
            v-if="textPrev && windowWidth > 720"
            v-bind="attrPrev"
            class="text"
            @click="prev"
            @keypress.prevent.enter.space="prev"
        >
            {{ textPrev }}
        </p>
        <SIIcon
            v-else
            v-bind="attrPrev"
            name="c-arrow-left"
            @click.native="prev"
            @keypress.native.prevent.enter.space="prev"
        />
        <ul>
            <li
                v-for="(page, i) in pagesCount"
                :key="`${i}-${page}`"
                :ref="typeof page === 'number' ? 'pageCount' : null"
                :class="[
                    { number: typeof page === 'number' },
                    { separator: typeof page !== 'number' },
                    { current: isCurrent(page) },
                ]"
                :aria-current="isCurrent(page) ? 'page' : null"
                :tabindex="isCurrent(page) ? '0' : '-1'"
                @click="setCurrentPage({ page })"
                @keypress.prevent.enter.space="setCurrentPage({ page })"
            >
                <SILink :path="i ? `?page=${page}` : $route.path">
                    {{ page }}
                </SILink>
            </li>
        </ul>
        <p
            v-if="textNext && windowWidth > 720"
            v-bind="attrNext"
            class="text"
            @click="next"
            @keypress.prevent.enter.space="next"
        >
            {{ textNext }}
        </p>
        <SIIcon
            v-else
            v-bind="attrNext"
            name="c-arrow-right"
            @click.native="next"
            @keypress.native.prevent.enter.space="next"
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { scrollTo } from '../../plugins/helpers.client'
    import SIIcon from '../atoms/SIIcon'
    import SILink from '../molecules/SILink'

    export default {
        name: 'SIPagination',
        components: { SIIcon, SILink },
        props: {
            count: {
                type: Number,
                required: true,
            },
            limit: {
                type: [Number, String],
                required: true,
            },
            separator: {
                type: String,
                required: false,
                default: '...',
            },
            paginated: {
                type: Boolean,
                required: false,
                default: true,
            },
            scrollTo: {
                type: Boolean,
                required: false,
                default: true,
            },
            scrollToParent: {
                type: String,
                required: false,
                default: null,
            },
            textPrev: {
                type: String,
                required: '',
                default: null,
            },
            textNext: {
                type: String,
                required: '',
                default: null,
            },
        },
        data() {
            return {
                currentPage: parseInt(this.$route.query.page || '1'),
            }
        },
        computed: {
            ...mapState({
                windowWidth: state => state.general.windowWidth,
            }),
            maxShowed() {
                const { windowWidth } = this
                if (windowWidth < 520) return 3
                return 4
            },
            max() {
                const { count, limit } = this
                return Math.ceil(count / limit)
            },
            pagesCount() {
                const { maxShowed, currentPage, max, separator } = this
                const toReturn = []

                if (max <= maxShowed) {
                    for (let i = 1; i <= max; i++) {
                        toReturn.push(i)
                    }
                } else if (currentPage < maxShowed) {
                    let i = 1
                    for (i; i <= maxShowed + 1; i++) {
                        toReturn.push(i)
                    }
                    if (i - 1 !== max) {
                        toReturn.push(separator)
                        toReturn.push(max)
                    }
                } else if (
                    currentPage >= maxShowed &&
                    currentPage <= max - maxShowed
                ) {
                    toReturn.push(1)
                    toReturn.push(separator)
                    toReturn.push(currentPage - 1)
                    toReturn.push(currentPage)
                    toReturn.push(currentPage + 1)
                    toReturn.push(separator)
                    toReturn.push(max)
                } else if (currentPage > max - maxShowed) {
                    if (max - maxShowed !== 1) {
                        toReturn.push(1)
                        toReturn.push(separator)
                    }
                    for (let i = max - maxShowed; i <= max; i++) {
                        toReturn.push(i)
                    }
                }
                return toReturn
            },
            attrPrev() {
                const { currentPage } = this
                return {
                    class: ['prev', { invisible: currentPage <= 1 }],
                    tabindex: currentPage !== 1 ? '0' : '-1',
                }
            },
            attrNext() {
                const { currentPage, max } = this
                return {
                    class: ['next', { invisible: currentPage >= max }],
                    tabindex: currentPage !== max ? '0' : '-1',
                }
            },
        },
        watch: {
            currentPage(nV) {
                const { limit, paginated, scrollTo } = this

                if (paginated) this.paginate()
                if (scrollTo) this.scrollToTop()

                this.$emit('click', {
                    page: nV,
                    offset: Math.ceil(nV * limit) - limit,
                })
            },
        },
        methods: {
            /**
             * Permet de définir l'élément actif et emit l'évènement
             * @param {Number} page - La page
             */
            setCurrentPage({ page }) {
                if (typeof page !== 'number') return null
                this.currentPage = page
            },
            /**
             * Permet d'aller en arrière
             */
            prev() {
                this.currentPage -= 1
            },
            /**
             * Permet d'aller en avant
             */
            next() {
                this.currentPage += 1
            },
            /**
             * Permet de savoir quelle page est courante
             */
            isCurrent(page) {
                return page === this.currentPage && typeof page === 'number'
            },
            /**
             * Permet de paginer avec une query
             */
            async paginate() {
                const { currentPage, $route, $router } = this

                const query = {}
                if (currentPage > 1) query.page = currentPage

                await $router.push({
                    path: $route.path,
                    query,
                })
            },
            /**
             * Permet de scroller en haut du bloc parent
             */
            scrollToTop() {
                const { scrollToParent } = this
                // On récupère le parent
                const parent = scrollToParent
                    ? this.$el.closest(scrollToParent)
                    : this.$el.parentElement
                scrollTo(parent)
            },
            reset() {
                this.currentPage = 1
            },
        },
    }
</script>

<style scoped lang="scss">
    %hover {
        border-color: var(--sunflower-700);
        background-color: var(--sunflower-700);
        color: var(--white-100);
    }

    .si-pagination {
        display: flex;
        justify-content: center;
        margin: 4rem auto 0;
        max-width: 100%;
        .prev,
        .next {
            font-size: 1rem;
            width: var(--paginationWidth);
            height: var(--paginationHeight);
            padding: 0 0.9rem;
            @media screen and (max-width: $mobileBreakPoint) {
                font-size: 0.8rem;
            }
        }
        .prev {
            margin-right: 0.25rem;
        }
        .next {
            margin-left: 0.25rem;
        }
        ul {
            display: flex;
            margin: 0;
            li {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                font-size: 0.8rem;
                user-select: none;
                margin: 0 0.25rem;
                width: var(--paginationWidth);
                height: var(--paginationHeight);
                @media screen and (max-width: $mobileBreakPoint) {
                    margin: 0 0.1rem;
                    .si-link {
                        font-size: 0.6rem;
                    }
                    &.separator {
                        width: auto;
                    }
                }
            }
        }
        .number,
        .prev,
        .next {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s var(--cubicBezier);
            box-sizing: border-box;
            border-color: var(--black-200);
            background-color: var(--black-200);
            color: var(--sunflower-700);
            width: var(--paginationWidth);
            height: var(--paginationHeight);
            border-radius: var(--paginationRadius);
            &.text {
                width: auto;
                font-size: 0.8rem;
            }
            &.current {
                @extend %hover;
            }
            body.has-hover & {
                &:not(.current) {
                    &:hover {
                        @extend %hover;
                    }
                }
            }
            &:focus {
                &:not(.current) {
                    @extend %hover;
                }
            }
        }
    }
</style>
