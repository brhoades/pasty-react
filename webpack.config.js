/* tslint:disable */
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const pkg = require("./package.json");

module.exports = {
  entry: {
    build: "./src/App.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[hash:8].js",
    chunkFilename: "[name].[chunkhash:8].js",
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
    extensions: [".worker.ts", ".ts", ".js", ".tsx"],
    alias: {
      actions: path.resolve(__dirname, "src/actions"),
      css: path.resolve(__dirname, "src/assets"),
      sagas: path.resolve(__dirname, "src/sagas"),
      components: path.resolve(__dirname, "src/components"),
      containers: path.resolve(__dirname, "src/containers"),
      middleware: path.resolve(__dirname, "src/middleware"),
      helpers: path.resolve(__dirname, "src/helpers"),
      reducers: path.resolve(__dirname, "src/reducers"),
      pages: path.resolve(__dirname, "./src/pages"),
      configfile: path.resolve(__dirname, "config"),
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
  module.exports.optimization = Object.assign((module.exports.optimization || {}), {
    splitChunks: {
     chunks: "initial",
      maxInitialRequests: 8,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        react: {
          test: /[\\/]node_modules[\\/].*?react.*?[\\/]/,
          priority: -10,
        },
        semantic: {
          test: /[\\/]node_modules[\\/].*?semantic.*?[\\/]/,
          priority: -5,
        },
        hjs: {
          test: /[\\/]node_modules[\\/].*?highlight.*?[\\/]/,
          priority: -5,
        },
      },
    },
  });

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: "\"production\"",
      },
      "VERSION": `"${pkg.version}"`,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: 4,
      sourceMap: true,
      uglifyOptions: {
        toplevel: true,
      },
    }),
  ])
}
