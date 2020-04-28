const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}

module.exports = {
  entry: './src/index.ts',
  output: {
    path: resolve('dist'),
    filename: 'index.js',
    publicPath: '/',
    chunkFilename: 'js/[name].[contenthash:8].js',
    libraryTarget: 'umd',
    library: 'QiankunVue'
  },
  resolve: {
    alias: {
      '@': resolve('example'),
      src: resolve('src'),
      vue$: 'vue/dist/vue.runtime.esm.js',
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      // resolve('node_modules/@vue/cli-service/node_modules'),
      // resolve('node_modules/@vue/cli-plugin-babel/node_modules'),
      // resolve('node_modules/@vue/cli-plugin-typescript/node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
}
