const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const IGNORES_MODULES = ['electron'];
const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';


module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path:  path.join(__dirname, '../dist/react'),
    filename: 'bundle.min.js',
    publicPath: isDev?'/':'.'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
          test: /\.css$/,
          use: [
            (isDev?'style-loader':MiniCssExtractPlugin.loader), 
            'style-loader', 
            'css-loader'
          ]
      }
    ]
  },
  externals: [
    ExternalIgoners(IGNORES_MODULES)
  ],
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
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
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    contentBase: './index.html',
    port: 3000,
    historyApiFallback: true
  }
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