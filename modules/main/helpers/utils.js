const { readdirSync, statSync } = require('fs')

export const getFiles = path => {
    return readdirSync(path)
}
export const getDirectories = path => {
    return getFiles(path).filter(file => {
        return statSync(path + '/' + file).isDirectory()
    })
}
