'use strict';
const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const JsMinifyPlugin = require('babel-minify-webpack-plugin');
const postcssAutoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssNano = require('cssnano');

const bourbon = require('bourbon');

const isProduction = process.argv.indexOf('-p') >= 0
  || process.env.NODE_ENV === 'production';

const isDevelopment = !isProduction;

module.exports = {
  context: __dirname,
  mode: isProduction ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-2', 'react']
          }
        }]
      }, {
        test: /\.woff2$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssAutoprefixer({
                    browsers: ['ie >= 11', 'last 4 version']
                  }),
                  postcssImport(),
                  postcssNano({
                    presets: 'default'
                  })
                ],
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  bourbon.includePaths,
                  __dirname + '/node_modules/mathsass/dist'
                ],
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlPlugin({template: path.resolve(__dirname, 'src/index.html')}),
    new ExtractTextPlugin('bundle.css'),
    new JsMinifyPlugin({}, {
      comments: false
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'docs')
  }
};
