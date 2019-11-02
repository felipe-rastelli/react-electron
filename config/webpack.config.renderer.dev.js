// Node modules
const { spawn } = require('child_process');

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
  'process.env.NODE_ENV': JSON.stringify('development')
});

const hotModulePlugin = new webpack.HotModuleReplacementPlugin();

const config = {
  mode: 'development',
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
  devServer: {
    contentBase: paths.mainBuild,
    port: 3000,
    publicPath: '/dist',
    hotOnly: true,
    after: (app, server, compiler) => {
      spawn(
        'electron',
        [`${paths.mainBuild}/main.js`],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      .on('close', code => process.exit(0))
      .on('error', err => console.error(err));
    }
  },
};

module.exports = (env, argv) => config;
