<template>
    <SectionEdito class="container-profile" :content="content">
        <ul class="grid-profiles">
            <CardProfile
                v-for="(profile, i) in content.profiles"
                :key="i"
                :name="profile.name"
                :role="profile.role"
                :image="profile.picture"
            />
        </ul>
    </SectionEdito>
</template>

<script>
    import CardProfile from '../molecules/CardProfile.vue'
    import SectionEdito from './SectionEdito.vue'

    export default {
        name: 'ContainerProfile',
        components: { CardProfile, SectionEdito },
        props: {
            content: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped lang="scss">
    .container-profile {
        --count: 5;
        --gap: 1.2rem;
        @media screen and (max-width: $littleLaptopBreakPoint) {
            --count: 3;
            --gap: 0.6rem;
        }
        @media screen and (max-width: $littleMobileBreakPoint) {
            --count: 2;
        }
        @media screen and (max-width: 360px) {
            --count: 1;
        }
        .test {
            background-color: var(--test);
        }
        .grid-profiles {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: var(--gap);
            .card-profile {
                // fullGap = 1.2rem * (5 - 1))
                $fullGap: calc(var(--gap) * (var(--count) - 1));
                // max-width: (100% - {fullGap}) / 5;
                max-width: calc((100% - $fullGap) / var(--count));
            }
        }
    }
</style>
