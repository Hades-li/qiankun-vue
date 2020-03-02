'use strict'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: 'src/main.ts',
  //     // 模板来源
  //     template: 'public/index.html',
  //     // 在 dist/index.html 的输出
  //     filename: 'index.html'
  //   }
  // },
  productionSourceMap: false,
  parallel: false,
  configureWebpack: config => {
    if (isProd) {
      config.entry = {
        index: [
          'src/index.ts'
        ]
      }
    }
    if (!isProd) {
      config.entry = {
        index: [
          '@/main.ts'
        ]
      }
    }
  },
  chainWebpack: config => {
    if (isProd) {
      // config.entry('index').clear().add(path.resolve(__dirname, 'src/index.ts')).end()
      config.output
        .filename('index.js')
        .libraryTarget('umd')
        .library('QiankunVue')
      // disable cache (not sure if this is actually useful...)
      // config.module.rule('ts').uses.delete('cache-loader')
      // 要自动生成d.ts文件，必须如下设置
      config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap(opts => {
          opts.transpileOnly = false
          opts.happyPackMode = false
          return opts
        })

      // 排除掉Vue
      config.externals({
        vue: 'Vue'
      })

      config.optimization.splitChunks(false) // 是否代码分割
      // config.optimization.minimize(false) // 是否打开代码压缩
    }

    config.resolve.alias
      .set('src', path.resolve(__dirname, './src'))
      .set('@', path.resolve(__dirname, './example'))
      .set('package', path.resolve(__dirname, './src'))
      .end()
  }
}
