const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    app: ['./src/app.js'],
  },
  devtool: 'sourcemap',
  node: {
    fs: 'empty',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'app.js',
    chunkFilename: '[hash]/js/[id].js',
    hotUpdateMainFilename: '[hash]/update.json',
    hotUpdateChunkFilename: '[hash]/js/[id].update.js',
  },
  devServer: {
    contentBase: 'dist',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        include: path.join(__dirname, 'node_modules', 'pixi.js'),
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-es2015-destructuring', 'transform-es2015-parameters'],
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/index.html' },
      { from: 'assets/textures', to: 'assets/textures' },
    ]),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  stats: {
    colors: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
};
