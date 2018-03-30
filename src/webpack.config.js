const tier = process.env.NODE_ENV;
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const prefixer = require('autoprefixer');
const p = require('../package.json');

module.exports = {
  entry: {
    'main': path.join(__dirname, 'main.js'),
    'index': path.join(__dirname, 'index.html.in')
  },

  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[hash:7].css',
          sourceMap: true
        }
      }, {
        loader: 'extract-loader',
        options: {
          publicPath: '/dist/',
          sourceMap: true
        }
      }, {
        loader: 'css-loader',
        options: {
          minimize: true,
          discardComments: {
            removeAll: true
          },
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: function () { return [prefixer] },
          sourceMap: true
        }
      }]
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[hash:7].css',
          sourceMap: true
        }
      }, {
        loader: 'extract-loader',
        options: {
          publicPath: '/dist/',
          sourceMap: true
        }
      }, {
        loader: 'css-loader',
        options: {
          minimize: true,
          discardComments: {
            removeAll: true
          },
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: function () { return [prefixer] },
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }, {
      test: /\.html\.in$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '../[name]'
        }
      }, {
        loader: 'extract-loader',
        options: {
          publicPath: '/dist/'
        }
      }, {
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'link:href'],
          interpolate: true
        }
      }]
    }, {
      test: /\.(png|jpg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }]
  },

  output: {
    filename: `[name].${p.version}.min.js`,
    path: path.resolve(__dirname, '../public/dist'),
    publicPath: '/dist/'
  },

  plugins: [
    new CopyPlugin([{
      from: 'src/img',
      to: '../img'
    }])
  ]
};
