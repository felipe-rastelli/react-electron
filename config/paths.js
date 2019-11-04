const path = require("path");

const moduleFileExtensions = [
  '.web.mjs',
  '.mjs',
  '.web.js',
  '.js',
  '.web.ts',
  '.ts',
  '.web.tsx',
  '.tsx',
  '.json',
  '.web.jsx',
  '.jsx',
];

module.exports = {
  appSrc: path.resolve(__dirname, '../renderer'),
  appIndexJs: path.resolve(__dirname, '../renderer/index.js'),
  mainSrc: path.resolve(__dirname, '../main'),
  mainIndexJs: path.resolve(__dirname, '../main/index.js'),
  buildSrc: path.resolve(__dirname, '../build'),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
