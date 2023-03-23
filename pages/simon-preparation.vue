<template>
    <SIMain>
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
