// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, 'vuedist/book.html'),
    assetsRoot: path.resolve(__dirname, 'vuedist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    // assetsPublicPath: '/v4tb/vuedist/',
    productionSourceMap: true
  },
  dev: {
    port: 8888,
    proxyTable: {
      '/wxpages': 'http://hz3.whiletime.com',
      '/wxmessagedetail': 'http://hz3.whiletime.com',
      '/wxbook': 'http://hz3.whiletime.com'
    }
  }
}
