module.exports = async function module() {
  const nuxtInstance = this
  nuxtInstance.nuxt.hook('generate:done', async (_, errors) => {
    console.info('Check generation status...');

    // We do not take care about not found errors, only the other ones
    const hasUnexpectedErrors = !errors.every(({ error }) => error.statusCode && error.statusCode === 404);

    if (hasUnexpectedErrors) {
      // Throwing std js errors here does not stop the github action
      console.error('❌ Generation check failed, exit process');
      process.exit(1);
    } else {
      console.info('✅ Generation check is OK');
    }
  })
}
module.exports.meta = require('./package.json')
