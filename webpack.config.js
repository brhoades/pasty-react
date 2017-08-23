const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    build: './src/app.tsx',
    libs: [
      'highlight.js',
      'zepto-webpack',
      'pgwcookie'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        exclude: /node_modules/,
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
    alias: {
      actions: path.resolve(__dirname, "src/actions"),
      css: path.resolve(__dirname, "src/assets"),
      sagas: path.resolve(__dirname, "src/sagas"),
      components: path.resolve(__dirname, "src/components"),
      containers: path.resolve(__dirname, "src/containers"),
      helpers: path.resolve(__dirname, "src/helpers"),
      reducers: path.resolve(__dirname, "src/reducers"),
    },
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      hljs: "highlight.js",
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
        from: "node_modules/highlight.js/styles/*",
        to: "assets/hljs-themes/[name].[ext]"
      }
    ]),
  ],
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.output.publicPath = './'
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
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      hash: true
    })
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      cache: false
    })
  ]);
}
