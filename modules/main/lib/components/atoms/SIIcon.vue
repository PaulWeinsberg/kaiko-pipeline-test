<template>
    <component :is="tag" v-si-color="color" :class="classNames" />
</template>

<script>
    export default {
        name: 'SIIcon',
        props: {
            name: {
                type: String,
                required: true,
            },
            tag: {
                type: String,
                required: false,
                default: 'span',
            },
            size: {
                type: String,
                required: false,
                default: null,
            },
            color: {
                type: String,
                required: false,
                default: null,
            },
        },
        computed: {
            classNames() {
                const { name, size } = this
                return ['si-icon', `icon-${name}`, size]
            },
        },
    }
</script>

<style scoped lang="scss">
    .si-icon {
        font-size: 0.9rem;
        font-family: var(--iconsFont);
        line-height: 1em;
        &.xxs {
            font-size: 0.6rem;
        }
        &.xs {
            font-size: 0.7rem;
        }
        &.s {
            font-size: 0.8rem;
        }
        &.m {
            font-size: 1rem;
        }
        &.l {
            font-size: 1rem;
        }
        &.lg {
            font-size: 1.1rem;
        }
        &.xl {
            font-size: 1.2rem;
        }
        &.xxl {
            font-size: 1.5rem;
        }
        &.xxxl {
            font-size: 2.15rem;
        }
    }

    .icon-3d-box:before {
        content: '\e900';
    }
    .icon-3d-glasses:before {
        content: '\e901';
    }
    .icon-3d:before {
        content: '\e902';
    }
    .icon-24-hours:before {
        content: '\e903';
    }
    .icon-add_1:before {
        content: '\e904';
    }
    .icon-add_2:before {
        content: '\e905';
    }
    .icon-add:before {
        content: '\e906';
    }
    .icon-agreement:before {
        content: '\e907';
    }
    .icon-airplane-mode:before {
        content: '\e908';
    }
    .icon-alarm:before {
        content: '\e909';
    }
    .icon-align-center:before {
        content: '\e90a';
    }
    .icon-ambulance_1:before {
        content: '\e90b';
    }
    .icon-ambulance:before {
        content: '\e90c';
    }
    .icon-antiseptic:before {
        content: '\e90d';
    }
    .icon-appreciation:before {
        content: '\e90e';
    }
    .icon-asisstant:before {
        content: '\e90f';
    }
    .icon-ask:before {
        content: '\e910';
    }
    .icon-atm:before {
        content: '\e911';
    }
    .icon-award:before {
        content: '\e912';
    }
    .icon-back-home:before {
        content: '\e913';
    }
    .icon-bag_1:before {
        content: '\e914';
    }
    .icon-bag:before {
        content: '\e915';
    }
    .icon-balance:before {
        content: '\e916';
    }
    .icon-bank_1:before {
        content: '\e917';
    }
    .icon-bank:before {
        content: '\e918';
    }
    .icon-barcode_1:before {
        content: '\e919';
    }
    .icon-barcode:before {
        content: '\e91a';
    }
    .icon-best:before {
        content: '\e91b';
    }
    .icon-bin:before {
        content: '\e91c';
    }
    .icon-binary-code:before {
        content: '\e91d';
    }
    .icon-binocular:before {
        content: '\e91e';
    }
    .icon-bit:before {
        content: '\e91f';
    }
    .icon-bitcoin_1:before {
        content: '\e920';
    }
    .icon-bitcoin:before {
        content: '\e921';
    }
    .icon-bitcoin2:before {
        content: '\e922';
    }
    .icon-blood:before {
        content: '\e923';
    }
    .icon-board:before {
        content: '\e924';
    }
    .icon-book_1:before {
        content: '\e925';
    }
    .icon-book_2:before {
        content: '\e926';
    }
    .icon-book_3:before {
        content: '\e927';
    }
    .icon-book-2:before {
        content: '\e928';
    }
    .icon-book:before {
        content: '\e929';
    }
    .icon-bookmark_1:before {
        content: '\e92a';
    }
    .icon-bookmark_2:before {
        content: '\e92b';
    }
    .icon-bookmark:before {
        content: '\e92c';
    }
    .icon-box_1:before {
        content: '\e92d';
    }
    .icon-box_2:before {
        content: '\e92e';
    }
    .icon-box:before {
        content: '\e92f';
    }
    .icon-boxes:before {
        content: '\e930';
    }
    .icon-brankas_1:before {
        content: '\e931';
    }
    .icon-brankas:before {
        content: '\e932';
    }
    .icon-bright:before {
        content: '\e933';
    }
    .icon-browser:before {
        content: '\e934';
    }
    .icon-bubble-text:before {
        content: '\e935';
    }
    .icon-bubble:before {
        content: '\e936';
    }
    .icon-bundle_1:before {
        content: '\e937';
    }
    .icon-bundle:before {
        content: '\e938';
    }
    .icon-button:before {
        content: '\e939';
    }
    .icon-calculator_1:before {
        content: '\e93a';
    }
    .icon-calculator:before {
        content: '\e93b';
    }
    .icon-calendar_1:before {
        content: '\e93c';
    }
    .icon-calendar:before {
        content: '\e93d';
    }
    .icon-call:before {
        content: '\e93e';
    }
    .icon-calling:before {
        content: '\e93f';
    }
    .icon-camcorder:before {
        content: '\e940';
    }
    .icon-camera:before {
        content: '\e941';
    }
    .icon-card_1:before {
        content: '\e942';
    }
    .icon-card-wallet:before {
        content: '\e943';
    }
    .icon-card:before {
        content: '\e944';
    }
    .icon-categories:before {
        content: '\e945';
    }
    .icon-cctv:before {
        content: '\e946';
    }
    .icon-celebration:before {
        content: '\e947';
    }
    .icon-centralized:before {
        content: '\e948';
    }
    .icon-certificate_1:before {
        content: '\e949';
    }
    .icon-certificate:before {
        content: '\e94a';
    }
    .icon-chainlink:before {
        content: '\e94b';
    }
    .icon-chainlink2:before {
        content: '\e94c';
    }
    .icon-champ:before {
        content: '\e94d';
    }
    .icon-champion:before {
        content: '\e94e';
    }
    .icon-change-password:before {
        content: '\e94f';
    }
    .icon-change:before {
        content: '\e950';
    }
    .icon-charge:before {
        content: '\e951';
    }
    .icon-charging:before {
        content: '\e952';
    }
    .icon-chart_1:before {
        content: '\e953';
    }
    .icon-chart:before {
        content: '\e954';
    }
    .icon-chat_1:before {
        content: '\e955';
    }
    .icon-chat_2:before {
        content: '\e956';
    }
    .icon-chat_3:before {
        content: '\e957';
    }
    .icon-chat_4:before {
        content: '\e958';
    }
    .icon-chat_5:before {
        content: '\e959';
    }
    .icon-chat-bubble:before {
        content: '\e95a';
    }
    .icon-chat:before {
        content: '\e95b';
    }
    .icon-chatting:before {
        content: '\e95c';
    }
    .icon-check-mail:before {
        content: '\e95d';
    }
    .icon-checklist:before {
        content: '\e95e';
    }
    .icon-chemical_1:before {
        content: '\e95f';
    }
    .icon-chemical:before {
        content: '\e960';
    }
    .icon-circle:before {
        content: '\e961';
    }
    .icon-clapperboard:before {
        content: '\e962';
    }
    .icon-clock:before {
        content: '\e963';
    }
    .icon-closed-box:before {
        content: '\e964';
    }
    .icon-cloud:before {
        content: '\e965';
    }
    .icon-coin-bag:before {
        content: '\e966';
    }
    .icon-coin:before {
        content: '\e967';
    }
    .icon-coins:before {
        content: '\e968';
    }
    .icon-color:before {
        content: '\e969';
    }
    .icon-column:before {
        content: '\e96a';
    }
    .icon-compass_1:before {
        content: '\e96b';
    }
    .icon-compass_2:before {
        content: '\e96c';
    }
    .icon-compass:before {
        content: '\e96d';
    }
    .icon-computer_1:before {
        content: '\e96e';
    }
    .icon-computer-tablet:before {
        content: '\e96f';
    }
    .icon-computer:before {
        content: '\e970';
    }
    .icon-contact_1:before {
        content: '\e971';
    }
    .icon-contact_2:before {
        content: '\e972';
    }
    .icon-contact:before {
        content: '\e973';
    }
    .icon-conversation:before {
        content: '\e974';
    }
    .icon-cpu:before {
        content: '\e975';
    }
    .icon-credit-card_1:before {
        content: '\e976';
    }
    .icon-credit-card:before {
        content: '\e977';
    }
    .icon-crown:before {
        content: '\e978';
    }
    .icon-crypto:before {
        content: '\e979';
    }
    .icon-cryptocurrency:before {
        content: '\e97a';
    }
    .icon-cup:before {
        content: '\e97b';
    }
    .icon-cutlery:before {
        content: '\e97c';
    }
    .icon-dash:before {
        content: '\e97d';
    }
    .icon-data-folder:before {
        content: '\e97e';
    }
    .icon-database:before {
        content: '\e97f';
    }
    .icon-date:before {
        content: '\e980';
    }
    .icon-daylight:before {
        content: '\e981';
    }
    .icon-delete:before {
        content: '\e982';
    }
    .icon-delivery-ship:before {
        content: '\e983';
    }
    .icon-destination:before {
        content: '\e984';
    }
    .icon-diamond_1:before {
        content: '\e985';
    }
    .icon-diamond:before {
        content: '\e986';
    }
    .icon-dimension:before {
        content: '\e987';
    }
    .icon-direction:before {
        content: '\e988';
    }
    .icon-discount:before {
        content: '\e989';
    }
    .icon-disk:before {
        content: '\e98a';
    }
    .icon-dislike:before {
        content: '\e98b';
    }
    .icon-dna:before {
        content: '\e98c';
    }
    .icon-document_1:before {
        content: '\e98d';
    }
    .icon-document:before {
        content: '\e98e';
    }
    .icon-donation_1:before {
        content: '\e98f';
    }
    .icon-donation:before {
        content: '\e990';
    }
    .icon-donor:before {
        content: '\e991';
    }
    .icon-door:before {
        content: '\e992';
    }
    .icon-double-ethereum:before {
        content: '\e993';
    }
    .icon-double-mail:before {
        content: '\e994';
    }
    .icon-download_1:before {
        content: '\e995';
    }
    .icon-download:before {
        content: '\e996';
    }
    .icon-drops:before {
        content: '\e997';
    }
    .icon-drug:before {
        content: '\e998';
    }
    .icon-duplicate:before {
        content: '\e999';
    }
    .icon-earth:before {
        content: '\e99a';
    }
    .icon-electricity:before {
        content: '\e99b';
    }
    .icon-email_1:before {
        content: '\e99c';
    }
    .icon-email-address:before {
        content: '\e99d';
    }
    .icon-email:before {
        content: '\e99e';
    }
    .icon-emails:before {
        content: '\e99f';
    }
    .icon-envelope_1:before {
        content: '\e9a0';
    }
    .icon-envelope_2:before {
        content: '\e9a1';
    }
    .icon-envelope-file:before {
        content: '\e9a2';
    }
    .icon-envelope:before {
        content: '\e9a3';
    }
    .icon-ethereum:before {
        content: '\e9a4';
    }
    .icon-exit-fullscreen:before {
        content: '\e9a5';
    }
    .icon-exit:before {
        content: '\e9a6';
    }
    .icon-exploded-pie:before {
        content: '\e9a7';
    }
    .icon-extensions:before {
        content: '\e9a8';
    }
    .icon-external-link:before {
        content: '\e9a9';
    }
    .icon-eye-medicine:before {
        content: '\e9aa';
    }
    .icon-face-mask:before {
        content: '\e9ab';
    }
    .icon-face-scan:before {
        content: '\e9ac';
    }
    .icon-fast-email:before {
        content: '\e9ad';
    }
    .icon-file_1:before {
        content: '\e9ae';
    }
    .icon-file:before {
        content: '\e9af';
    }
    .icon-files:before {
        content: '\e9b0';
    }
    .icon-film:before {
        content: '\e9b1';
    }
    .icon-filmreel:before {
        content: '\e9b2';
    }
    .icon-fingerprint_1:before {
        content: '\e9b3';
    }
    .icon-fingerprint_2:before {
        content: '\e9b4';
    }
    .icon-fingerprint:before {
        content: '\e9b5';
    }
    .icon-firewall:before {
        content: '\e9b6';
    }
    .icon-flag_1:before {
        content: '\e9b7';
    }
    .icon-flag:before {
        content: '\e9b8';
    }
    .icon-folder_1:before {
        content: '\e9b9';
    }
    .icon-folder_2:before {
        content: '\e9ba';
    }
    .icon-folder_3:before {
        content: '\e9bb';
    }
    .icon-folder_4:before {
        content: '\e9bc';
    }
    .icon-folder_5:before {
        content: '\e9bd';
    }
    .icon-folder:before {
        content: '\e9be';
    }
    .icon-food-cover:before {
        content: '\e9bf';
    }
    .icon-footprints:before {
        content: '\e9c0';
    }
    .icon-frame:before {
        content: '\e9c1';
    }
    .icon-friend:before {
        content: '\e9c2';
    }
    .icon-give-money:before {
        content: '\e9c3';
    }
    .icon-glasses:before {
        content: '\e9c4';
    }
    .icon-globe:before {
        content: '\e9c5';
    }
    .icon-gmaps:before {
        content: '\e9c6';
    }
    .icon-gold:before {
        content: '\e9c7';
    }
    .icon-graduation:before {
        content: '\e9c8';
    }
    .icon-handphone_1:before {
        content: '\e9c9';
    }
    .icon-handphone:before {
        content: '\e9ca';
    }
    .icon-hard-drive:before {
        content: '\e9cb';
    }
    .icon-headphone:before {
        content: '\e9cc';
    }
    .icon-heart-race:before {
        content: '\e9cd';
    }
    .icon-heart-rate:before {
        content: '\e9ce';
    }
    .icon-heart:before {
        content: '\e9cf';
    }
    .icon-hidden-camera:before {
        content: '\e9d0';
    }
    .icon-home_1:before {
        content: '\e9d1';
    }
    .icon-home_2:before {
        content: '\e9d2';
    }
    .icon-home-cinema:before {
        content: '\e9d3';
    }
    .icon-home:before {
        content: '\e9d4';
    }
    .icon-honor:before {
        content: '\e9d5';
    }
    .icon-id-card:before {
        content: '\e9d6';
    }
    .icon-idea_1:before {
        content: '\e9d7';
    }
    .icon-idea:before {
        content: '\e9d8';
    }
    .icon-identity-card:before {
        content: '\e9d9';
    }
    .icon-inbox:before {
        content: '\e9da';
    }
    .icon-incognito:before {
        content: '\e9db';
    }
    .icon-increase:before {
        content: '\e9dc';
    }
    .icon-indent:before {
        content: '\e9dd';
    }
    .icon-information:before {
        content: '\e9de';
    }
    .icon-instruction:before {
        content: '\e9df';
    }
    .icon-journey:before {
        content: '\e9e0';
    }
    .icon-juice:before {
        content: '\e9e1';
    }
    .icon-key_1:before {
        content: '\e9e2';
    }
    .icon-key_2:before {
        content: '\e9e3';
    }
    .icon-key-button:before {
        content: '\e9e4';
    }
    .icon-key-hole:before {
        content: '\e9e5';
    }
    .icon-key:before {
        content: '\e9e6';
    }
    .icon-knowledge:before {
        content: '\e9e7';
    }
    .icon-laptop_1:before {
        content: '\e9e8';
    }
    .icon-laptop_2:before {
        content: '\e9e9';
    }
    .icon-laptop_3:before {
        content: '\e9ea';
    }
    .icon-laptop_4:before {
        content: '\e9eb';
    }
    .icon-laptop_5:before {
        content: '\e9ec';
    }
    .icon-laptop:before {
        content: '\e9ed';
    }
    .icon-layer:before {
        content: '\e9ee';
    }
    .icon-legacy:before {
        content: '\e9ef';
    }
    .icon-letter_1:before {
        content: '\e9f0';
    }
    .icon-letter:before {
        content: '\e9f1';
    }
    .icon-like_1:before {
        content: '\e9f2';
    }
    .icon-like:before {
        content: '\e9f3';
    }
    .icon-line-chart:before {
        content: '\e9f4';
    }
    .icon-liner:before {
        content: '\e9f5';
    }
    .icon-link:before {
        content: '\e9f6';
    }
    .icon-list_1:before {
        content: '\e9f7';
    }
    .icon-list_2:before {
        content: '\e9f8';
    }
    .icon-list-menu:before {
        content: '\e9f9';
    }
    .icon-list:before {
        content: '\e9fa';
    }
    .icon-litecoin:before {
        content: '\e9fb';
    }
    .icon-location_1:before {
        content: '\e9fc';
    }
    .icon-location_2:before {
        content: '\e9fd';
    }
    .icon-location_3:before {
        content: '\e9fe';
    }
    .icon-location_4:before {
        content: '\e9ff';
    }
    .icon-location-map:before {
        content: '\ea00';
    }
    .icon-location-point:before {
        content: '\ea01';
    }
    .icon-location:before {
        content: '\ea02';
    }
    .icon-lock_1:before {
        content: '\ea03';
    }
    .icon-lock:before {
        content: '\ea04';
    }
    .icon-love:before {
        content: '\ea05';
    }
    .icon-magnet:before {
        content: '\ea06';
    }
    .icon-mail_1:before {
        content: '\ea07';
    }
    .icon-mail:before {
        content: '\ea08';
    }
    .icon-mailbox:before {
        content: '\ea09';
    }
    .icon-map:before {
        content: '\ea0a';
    }
    .icon-maps:before {
        content: '\ea0b';
    }
    .icon-margin:before {
        content: '\ea0c';
    }
    .icon-mask:before {
        content: '\ea0d';
    }
    .icon-med-box:before {
        content: '\ea0e';
    }
    .icon-medal:before {
        content: '\ea0f';
    }
    .icon-menu_1:before {
        content: '\ea10';
    }
    .icon-menu:before {
        content: '\ea11';
    }
    .icon-message_1:before {
        content: '\ea12';
    }
    .icon-message_2:before {
        content: '\ea13';
    }
    .icon-message:before {
        content: '\ea14';
    }
    .icon-messages:before {
        content: '\ea15';
    }
    .icon-misscall:before {
        content: '\ea16';
    }
    .icon-mobile-payment:before {
        content: '\ea17';
    }
    .icon-mobile:before {
        content: '\ea18';
    }
    .icon-monero:before {
        content: '\ea19';
    }
    .icon-money_1:before {
        content: '\ea1a';
    }
    .icon-money-bag:before {
        content: '\ea1b';
    }
    .icon-money-exchange:before {
        content: '\ea1c';
    }
    .icon-money-letter:before {
        content: '\ea1d';
    }
    .icon-money-talk:before {
        content: '\ea1e';
    }
    .icon-money:before {
        content: '\ea1f';
    }
    .icon-moneys:before {
        content: '\ea20';
    }
    .icon-monitor:before {
        content: '\ea21';
    }
    .icon-moon_1:before {
        content: '\ea22';
    }
    .icon-moon:before {
        content: '\ea23';
    }
    .icon-mount:before {
        content: '\ea24';
    }
    .icon-music:before {
        content: '\ea25';
    }
    .icon-network:before {
        content: '\ea26';
    }
    .icon-next:before {
        content: '\ea27';
    }
    .icon-night-mode:before {
        content: '\ea28';
    }
    .icon-no-smoking:before {
        content: '\ea29';
    }
    .icon-no-telephone:before {
        content: '\ea2a';
    }
    .icon-node:before {
        content: '\ea2b';
    }
    .icon-noodle:before {
        content: '\ea2c';
    }
    .icon-note_1:before {
        content: '\ea2d';
    }
    .icon-note:before {
        content: '\ea2e';
    }
    .icon-notebook_1:before {
        content: '\ea2f';
    }
    .icon-notebook:before {
        content: '\ea30';
    }
    .icon-official:before {
        content: '\ea31';
    }
    .icon-online_1:before {
        content: '\ea32';
    }
    .icon-online-mail:before {
        content: '\ea33';
    }
    .icon-online:before {
        content: '\ea34';
    }
    .icon-open-email:before {
        content: '\ea35';
    }
    .icon-open-mail:before {
        content: '\ea36';
    }
    .icon-open-messages:before {
        content: '\ea37';
    }
    .icon-open-wallet:before {
        content: '\ea38';
    }
    .icon-packet:before {
        content: '\ea39';
    }
    .icon-padlock_1:before {
        content: '\ea3a';
    }
    .icon-padlock:before {
        content: '\ea3b';
    }
    .icon-password_1:before {
        content: '\ea3c';
    }
    .icon-password:before {
        content: '\ea3d';
    }
    .icon-payment_1:before {
        content: '\ea3e';
    }
    .icon-payment:before {
        content: '\ea3f';
    }
    .icon-pencil:before {
        content: '\ea40';
    }
    .icon-phone_1:before {
        content: '\ea41';
    }
    .icon-phone_2:before {
        content: '\ea42';
    }
    .icon-phone:before {
        content: '\ea43';
    }
    .icon-phones:before {
        content: '\ea44';
    }
    .icon-phonograph:before {
        content: '\ea45';
    }
    .icon-picture_1:before {
        content: '\ea46';
    }
    .icon-picture_2:before {
        content: '\ea47';
    }
    .icon-picture:before {
        content: '\ea48';
    }
    .icon-pie:before {
        content: '\ea49';
    }
    .icon-pile-of-boxes:before {
        content: '\ea4a';
    }
    .icon-plane_1:before {
        content: '\ea4b';
    }
    .icon-plane:before {
        content: '\ea4c';
    }
    .icon-plastic-bag:before {
        content: '\ea4d';
    }
    .icon-podium:before {
        content: '\ea4e';
    }
    .icon-point:before {
        content: '\ea4f';
    }
    .icon-pointing:before {
        content: '\ea50';
    }
    .icon-presentation_1:before {
        content: '\ea51';
    }
    .icon-presentation:before {
        content: '\ea52';
    }
    .icon-print-receipt:before {
        content: '\ea53';
    }
    .icon-print:before {
        content: '\ea54';
    }
    .icon-printer:before {
        content: '\ea55';
    }
    .icon-promoted:before {
        content: '\ea56';
    }
    .icon-protect:before {
        content: '\ea57';
    }
    .icon-proyector:before {
        content: '\ea58';
    }
    .icon-puzzle:before {
        content: '\ea59';
    }
    .icon-quality:before {
        content: '\ea5a';
    }
    .icon-question:before {
        content: '\ea5b';
    }
    .icon-rainday:before {
        content: '\ea5c';
    }
    .icon-rating:before {
        content: '\ea5d';
    }
    .icon-receipe:before {
        content: '\ea5e';
    }
    .icon-receipt_1:before {
        content: '\ea5f';
    }
    .icon-receipt_2:before {
        content: '\ea60';
    }
    .icon-receipt:before {
        content: '\ea61';
    }
    .icon-refer:before {
        content: '\ea62';
    }
    .icon-rename:before {
        content: '\ea63';
    }
    .icon-reply:before {
        content: '\ea64';
    }
    .icon-reservation:before {
        content: '\ea65';
    }
    .icon-result:before {
        content: '\ea66';
    }
    .icon-return-bitcoin:before {
        content: '\ea67';
    }
    .icon-rewards:before {
        content: '\ea68';
    }
    .icon-rice:before {
        content: '\ea69';
    }
    .icon-ripplecoin:before {
        content: '\ea6a';
    }
    .icon-roadblock:before {
        content: '\ea6b';
    }
    .icon-rocket:before {
        content: '\ea6c';
    }
    .icon-rotate:before {
        content: '\ea6d';
    }
    .icon-round-trip:before {
        content: '\ea6e';
    }
    .icon-route:before {
        content: '\ea6f';
    }
    .icon-router_1:before {
        content: '\ea70';
    }
    .icon-router:before {
        content: '\ea71';
    }
    .icon-ruler:before {
        content: '\ea72';
    }
    .icon-safe-monero:before {
        content: '\ea73';
    }
    .icon-safety:before {
        content: '\ea74';
    }
    .icon-save:before {
        content: '\ea75';
    }
    .icon-scale_1:before {
        content: '\ea76';
    }
    .icon-scale:before {
        content: '\ea77';
    }
    .icon-scanner:before {
        content: '\ea78';
    }
    .icon-scanning:before {
        content: '\ea79';
    }
    .icon-school:before {
        content: '\ea7a';
    }
    .icon-screen-recording:before {
        content: '\ea7b';
    }
    .icon-sealed:before {
        content: '\ea7c';
    }
    .icon-search_1:before {
        content: '\ea7d';
    }
    .icon-search:before {
        content: '\ea7e';
    }
    .icon-seat:before {
        content: '\ea7f';
    }
    .icon-see:before {
        content: '\ea80';
    }
    .icon-select_1:before {
        content: '\ea81';
    }
    .icon-select:before {
        content: '\ea82';
    }
    .icon-send_1:before {
        content: '\ea83';
    }
    .icon-send:before {
        content: '\ea84';
    }
    .icon-service:before {
        content: '\ea85';
    }
    .icon-setting_1:before {
        content: '\ea86';
    }
    .icon-setting_2:before {
        content: '\ea87';
    }
    .icon-setting:before {
        content: '\ea88';
    }
    .icon-settings_1:before {
        content: '\ea89';
    }
    .icon-settings:before {
        content: '\ea8a';
    }
    .icon-share_1:before {
        content: '\ea8b';
    }
    .icon-share_2:before {
        content: '\ea8c';
    }
    .icon-share_3:before {
        content: '\ea8d';
    }
    .icon-share_4:before {
        content: '\ea8e';
    }
    .icon-share:before {
        content: '\ea8f';
    }
    .icon-sharing:before {
        content: '\ea90';
    }
    .icon-sharring:before {
        content: '\ea91';
    }
    .icon-ship:before {
        content: '\ea92';
    }
    .icon-shopping-bag:before {
        content: '\ea93';
    }
    .icon-shutter_1:before {
        content: '\ea94';
    }
    .icon-shutter:before {
        content: '\ea95';
    }
    .icon-signal_1:before {
        content: '\ea96';
    }
    .icon-signal_2:before {
        content: '\ea97';
    }
    .icon-signal_3:before {
        content: '\ea98';
    }
    .icon-signal_4:before {
        content: '\ea99';
    }
    .icon-signal:before {
        content: '\ea9a';
    }
    .icon-sim-card_1:before {
        content: '\ea9b';
    }
    .icon-sim-card:before {
        content: '\ea9c';
    }
    .icon-smart-clock:before {
        content: '\ea9d';
    }
    .icon-smart-home:before {
        content: '\ea9e';
    }
    .icon-smart-phone:before {
        content: '\ea9f';
    }
    .icon-smile_1:before {
        content: '\eaa0';
    }
    .icon-smile:before {
        content: '\eaa1';
    }
    .icon-sms:before {
        content: '\eaa2';
    }
    .icon-snow:before {
        content: '\eaa3';
    }
    .icon-snowday:before {
        content: '\eaa4';
    }
    .icon-sound:before {
        content: '\eaa5';
    }
    .icon-speech:before {
        content: '\eaa6';
    }
    .icon-speedometer:before {
        content: '\eaa7';
    }
    .icon-spotlight-2:before {
        content: '\eaa8';
    }
    .icon-spotlight:before {
        content: '\eaa9';
    }
    .icon-square:before {
        content: '\eaaa';
    }
    .icon-star_1:before {
        content: '\eaab';
    }
    .icon-star_2:before {
        content: '\eaac';
    }
    .icon-star:before {
        content: '\eaad';
    }
    .icon-statistic_1:before {
        content: '\eaae';
    }
    .icon-statistic:before {
        content: '\eaaf';
    }
    .icon-stopwatch:before {
        content: '\eab0';
    }
    .icon-suitcase:before {
        content: '\eab1';
    }
    .icon-sun:before {
        content: '\eab2';
    }
    .icon-sunrise:before {
        content: '\eab3';
    }
    .icon-sunset:before {
        content: '\eab4';
    }
    .icon-support:before {
        content: '\eab5';
    }
    .icon-swipe-payment:before {
        content: '\eab6';
    }
    .icon-tab:before {
        content: '\eab7';
    }
    .icon-table:before {
        content: '\eab8';
    }
    .icon-tag:before {
        content: '\eab9';
    }
    .icon-talk:before {
        content: '\eaba';
    }
    .icon-talking:before {
        content: '\eabb';
    }
    .icon-target_1:before {
        content: '\eabc';
    }
    .icon-target:before {
        content: '\eabd';
    }
    .icon-tea:before {
        content: '\eabe';
    }
    .icon-telephone_1:before {
        content: '\eabf';
    }
    .icon-telephone-2:before {
        content: '\eac0';
    }
    .icon-telephone:before {
        content: '\eac1';
    }
    .icon-temperature_1:before {
        content: '\eac2';
    }
    .icon-temperature:before {
        content: '\eac3';
    }
    .icon-text_1:before {
        content: '\eac4';
    }
    .icon-text:before {
        content: '\eac5';
    }
    .icon-texting:before {
        content: '\eac6';
    }
    .icon-thinking:before {
        content: '\eac7';
    }
    .icon-thumb:before {
        content: '\eac8';
    }
    .icon-ticket:before {
        content: '\eac9';
    }
    .icon-time_1:before {
        content: '\eaca';
    }
    .icon-time-sand:before {
        content: '\eacb';
    }
    .icon-time:before {
        content: '\eacc';
    }
    .icon-timer:before {
        content: '\eacd';
    }
    .icon-toilet:before {
        content: '\eace';
    }
    .icon-top-seller:before {
        content: '\eacf';
    }
    .icon-trash_1:before {
        content: '\ead0';
    }
    .icon-trash:before {
        content: '\ead1';
    }
    .icon-travel:before {
        content: '\ead2';
    }
    .icon-tribute:before {
        content: '\ead3';
    }
    .icon-trip:before {
        content: '\ead4';
    }
    .icon-trophy:before {
        content: '\ead5';
    }
    .icon-truck:before {
        content: '\ead6';
    }
    .icon-tv:before {
        content: '\ead7';
    }
    .icon-umbrella_1:before {
        content: '\ead8';
    }
    .icon-umbrella:before {
        content: '\ead9';
    }
    .icon-up-box:before {
        content: '\eada';
    }
    .icon-up:before {
        content: '\eadb';
    }
    .icon-user_1:before {
        content: '\eadc';
    }
    .icon-user_2:before {
        content: '\eadd';
    }
    .icon-user-card:before {
        content: '\eade';
    }
    .icon-user:before {
        content: '\eadf';
    }
    .icon-users:before {
        content: '\eae0';
    }
    .icon-vacuum-cleaner:before {
        content: '\eae1';
    }
    .icon-vector:before {
        content: '\eae2';
    }
    .icon-verification:before {
        content: '\eae3';
    }
    .icon-victory:before {
        content: '\eae4';
    }
    .icon-video-camera:before {
        content: '\eae5';
    }
    .icon-video:before {
        content: '\eae6';
    }
    .icon-visa:before {
        content: '\eae7';
    }
    .icon-voice-recording:before {
        content: '\eae8';
    }
    .icon-voice:before {
        content: '\eae9';
    }
    .icon-wallet:before {
        content: '\eaea';
    }
    .icon-warehouse:before {
        content: '\eaeb';
    }
    .icon-warning_1:before {
        content: '\eaec';
    }
    .icon-warning:before {
        content: '\eaed';
    }
    .icon-web-box:before {
        content: '\eaee';
    }
    .icon-whatsapp:before {
        content: '\eaef';
    }
    .icon-wifi_1:before {
        content: '\eaf0';
    }
    .icon-wifi_2:before {
        content: '\eaf1';
    }
    .icon-wifi:before {
        content: '\eaf2';
    }
    .icon-winner:before {
        content: '\eaf3';
    }
    .icon-wire:before {
        content: '\eaf4';
    }
    .icon-wireless-charger:before {
        content: '\eaf5';
    }
    .icon-world_1:before {
        content: '\eaf6';
    }
    .icon-world:before {
        content: '\eaf7';
    }
    .icon-write_1:before {
        content: '\eaf8';
    }
    .icon-write_2:before {
        content: '\eaf9';
    }
    .icon-write:before {
        content: '\eafa';
    }
    .icon-zcash:before {
        content: '\eafb';
    }
    .icon-c-arrow-right:before {
        content: '\eafc';
    }
    .icon-c-arrow-bottom-circle:before {
        content: '\eafd';
    }
    .icon-c-arrow-left:before {
        content: '\eafe';
    }
    .icon-c-check-outside-circle:before {
        content: '\eaff';
    }
    .icon-c-documents-file-excel:before {
        content: '\eb00';
    }
    .icon-c-paper-notes-text:before {
        content: '\eb01';
    }
    .icon-c-news:before {
        content: '\eb02';
    }
    .icon-c-fast-delivery:before {
        content: '\eb03';
    }
    .icon-c-bitcoin:before {
        content: '\eb04';
    }
    .icon-c-bitcoin-circle:before {
        content: '\eb05';
    }
    .icon-c-menu-block-checkmark:before {
        content: '\eb06';
    }
    .icon-c-caret-right:before {
        content: '\eb07';
    }
    .icon-c-dollar-circle:before {
        content: '\eb08';
    }
    .icon-c-analytics:before {
        content: '\eb09';
    }
    .icon-c-check:before {
        content: '\eb0a';
    }
    .icon-c-calendar:before {
        content: '\eb0b';
    }
    .icon-c-sort-filter:before {
        content: '\eb0c';
    }
    .icon-c-check-circle:before {
        content: '\eb0d';
    }
    .icon-c-player:before {
        content: '\eb0e';
    }
    .icon-twitter:before {
        content: '\eb0f';
    }
    .icon-linkedin:before {
        content: '\eb10';
    }
</style>
