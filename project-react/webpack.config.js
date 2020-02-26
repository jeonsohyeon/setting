const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = (env, argv) => {
  const developMode = argv.mode === 'development';
  const productionMode = argv.mode === 'production';
  const config = {
    entry: './src/App.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    devtool: developMode ? 'inline-source-map' : 'none',
    devServer: {
      inline: true,
      hot: true,
      port: 8080
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: '/node_modules/',
          use: [
            // {
            //   loader: 'babel-loader',
            //   options: {
            //     babelrc: false,
            //     sourceMap: true,
            //     cacheDirectory: true,
            //     plugins: ['react-hot-loader/babel'],
            //     presets: ['@babel/preset-env']
            //   }
            // },
            {
              loader: 'ts-loader',
              options: { logLevel: 'info', silent: false, logInfoToStdOut: true }
            }
          ]
        }
      ]
    },
    plugins: [
      new CheckerPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    resolve: {
      alias: {
        '@scss': path.resolve(__dirname, 'src/scss'),
        '@img': path.resolve(__dirname, 'src/images'),
        '@': path.resolve(__dirname, 'src')
      },
      modules: ['node_modules', path.resolve(__dirname, 'src')],
      extensions: ['.ts', '.tsx', '.js']
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  };
  return config;
};
