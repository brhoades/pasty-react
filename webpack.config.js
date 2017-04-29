const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    build: './src/main.ts',
    libs: [
      'crypto-js',
      'vue',
      'vue-clip',
      'vue-router',
      'highlight.js',
      'zepto-webpack'
    ]
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
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ path.join(__dirname, './src') ],
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
      "hljs": "highlight.js",
      $: "zepto-webpack"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "libs",
      minChunks: Infinity,
    }),
    new CopyWebpackPlugin([
      {
        from: "src/assets/*",
        to: "assets/[name].[ext]"
      },
      {
        from: "src/assets/font/*",
        to: "assets/font/[name].[ext]"
      },
      {
        from: "node_modules/highlight.js/styles/obsidian.css",
        to: "assets/[name].[ext]"
      },
      {
        from: "node_modules/purecss/build/pure-min.css",
        to: "assets/[name].[ext]"
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
      compress: {
        warnings: false
      },
      minimize: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ])
}
