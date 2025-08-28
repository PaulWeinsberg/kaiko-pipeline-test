import axios from 'axios'
export const sitemapGenerator = async () => {
    try {
        const { data } = await axios.get(`${process.env.WP_URL}/sitemap.xml`)

        const regex = /<loc>(.*)<\/loc>/gm

        const sitemaps = [...data.matchAll(regex)].map(el => {
            return el[1]
        })

    const hostname = (process.env.BASE_URL || process.env.SITE_URL || process.env.WP_URL || '').replace(/\/$/, '')

    const sitemapsReturn = [
            {
                cacheTime: false,
                path: '/sitemap.xml',
                routes: [],
                exclude: ['/**'],
        hostname,
            },
        ]

        const getSitemaps = async sitemap => {
            const route = sitemap.replace(process.env.WP_URL, '')
            sitemapsReturn[0].routes.push(route)
            try {
                const { data } = await axios.get(sitemap)

                const routes = [...data.matchAll(regex)].map(el => {
                    return el[1].replace(process.env.WP_URL, '')
                })

                if (!routes) return null
                return {
                    cacheTime: false,
                    path: route,
                    routes,
                    exclude: route.includes('page-sitemap') ? [] : ['/**'],
                    hostname,
                }
            } catch (err) {
                console.error(err)
            }
        }

        for (const sitemap of sitemaps) {
            try {
                const routes = await getSitemaps(sitemap)
                if (routes) sitemapsReturn.push(routes)
            } catch (err) {
                console.error(err)
            }
        }
        return sitemapsReturn
    } catch (err) {
        console.error(err)
    }
}
