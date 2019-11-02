// Webpack modules
const webpack = require('webpack');

// Local modules
const paths = require("./paths");

const nodeEnvPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
});

const config = {
  mode: 'development',
  target: "electron-main",
  devtool: "source-map",
  entry: paths.mainIndexJs,
  output: {
    filename: "main.js",
    path: paths.mainBuild
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        include: paths.appSrc,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: paths.moduleFileExtensions
  },
  plugins: [
    nodeEnvPlugin
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
    __dirname: false,
    __filename: false
  },
};

module.exports = (env, argv) => config;