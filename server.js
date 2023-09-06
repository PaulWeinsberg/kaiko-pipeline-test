const { loadNuxt, build } = require('nuxt')

const app = require('express')()
const port = process.env.PORT || 3000

const isNotDev = ['test']
const isDev = !isNotDev.includes(process.env.NODE_ENV)

async function start() {
    const nuxt = await loadNuxt(isDev ? 'dev' : 'start')
    app.use(nuxt.render)
    if (isDev) {
        build(nuxt)
    }
    app.listen(port, '0.0.0.0')
}

start()
