// Permet de sortir les xml du routeur Nuxt
export default function (context) {
    const { route } = context
    if (route.path.includes('.xml')) {
        document.location.href = route.path
    }
}
