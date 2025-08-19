import { getDirectories, getFiles } from '../helpers/utils'

const { resolve, join } = require('path')
const { readdirSync } = require('fs')

export default function (moduleOptions) {
    const options = {
        ...moduleOptions,
        ...this.options.main,
    }

    if (!options.namespace) options.namespace = 'main'
    const { namespace } = options

    // Permet d'ajouter nos différents éléments dans le Nuxt
    const pluginsToSync = [
        'mixins/index.js',
        'components/index.js',
        'store/index.js',
        'debug.js',
        'core.js',
        'middleware/index.js',
    ]
    // On ajoute automatiquement tous nos fichiers plugins
    const filesPlugins = getFiles(`${resolve(__dirname)}/plugins`)
    filesPlugins.forEach(name => pluginsToSync.push(`plugins/${name}`))

    pluginsToSync.forEach(plugin => {
        this.addPlugin({
            src: resolve(__dirname, plugin),
            fileName: join(namespace, plugin),
            options,
        })
    })

    // Permet de synchroniser les chemins des composants avec Nuxt (le dossier .nuxt)
    const directoriesToSync = [
        'mixins',
        'plugins',
        'store/modules',
        'plugins',
        'middleware/modules',
        'data',
    ]
    // On ajoute automatiquement tous nos dossiers composants
    const directoriesComponent = getDirectories(
        `${resolve(__dirname)}/components`
    )
    directoriesComponent.forEach(name =>
        directoriesToSync.push(`components/${name}`)
    )

    for (const pathString of directoriesToSync) {
        const path = resolve(__dirname, pathString)
        for (const file of readdirSync(path)) {
            this.addTemplate({
                src: resolve(path, file),
                fileName: join(namespace, pathString, file),
                options,
            })
        }
    }
}
