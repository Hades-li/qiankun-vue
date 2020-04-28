const webpack = require('webpack')
const webpackBaseConf = require('./webpack.config.prd')

webpack(webpackBaseConf, (err, stats) => {
  if (err || stats.hasErrors()) {
    // Handle errors here
    console.log('err->', err)
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  }
})
