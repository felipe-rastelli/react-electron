const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        electron: require('electron/package.json').version
      },
      useBuiltIns: "usage",
      corejs: 2
    }
  ],
  ["@babel/preset-react"]
];

const plugins = [
  'react-hot-loader/babel'
];

module.exports = { presets, plugins };
