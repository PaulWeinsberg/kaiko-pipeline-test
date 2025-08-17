// Permet de rediriger les urls avec un / à la fin
export default function (context) {
    const { route, redirect } = context
    if (
        route.path !== '/' && // Si on est pas sur la home
        route.path.endsWith('/') // Si l'url finis bien par un /
    ) {
        // On redirige vers l'url sans /
        const { path, query, hash } = route
        const nextPath = path.replace(/\/+$/, '') || '/'
        const nextRoute = { path: nextPath, query, hash }
        redirect(nextRoute)
    }
}
