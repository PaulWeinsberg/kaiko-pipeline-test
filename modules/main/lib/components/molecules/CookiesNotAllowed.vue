<template>
    <transition
        :css="false"
        appear
        @enter="$animations.fadeIn"
        @leave="$animations.fadeOut"
    >
        <div v-if="content" class="cookies-not-allowed">
            <SIWys :content="content" />
            <SILink
                btn
                tag="a"
                href="javascript:openAxeptioCookies()"
                :title="wordings.g_cookies.title_open_params"
                icon="c-arrow-right"
                icon-position="right"
            />
        </div>
    </transition>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'CookiesNotAllowed',
        props: {
            content: {
                type: String,
                required: true,
            },
        },
        computed: {
            ...mapState({
                wordings: state => state.options.options.wordings,
            }),
        },
    }
</script>

<style lang="scss" scoped>
    .cookies-not-allowed {
        display: flex;
        flex-direction: column;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        padding: 1rem;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        &:before {
            content: '';
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background: var(--black-900);
            opacity: 1;
        }
        .si-wys,
        .si-link {
            position: relative;
            color: var(--white-100);
            justify-content: center;
        }
        .si-wys {
            width: 100%;
        }
        .si-link {
            margin-top: 2rem;
        }
    }
</style>
