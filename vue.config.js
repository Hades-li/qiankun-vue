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
  parallel: false,
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // disable cache (not sure if this is actually useful...)
      // config.module.rule('ts').uses.delete('cache-loader')
      /*config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap(opts => {
          opts.transpileOnly = false
          opts.happyPackMode = false
          return opts
        })*/
    }

    config.resolve.alias
      .set('@', path.resolve(__dirname, './example'))
      .set('src', path.resolve(__dirname, './src'))
      .end()
  }
}
