const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    build: './src/app.tsx',
    react: [
      'react',
      'react-router',
      'react-redux',
      'react-router-redux',
      'react-router-dom',
      'react-dom',
    ],
    redux: [
      'redux',
      'redux-form',
      'redux-saga',
    ],
    semantic: [
      'semantic-ui-react',
    ],
    vendor: [
      'buffer',
      'clipboard',
      'highlight.js',
      'pgwcookie',
      'zepto-webpack',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash:8].js',
    chunkFilename: "[name].[hash:8].js",
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
      names: [
        "react",
        "redux",
        "semantic",
        "vendor",
      ],
      minChunks: 2,
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
