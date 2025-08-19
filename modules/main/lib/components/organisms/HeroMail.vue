<template>
    <HubspotBase :vars="vars" :on-submit="onSubmit" :file="file" />
</template>

<script>
    import HubspotBase from '../molecules/HubspotBase.vue'

    export default {
        name: 'HeroMail',
        components: { HubspotBase },
        props: {
            vars: {
              type: Object,
              required: false,
              default: null
            },
            onSubmit: {
                type: String,
                required: false,
                default: null,
            },
            file: {
                type: Object,
                required: false,
                default: null,
            },
        },
    }
</script>
