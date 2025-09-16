// modules/static-images/module.js
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')

module.exports = async function module() {
  const nuxtInstance = this
  const distPath = path.join(__dirname, '../../dist')
  const assets = path.join(__dirname, '../../assets')

  nuxtInstance.nuxt.hook('generate:before', async () => {

    console.info('Static images download...');

    const apiUrl = process.env.API_URL

    try {
      // Fetch images from the API
      const { data } = await axios.get(`${apiUrl}/images`, {
        headers: {
          'X-Auth-Token': process.env.API_KEY
        }
      })

      const images = data.images

      // Download each image
      const promises = images.map(async image => {
        // Create the target directory if it doesn't exist
        const targetDir = path.join(assets, path.dirname(image.path))
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true })
        }

        // Download the image
        const targetPath = path.join(assets, image.path)
        const writer = fs.createWriteStream(targetPath)

        const response = await axios({
          method: 'GET',
          url: image.url,
          responseType: 'stream'
        })

        response.data.pipe(writer)

        return new Promise((resolve, reject) => {
          writer.on('finish', () => {
            console.log(`Downloaded: ${image.path}`)
            resolve();
          })
          writer.on('error', () => {
            console.error(`Failed to download: ${image.path}`)
            reject();
          })
        })
      });

      await Promise.allSettled(promises);

      console.info('Static images download complete!')
    } catch (error) {
      console.error('Error downloading images:', error)
    }
  })

  nuxtInstance.nuxt.hook('generate:done', async () => {
      // Copy assets in dist directory
      fs.copySync(assets, distPath + '/assets');
      console.info('Static images copy complete!')
  })
}
module.exports.meta = require('./package.json')