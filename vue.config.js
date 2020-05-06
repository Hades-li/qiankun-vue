'use strict'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  productionSourceMap: false,
  parallel: false,
  chainWebpack: config => {
    // prd
    if (isProd) {
      config.entry('index').clear().add('./src/index.ts')
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
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue'
        }
      })

      config.optimization.splitChunks(false) // 是否代码分割
      // config.optimization.minimize(false) // 是否打开代码压缩
    }
    // dev
    if (!isProd) {
      config.entry('index').clear().add('./example/main.ts')
    }

    config.resolve.alias
      .set('src', path.resolve(__dirname, './src'))
      .set('@', path.resolve(__dirname, './example'))
      .set('packages', path.resolve(__dirname, './packages'))
      .end()
  }
}
