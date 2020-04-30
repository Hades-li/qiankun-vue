const merge = require('webpack-merge')
const baseConf = require('./webpack.config.base')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}
const env = process.env.NODE_ENV
module.exports = merge(baseConf({ NODE_ENV: env }), {
  mode: env,
  entry: './src/index.ts',
  output: {
    path: resolve('dist'),
    filename: 'index.js',
    publicPath: '/',
    chunkFilename: 'js/[name].[contenthash:8].js',
    libraryTarget: 'umd',
    library: 'QiankunVue'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    // 清理dist文件夹
    new CleanWebpackPlugin()
  ]
})
