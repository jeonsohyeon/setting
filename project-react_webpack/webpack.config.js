const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const developMode = argv.mode === 'development';
  const productionMode = argv.mode === 'production';
  const config = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
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
          test: /\.(js|jsx)$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          exclude: '/node_modules/'
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
          exclude: '/node_modules/'
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'src')],
      extensions: ['*', '.js', '.jsx'],
      alias: {
        '@img': path.resolve(__dirname, 'src/images')
      }
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  };
  return config;
};
