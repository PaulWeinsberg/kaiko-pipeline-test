const fs = require('fs')
const path = require('path')

module.exports = async function module() {
  const nuxtInstance = this
  nuxtInstance.nuxt.hook('generate:done', async () => {

    console.info('Static URL override...');

    const distPath = path.join(__dirname, '../../dist')

    function replaceInFile(filePath) {
      try {
        let content = fs.readFileSync(filePath, 'utf8')
        const originalContent = content
        content = content
          .replaceAll(process.env.SSR_PROTOCOL + '://' + process.env.SSR_HOST, process.env.STATIC_PROTOCOL + '://' + process.env.STATIC_HOST);

        if (content !== originalContent) fs.writeFileSync(filePath, content, 'utf8');

      } catch (error) {
        console.error(`Error processing ${filePath}:`, error)
      }
    }

    function walkDirectory(dir) {
      try {
        const files = fs.readdirSync(dir)
        files.forEach(file => {
          const filePath = path.join(dir, file)
          const stat = fs.statSync(filePath)

          if (stat.isDirectory()) {
            walkDirectory(filePath)
          } else if (stat.isFile()) {
            replaceInFile(filePath)
          }
        })
      } catch (error) {
        console.error(`Error walking directory ${dir}:`, error)
      }
    }

    walkDirectory(distPath)
    console.info('Static URL override complete.')
  })
}
module.exports.meta = require('./package.json')
