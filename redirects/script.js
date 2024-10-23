const fs = require('fs')
const { parse } = require('csv-parse')

const args = process.argv.slice(2)
const csvName = args[0]
const fileName = args[1]

const redirects = []

/**
 * Permet de récupérer toutes les lignes du csv
 * @param {Array} row La ligne
 */
const getRow = row => {
    if (row[0] && row[1]) {
        let from = row[0].startsWith('/') ? `^${row[0]}` : `^/${row[0]}`

        redirects.push({
            from: `${from}$`,
            to: row[1],
        })
    }
}

/**
 * Permet de créer le fichier avec les bonnes datas
 */
const createFile = () => {
    const path = `${__dirname}/list/${fileName}.js`
    const content = `const ${fileName} = ${JSON.stringify(
        redirects,
        null,
        0
    )};export default ${fileName};`

    if (!fs.existsSync(path)) {
        fs.writeFile(path, content, err => {
            console.error('WriteFile error : ', err)
        })
    } else {
        console.error('Ce fichier existe déjà')
    }
}

const onError = err => {
    console.error(err)
}

fs.createReadStream(`${__dirname}/csv/${csvName}.csv`)
    .pipe(parse({ delimiter: [';', ','] }))
    .on('data', getRow)
    .on('end', createFile)
    .on('error', onError)
