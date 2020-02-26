'use strict'
const path = require('path')

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'example/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, './example'))
      .set('src', path.resolve(__dirname, './src'))
  }
}
