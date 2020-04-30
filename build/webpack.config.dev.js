const merge = require('webpack-merge')
const baseConf = require('./webpack.config.base')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}
const env = process.env.NODE_ENV // 获取全局环境变量

module.exports = merge(baseConf({ NODE_ENV: env }), {
  mode: env,
  entry: './example/main.ts',
  output: {
    path: resolve('dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: resolve('dist'),
    port: 8080,
    hot: true
  },
  module: {
    rules: [
      // 开发环境进行eslint规则校验
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'qiankun',
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.ico')
    })

  ]
})
