var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    main: './src/js/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist/js/'),
    filename: '[name].js',
    publicPath: '/dist/js/'
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
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      riot: "riot"
    })
  ]
};
