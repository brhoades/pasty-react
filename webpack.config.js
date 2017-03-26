var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/main.js',
    libs: ['crypto-js', 'jquery', 'riot', 'riotgear']
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        query: {
          hot: false, // set it to true if you are using hmr
          // add here all the other riot-compiler options riotjs.com/guide/compiler/
          // template: 'pug' for example
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "libs",
      minChunks: Infinity,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      riot: "riot",
      "riot-hot-reload": "riot-hot-reload",
      "CryptoJS": "crypto-js"
    })
  ]
};
