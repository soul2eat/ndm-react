const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const IGNORES_MODULES = [];
const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
const outputPath = path.join(__dirname, (isDev?'./dev-build/':'./../dist/'));

module.exports = {
  entry: './src/main.ts',
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  externals: [
    ExternalIgoners(IGNORES_MODULES)
  ],
  devtool: isDev?'source-map':'nosources-source-map',
  target: 'electron-main', // for start with electron and add default electron module
  node: {
    __dirname: false //__dirname becomes / if do nothing about it
  },
  watch: isDev?true:false,
  watchOptions: {
    aggregateTimeout: 3000,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'public' },
      { from: 'src/assets', to: 'assets' },
    ]),
    new webpack.DefinePlugin({
      "process.env":{
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    new CheckerPlugin(),

  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
}
/**
 * 
 * @param {array} IGNORES_MODULES - array list with ignored modules 
 */
function ExternalIgoners(IGNORES_MODULES) {
  return function (context, request, callback) {
    if (IGNORES_MODULES.indexOf(request) >= 0) {
      return callback(null, "require('" + request + "')");
    }
    return callback();
  };
}