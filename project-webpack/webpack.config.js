const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = (env, argv) => {
  const developMode = argv.mode === 'development';
  const productionMode = argv.mode === 'production';
  const config = {
    entry: './src/js/index.js',
    output: {
      path: developMode ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'build'),
      filename: '[name].js'
    },
    devtool: developMode ? 'source-map' : 'none',
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
                hmr: true
              }
            },
            'css-loader',
            'sass-loader'
          ],
          exclude: '/node_modules/'
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader'
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        }
      ]
    },
    resolve: {
      alias: {
        '@scss': path.resolve(__dirname, 'src/scss'),
        '@img': path.resolve(__dirname, 'src/images'),
        '@': path.resolve(__dirname, 'src')
      },
      modules: ['node_modules', path.resolve(__dirname, 'src')]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: true
      })
    ]
  };
  if (developMode) {
    config.plugins = (config.plugins || []).concat([
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
      })
    ]);
  }
  if (productionMode) {
    config.plugins = (config.plugins || []).concat([
      new HtmlWebpackPlugin({
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      })
    ]);
  }
  return config;
};
