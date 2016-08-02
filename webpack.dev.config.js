'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/app/entry.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    loaders: [{
      test: /(\.js$|\.jsx$)/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      },
    }, {
      test: /\.json?$/,
      loader: 'json',
    }, {
      test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      loader: 'file',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url?limit=10000'
    }, {
      test: /(\.scss$|\.css$)/,
      loaders: ["style", "css", "sass"],
    }],
  },
  target: 'web'
};

// var path = require('path');
// var webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const config = {
//   entry: [
//     'webpack/hot/dev-server',
//     'webpack-hot-middleware/client?reload=true',
//     './entry.jsx'
//   ],
//   output: { path: __dirname, publicPath: '/', filename: 'bundle.js' },
//   module: {
//     loaders: [
//       {
//         test: /.jsx?$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         query: {
//           presets: ['es2015', 'react']
//         }
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'index.tpl.html',
//       inject: 'body',
//       filename: 'index.html',
//     }),
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin(),
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify('development'),
//     }),
//   ],
//   target: 'web'
// };

// module.exports = config;