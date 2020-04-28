const merge = require('webpack-merge')
const baseConf = require('./webpack.config.base')

module.exports = merge(baseConf, {
  mode: 'production',
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  }
})
