var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [{
      test: /\.j(s|sx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
          presets: ['es2015', 'react', 'babel-preset-es2015']
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]!postcss'
    }]
  },
  resolve: {
    extensions: [ '', '.js', '.json', '.jsx', '.es6', '.babel', '.node' ]
  },
  node: {
    fs: "empty"
  },
  _hotPort: 3000,
  postcss: [
    require('postcss-modules-values')
  ]
}
