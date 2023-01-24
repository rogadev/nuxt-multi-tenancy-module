const { resolve } = require('path')

module.exports = function () {
  const options = this.options.multiTenancyModule
  
  if (!options) return console.error('multiTenancyModule option must be specified in Nuxt config')
  
  if (!Array.isArray(options.tenants)) return console.error('multiTenancyModule tenants must be an array of tenant names')
  
  if (!options.defaultTenant) console.warn('multiTenancyModule default tenant has not been specified')

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'router.js',
    options
  })

  let defaultRouter

  try {
    defaultRouter = require.resolve('@nuxt/vue-app/template/router')
  } catch (err) {
    try {
      defaultRouter = require.resolve('@nuxt/vue-app-edge/template/router')
    } catch (err) {
      /* istanbul ignore next */
      defaultRouter = require.resolve('nuxt/lib/app/router')
    }
  }

  this.addTemplate({
    fileName: 'defaultRouter.js',
    src: defaultRouter
  })
}
