module.exports = async function module() {
  const nuxtInstance = this
  nuxtInstance.nuxt.hook('generate:done', async (_, errors) => {
    console.info('Check generation status...');

    // We do not take care about not found errors, only the other ones
    const hasUnexpectedErrors = !errors.every(({ error }) => error.statusCode && error.statusCode === 404);

    if (hasUnexpectedErrors) {
      throw new Error('❌ Generation check failed, exit process');
    } else {
      console.info('✅ Generation check is OK');
    }
  })
}
module.exports.meta = require('./package.json')
