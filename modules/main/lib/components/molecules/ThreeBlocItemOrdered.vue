<template>
    <li :class="classNames">
        <div class="icon">
            <SIIcon v-if="icon" :name="icon" />
        </div>
        <div class="title">
            <span class="h4">{{ number }}</span>
            <SITitle h4 :title="title" />
        </div>
        <SIWys :content="text" />
    </li>
</template>

<script>
    import SIIcon from '../atoms/SIIcon.vue'
    import SITitle from '../atoms/SITitle.vue'
    import SIWys from './SIWys.vue'

    export default {
        name: 'ThreeBlocItemOrdered',
        components: { SIWys, SITitle, SIIcon },
        props: {
            title: {
                type: String,
                required: true,
            },
            number: {
                type: Number,
                required: false,
                default: null,
            },
            icon: {
                type: String,
                required: false,
                default: null,
            },
            text: {
                type: String,
                required: true,
            },
            isLittle: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            classNames() {
                const { isLittle } = this
                return ['three-bloc-item-ordered', { 'is-little': isLittle }]
            },
        },
    }
</script>

<style scoped lang="scss">
    .three-bloc-item-ordered {
        .icon {
            .si-icon {
                font-size: 3rem;
                color: var(--white-100);
                @include parent-has-class('.is-little') {
                    font-size: 2rem;
                }
            }
        }
        .title {
            display: flex;
            align-items: baseline;
            @include parent-has-class('.is-little') {
                .si-title {
                    line-height: 1.1rem;
                }
            }
            span {
                display: flex;
                align-items: center;
                &:after {
                    display: block;
                    content: '';
                    width: 6px;
                    height: 6px;
                    background-color: var(--sunflower-700);
                    margin: 0 0.8rem;
                    border-radius: 50%;
                }
            }
            margin: 2.4rem 0;
            @include parent-has-class('.is-little') {
                margin: 0.8rem 0 1.8rem 0;
            }
        }
    }
</style>
