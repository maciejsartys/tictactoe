module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [{
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