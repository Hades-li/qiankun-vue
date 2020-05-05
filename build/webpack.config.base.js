const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}

module.exports = (env, argv) => {
  return {
    resolve: {
      alias: {
        '@': resolve('example'),
        src: resolve('src'),
        vue$: 'vue/dist/vue.runtime.esm.js'
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
        'node_modules'
        // resolve('node_modules/@vue/cli-service/node_modules'),
        // resolve('node_modules/@vue/cli-plugin-babel/node_modules'),
        // resolve('node_modules/@vue/cli-plugin-typescript/node_modules')
      ]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                transpileOnly: true
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        // 预处理scss
        {
          test: /\.s[ac]ss$/,
          use: [
            env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        // 预处理css
        {
          test: /\.css$/,
          use: [
            env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        // 预处理图片
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 4096,
            esModule: false, // 5.0版本以上要加
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"' + env.NODE_ENV + '"',
          BASE_URL: '"/"'
        }
      }), // 给浏览器运行中添加全局变量
      new FriendlyErrorsPlugin(), // 友好的错误提示
      new MiniCssExtractPlugin(),
      new CaseSensitivePathsPlugin()
    ]
  }
}
