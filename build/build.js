const webpack = require('webpack')
const conf = process.env.NODE_ENV === 'production' ? require('./webpack.config.prd') : require('./webpack.config.dev')

webpack(conf, (err, stats) => {
  if (err || stats.hasErrors()) {
    // Handle errors here
    // console.log('err->', err)
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  }
})
