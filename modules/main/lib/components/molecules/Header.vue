<template>
    <div class="header">
        <SIWrapper overflow="initial">
            <SILogo ref="logo" />
            <div class="container">
                <div ref="content" class="content">
                    <MenuHeader ref="menu" :items="headerItems" />
                    <div v-if="buttons" ref="buttons" class="buttons">
                        <SILink
                            v-for="(button, i) in buttons"
                            :key="i"
                            btn
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
</template>

<script>
    export default {
        name: 'Header',
        computed: {
            ...mapState({
                header: state => state.menu.menu,
                windowWidth: state => state.general.windowWidth,
                options: state => state.options.options,
            }),
        },
    }
</script>

<style scoped></style>
