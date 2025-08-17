<template>
    <div :class="classNames" @mousemove="hideControlsFnc">
        <CookiesNotAllowed
            v-show="!allowed"
            :content="wordings.g_cookies.ytb_not_allowed"
        />
        <transition @enter="$animations.fadeIn" @leave="$animations.fadeOut">
            <SIImage
                v-show="showThumbnail"
                class="si-video-thumbnail"
                :image="thumbnail"
                background
                :filterOpacity="0.3"
            >
                <div class="controls" @click="toggleState">
                    <SIIcon name="c-player" color="white-100" />
                    <p>Play</p>
                </div>
            </SIImage>
        </transition>
        <div v-show="url" class="si-video-player-container">
            <div
                v-if="youtube && allowed"
                :id="playerId_"
                :data-youtube-id="url"
                class="si-video-player"
            />
            <video
                v-if="!youtube"
                ref="video"
                v-bind="attr"
                class="si-video-player"
            >
                <source :src="url" :type="mimeType" />
            </video>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    const ratioValidator = ['16-9']
    export default {
        name: 'SIVideo',
        props: {
            url: {
                type: String,
                required: false,
                default: null,
            },
            thumbnail: {
                type: [Object, String],
                required: true,
            },
            mimeType: {
                type: String,
                required: false,
                default: null,
            },
            autoplay: {
                type: Boolean,
                required: false,
                default: false,
            },
            muted: {
                type: Boolean,
                required: false,
                default: false,
            },
            loop: {
                type: Boolean,
                required: false,
                default: null,
            },
            controls: {
                type: Boolean,
                required: false,
                default: false,
            },
            youtube: {
                type: Boolean,
                required: false,
                default: false,
            },
            ratio: {
                type: String,
                required: false,
                default: null,
                validator: val => ratioValidator.includes(val),
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            },
            playerId: {
                type: String,
                required: false,
                default: 'si-video-player',
            },
        },
        data: () => ({
            play_: false,
            controls_: false,
            hiddenInterval: null,
            player: null,
            playerIsReady: false,
            htmlEL: null,
        }),
        computed: {
            ...mapState({
                cookies: state => state.cookies.infos,
                cookiesSet: state => state.cookies.isSet,
                wordings: state => state.options.options.wordings,
                touchDevice: state => state.general.touchDevice,
            }),
            classNames() {
                const {
                    youtube,
                    classNameByRatio,
                    disabled,
                    controls,
                    allowed,
                } = this
                return [
                    'si-video',
                    { 'si-video-youtube': youtube },
                    classNameByRatio,
                    { disabled },
                    { 'has-controls': controls },
                    { 'not-allowed': !allowed },
                ]
            },
            classNameByRatio() {
                const { ratio } = this
                if (!ratio) return ''
                return `ratio-${ratio}`
            },
            muted_() {
                const { autoplay, muted } = this
                return muted || autoplay
            },
            attr() {
                const { autoplay, muted_, loop, controls } = this

                return {
                    controls,
                    autoplay,
                    muted: muted_,
                    loop,
                }
            },
            playerId_() {
                const { url, playerId } = this
                return `${playerId}-${url}`
            },
            allowed() {
                const { cookies, cookiesSet, youtube } = this
                if (!youtube) return true
                return cookies.youtube && cookiesSet
            },
            showThumbnail() {
                const { autoplay, touchDevice, play_ } = this
                return (autoplay && touchDevice) || (!autoplay && !play_)
            },
        },
        watch: {
            /**
             * Quand l'état de la vidéo change
             * @private
             */
            play_() {
                this.hideControlsFnc()
            },
            allowed(nV) {
                const { player } = this
                if (!player) {
                    this.$nextTick(() => {
                        this.init()
                    })
                } else {
                    if (!nV) this.pause()
                }
            },
        },
        created() {
            const { controls } = this
            this.controls_ = controls
        },
        beforeMount() {
            this.addScripts()
        },
        mounted() {
            const { youtube } = this
            this.init()
            this.$nuxt.$on('fullscreen:change', ({ fullscreen }) => {
                if (!fullscreen) this.pause()
            })

            if (!youtube) this.onPlayerReady()
        },
        destroyed() {
            if (this.player?.destroy) this.player.destroy()
        },
        methods: {
            /**
             * Insert le scrip permettant de faire fonctionner l'API Youtube
             */
            addScripts() {
                const youtubeScriptId = 'youtube-script'
                const alreadySet = document.getElementById(youtubeScriptId)
                // Si c'est déjà inséré, on ne fait rien
                if (alreadySet) return null
                // Sinon on met le script
                const tag = document.createElement('script')
                const firstScriptTag =
                    document.getElementsByTagName('script')[0]
                tag.src = 'https://www.youtube.com/iframe_api'
                tag.id = youtubeScriptId

                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
            },
            init() {
                const { youtube, url, allowed } = this
                if (!url || (!allowed && youtube)) return

                if (youtube) {
                    this.initYoutube()
                } else {
                    this.initLocal()
                }
            },
            initYoutube() {
                this.loadVideo()
            },
            initLocal() {
                const { autoplay } = this
                this.htmlEL = this.$refs.video
                if (autoplay) this.play_ = true
            },
            /**
             * Initialise le player YT
             **/
            loadVideo() {
                // On vérifie que Youtube est bien load. Si ce n'est pas le cas, on stoppe la fonction courante, et on la rappelle
                if (!window.YT || !window.YT.Player) {
                    setTimeout(() => {
                        this.loadVideo()
                    }, 250)
                    return
                }
                const { playerId_, url, autoplay, controls_, loop, muted_ } =
                    this

                // On set les arguments du player
                const args = {
                    autoplay: autoplay ? 1 : 0,
                    autohide: 1,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    controls: controls_ ? 1 : 0,
                    disablekb: 1,
                    enablejsapi: 0,
                    iv_load_policy: 3,
                    loop: loop ? 1 : 0,
                    mute: muted_ ? 1 : 0,
                    playsinline: 0, // Nécessaire pour ouvrir les vidéos fullscreen en mobile (IOS)
                    host: window.location.protocol + '//www.youtube.com',
                    origin: window.location.origin,
                }

                // On initialise et stock le player YT
                // eslint-disable-next-line no-undef
                this.player = new window.YT.Player(playerId_, {
                    videoId: url,
                    playerVars: args,
                    events: {
                        onReady: this.onPlayerReady.bind(this),
                        onStateChange: this.onPlayerStateChange.bind(this),
                    },
                })
            },
            /**
             * Permet d'effectuer différentes actions lorsque le player YT est bon
             **/
            onPlayerReady() {
                const { $el, playerId_, youtube } = this
                this.playerIsReady = true // On spécifie que le player est bon
                this.$emit('player:ready')
                if (youtube) this.htmlEL = $el.querySelector(`#${playerId_}`)
            },
            onPlayerStateChange(e) {
                switch (e.data) {
                    // Stopped
                    case 0:
                        this.play_ = false
                        break
                    // Played
                    case 1:
                        this.onPlay()
                        break
                    // Paused
                    case 2:
                        this.onPause()
                        break
                }
            },
            onPlay() {
                this.play_ = true
                this.$emit('video:play')
            },
            onPause() {
                this.play_ = false
                this.$emit('video:pause')
            },
            /**
             * Permet de toggle la vidéo
             */
            toggleState($event) {
                const { play_, allowed } = this
                this.$emit('click:controls', { e: $event, allowed })
                if (!allowed) return
                play_ ? this.pause() : this.play()
            },
            /**
             * Permet de jouer la vidéo
             */
            play() {
                const {
                    $refs,
                    youtube,
                    player,
                    playerIsReady,
                    touchDevice,
                    autoplay,
                } = this
                if (youtube) {
                    if (playerIsReady) player.playVideo()
                } else {
                    const { video } = $refs
                    video.play()
                }

                if (touchDevice && !autoplay) this.fullScreen()
                this.play_ = true
            },
            /**
             * Permet de mettre en pause la vidéo
             */
            pause() {
                const { $refs, youtube, player, playerIsReady } = this
                if (youtube) {
                    if (playerIsReady) player.pauseVideo()
                } else {
                    const { video } = $refs
                    if (video) video.pause()
                }
                this.play_ = false
            },
            /**
             * Permet de cacher l'interface si l'utilisateur ne bouge pas la souris x temps
             */
            hideControlsFnc() {
                const { play_, controls } = this
                if (play_) {
                    this.controls_ = controls
                    if (this.hiddenInterval) {
                        clearTimeout(this.hiddenInterval)
                    }
                    this.hiddenInterval = setTimeout(() => {
                        if (this.play_) this.controls_ = false
                    }, 1000)
                } else {
                    this.controls_ = controls
                }
            },
            /**
             * Permet de lancer le fullscreen
             */
            fullScreen() {
                const { htmlEL } = this
                if (!htmlEL) return
                const fullscreenElement =
                    document.fullscreenElement ||
                    document.webkitFullscreenElement

                if (!fullscreenElement) {
                    if (htmlEL.requestFullscreen) {
                        htmlEL.requestFullscreen()
                    } else if (htmlEL.webkitRequestFullscreen) {
                        htmlEL.webkitRequestFullscreen()
                    }
                } else if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen()
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-video {
        display: flex;
        flex-direction: column;
        position: relative;
        &.not-allowed {
            pointer-events: none;
        }
        .si-video-thumbnail,
        .controls {
            width: 100%;
            height: 100%;
            position: absolute;
            inset: 0;
        }
        .si-video-thumbnail {
            z-index: 20;
        }
        .controls {
            display: flex;
            z-index: 25;
            background-color: rgba(var(--black-900-rgb), 0);
            transition: background-color 0.3s var(--cubicBezier);
            cursor: pointer;
            align-items: center;
            justify-content: flex-end;
            padding: 4rem;
            box-sizing: border-box;
            @media screen and (max-width: $littleTabletBreakPoint) {
                padding: 2rem;
            }
            .si-icon {
                font-size: 4.3rem;
                @media screen and (max-width: $littleTabletBreakPoint) {
                    font-size: 2.7rem;
                }
            }
            p {
                font-size: 3.3rem;
                color: var(--white-100);
                margin-left: 0.8rem;
                font-weight: 500;
                line-height: 1em;
                @media screen and (max-width: $littleTabletBreakPoint) {
                    font-size: 2rem;
                }
            }
        }
        .si-video-player-container {
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 15;
            width: 100%;
            :deep(.si-video-player) {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
            }
        }
        &.si-video-youtube {
            .si-video-player-container {
                height: 100%;
            }
        }
        &.has-controls {
            &:hover {
                .controls {
                    background-color: rgba(var(--black-900-rgb), 0.25);
                }
            }
        }
        &.ratio-16-9 {
            aspect-ratio: 16/9;
            width: 100%;
            .si-video-player-container {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
