// Webpack modules
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

// Local modules
const paths = require("./paths");

const htmlPlugin = new HtmlWebPackPlugin({
  template: paths.appHtml,
  filename: paths.appBuildHtml,
  inject: true
});

const nodeEnvPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
});

const hotModulePlugin = new webpack.HotModuleReplacementPlugin();

const config = {
  mode: 'production',
  target: "electron-renderer",
  devtool: "source-map",
  entry: paths.appIndexJs,
  output: {
    filename: "renderer.js",
    path: paths.appBuild
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: paths.appSrc,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: paths.moduleFileExtensions
  },
  plugins: [
    nodeEnvPlugin,
    htmlPlugin,
    hotModulePlugin
  ],
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

module.exports = (env, argv) => config;
