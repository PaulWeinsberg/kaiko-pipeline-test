<template>
    <SIMain>
        <SIWrapper flex-direction="column">
            <ul>
                <CardProfile
                    :image="{
                        url: 'http://22kai001.spin/wp-content/uploads/sites/1/2023/03/rectangle-2.jpg.webp',
                    }"
                    name="Nom prénom"
                    role="Fonction"
                />
            </ul>
        </SIWrapper>
        <SIWrapper flex-direction="column">
            <CardFAQ
                tag="div"
                title="Test title"
                answer="<p>Ceci est un test de réponse</p>"
            />
            <CardFAQ
                tag="div"
                title="Test title"
                answer="<p>Ceci est un test de réponse</p>"
            />
            <CardFAQ
                tag="div"
                title="Test title"
                answer="<p>Ceci est un test de réponse</p><p><a target='_blank' href='https://www.google.com'>Test button</a></p>"
            />
            <CardFAQ
                tag="div"
                title="Test title"
                answer="<p>Ceci est un test de réponse</p>"
            />
        </SIWrapper>
    </SIMain>
</template>

<script>
    export default {
        name: 'SimonPreparation',
    }
</script>

<style scoped></style>
