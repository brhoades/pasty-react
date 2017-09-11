const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    build: "./src/app.tsx",
    hljs: "highlight.js",
    react: [
      "react",
      "react-router",
      "react-redux",
      "react-router-redux",
      "react-router-dom",
      "react-dom",
    ],
    redux: [
      "redux",
      "redux-form",
      "redux-saga",
    ],
    semantic: "semantic-ui-react",
    vendor: [
      "buffer",
      "clipboard",
      "js-cookie",
      "lodash",
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[hash:8].js",
    chunkFilename: "[name].[hash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: [
          {
            loader: "babel-loader",
            options: {
              "cacheDirectory": "./.babel_cache",
            },
          },
          "ts-loader",
        ],
        exclude: /node_modules|dist/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        exclude: /node_modules/,
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
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
    noInfo: true,
  },
  devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      hljs: "highlight.js",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        "hljs",
        "react",
        "redux",
        "semantic",
        "vendor",
      ],
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
      },
    ]),
    new HtmlWebpackPlugin({
      template: "src/index.ejs",
    })
  ],
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  module.exports.output.publicPath = "./";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: "\"production\"",
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      cache: true,
      minimize: true,
      parallel: true,
      sourceMap: true,
      warnings: false,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    // new BundleAnalyzerPlugin(),
  ]);
}
