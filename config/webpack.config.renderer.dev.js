// Node modules
const { spawn } = require('child_process');

// Webpack modules
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

// Local modules
const paths = require("./paths");

const htmlWebPackPluginInstance = new HtmlWebPackPlugin({
  title: 'React + Electron boilerplate',
});

const nodeEnvPluginInstance = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
});

const hotModuleReplacementPluginInstance = new webpack.HotModuleReplacementPlugin();

const config = {
  mode: 'development',
  target: "electron-renderer",
  devtool: "source-map",
  entry: [
    '@babel/polyfill',
    'react-hot-loader/patch',
    paths.appIndexJs
  ],
  output: {
    filename: "renderer.js",
    path: paths.buildSrc,
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
      },
      // Extract all .global.css to style.css as is
      {
        test: /\.global\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // Pipe other styles through css modules and append to style.css
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              },
              sourceMap: true
            }
          }
        ]
      },
      // SASS support - compile all .global.scss files and pipe it to style.css
      {
        test: /\.global\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // SASS support - compile all other .scss files and pipe it to style.css
      {
        test: /^((?!\.global).)*\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              },
              sourceMap: true,
              importLoaders: 1,
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'
          }
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: paths.moduleFileExtensions
  },
  plugins: [
    nodeEnvPluginInstance,
    hotModuleReplacementPluginInstance,
    htmlWebPackPluginInstance
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
    contentBase: [paths.buildSrc],
    port: 3000,
    publicPath: '/',
    index: 'index.html',
    hot: true,
    after: (app, server, compiler) => {
      spawn(
        'electron',
        [`${paths.buildSrc}/main.js`],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      .on('close', code => process.exit(0))
      .on('error', err => console.error(err));
    }
  },
};

module.exports = (env, argv) => config;
