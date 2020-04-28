const merge = require('webpack-merge')
const baseConf = require('./webpack.config.base')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}

module.exports = merge(baseConf, {
  mode: 'development',
  entry: './example/main.ts',
  output: {
    path: resolve('dist'),
    filename: 'app.js',
    publicPath: '/'
  }
})
