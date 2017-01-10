module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
      }, {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: __dirname + '/static/js',
    publicPath: '/',
    filename: 'bundle.js'
  },
};