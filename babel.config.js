const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        chrome: 60,
        electron: require('electron/package.json').version
      },
      useBuiltIns: "usage",
      corejs: 2
    }
  ],
  ["@babel/preset-react"]
];

const plugins = [
  'react-hot-loader/babel',
  '@babel/plugin-proposal-class-properties'
];

module.exports = { presets, plugins };
