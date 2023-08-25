const { loadNuxt } = require('nuxt')

const app = require('express')()
const port = process.env.PORT || 3000

async function start() {
    const nuxt = await loadNuxt('start')
    app.use(nuxt.render)
    app.listen(port, '0.0.0.0')
}

start()
