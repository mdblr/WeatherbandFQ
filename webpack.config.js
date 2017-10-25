const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'web', 
  node: { 
    fs: 'empty',
  },
  entry: __dirname + '/src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.png$|\.jpg$|\.jpeg$/,
        use: ['file-loader']
      },
      {
        test: /\.ttf$|\.svg$|\.eot$|\.woff$|.woff2$/,
        use: ['url-loader']
      } 
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
}

