// modules/static-uploads/module.js
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')

module.exports = async function module() {
  const nuxtInstance = this
  const distPath = path.join(__dirname, '../../dist')
  const assets = path.join(__dirname, '../../assets')

  nuxtInstance.nuxt.hook('generate:before', async () => {

    console.info('Static uploads download...');

    const apiUrl = process.env.API_URL

    try {
      // Fetch uploads from the API
      const { data } = await axios.get(`${apiUrl}/uploads`, {
        headers: {
          'X-Auth-Token': process.env.API_KEY
        }
      })

      const uploads = data.uploads

      // Chuncks uploads in 10
      const chunks = uploads.reduce((acc, upload, index) => {
        if (index % 10 === 0) acc.push([])
        acc[acc.length - 1].push(upload)
        return acc
      }, []);

      // Download each upload by 10 batch
      for (const uploads of chunks) {
        const promises = uploads.map(async upload => {
          // Create the target directory if it doesn't exist
          const targetDir = path.join(assets, path.dirname(decodeURI(upload.path)))
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true })
          }

          // Download the upload
          const targetPath = path.join(assets, decodeURI(upload.path))
          const writer = fs.createWriteStream(targetPath)

          return new Promise((resolve, reject) => {
            axios({
              method: 'GET',
              url: decodeURI(upload.url),
              responseType: 'stream'
            })
            .then(response => response.data.pipe(writer))
            .catch(error => {
              console.error(`Failed to download: ${decodeURI(upload.path)}`)
              console.error(error);
              reject(error)
            })

            writer.on('finish', () => {
              console.log(`Downloaded: ${decodeURI(upload.path)}`)
              resolve();
            })
            writer.on('error', error => {
              console.error(`Failed to download: ${decodeURI(upload.path)}`)
              console.error(error);
              reject();
            })
          })
        });
        await Promise.allSettled(promises);
      }

      console.info('Static uploads download complete!')
    } catch (error) {
      console.error('Error downloading uploads:', error)
    }
  })

  nuxtInstance.nuxt.hook('generate:done', async () => {
      // Copy assets in dist directory
      fs.copySync(assets, distPath + '/assets');
      console.info('Static uploads copy complete!')
  })
}
module.exports.meta = require('./package.json')