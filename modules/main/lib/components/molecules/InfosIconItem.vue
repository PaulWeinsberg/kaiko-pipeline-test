<template>
    <li :class="classNames">
        <SIIcon :name="icon" :color="color" />
        <SIWys :content="text" />
    </li>
</template>
<script>
    import SIIcon from '../atoms/SIIcon.vue'
    import SIWys from './SIWys.vue'

    export default {
        name: 'InfosIconItem',
        components: { SIWys, SIIcon },
        props: {
            icon: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: false,
                default: null,
            },
            placement: {
                type: String,
                required: true,
            },
        },
        computed: {
            classNames() {
                const { placement } = this
                return ['infos-icon-item', `item-${placement}`]
            },
        },
    }
</script>

<style scoped lang="scss">
    .infos-icon-item {
        display: flex;

        @include parent-has-class('.item-next') {
            flex-direction: column;

            .si-icon {
                font-size: 1.2rem;
            }

            .si-wys {
                margin-top: 0.8rem;
            }
        }

        @include parent-has-class('.item-below') {
            flex-direction: row;

            .si-icon {
                font-size: 2rem;
            }

            .si-wys {
                margin-left: 2rem;
            }
        }

        @include parent-has-class('.item-next-two') {
            flex-direction: row;
            align-items: center;

            .si-icon {
                font-size: 1.2rem;
            }

            .si-wys {
                margin-left: 0.8rem;
            }
        }
    }
</style>
