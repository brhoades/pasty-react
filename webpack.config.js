var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    build: './src/main.ts',
    libs: ['crypto-js', 'jquery', 'vue', 'vue-clip', 'clipboard', 'vue-router']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "CryptoJS": "crypto-js",
      "Clipboard": "clipboard"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "libs",
      minChunks: Infinity,
    }),
    new CopyWebpackPlugin([
      {
        from: "src/main.css",
        to: "main.css"
      }
    ])
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
