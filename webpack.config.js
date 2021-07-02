const { VueLoaderPlugin } = require('vue-loader')

module.exports = [{
  mode: 'production',
  entry: {
    index: {
      import: './src/index',
      layer: 'need-neat-prefix'
    }
  },
  experiments: {
    layers: true
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [{
      issuerLayer: 'need-neat-prefix',
      use: [{
        loader: 'text-transform-loader',
        options: {
          prependText: 'console.info("neat prefix!");'
        }
      }]
    }]
  }
}]
