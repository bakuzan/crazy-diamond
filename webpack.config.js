const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const isDev = env.MODE === 'development';
  const publicPath = isDev ? '/' : '/static';

  return {
    mode: env.MODE,
    entry: './src/index.ts',
    devtool: isDev ? 'inline-source-map' : 'none',
    devServer: {
      contentBase: './dist',
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:5000'
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: false,
              minimize: !isDev
            }
          }
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                { search: '%PUBLIC_URL%', replace: publicPath, flags: 'g' }
              ]
            }
          },
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      modules: [path.resolve('./node_modules')],
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: 'head',
        template: 'public/index.html',
        favicon: 'public/favicon.ico'
      })
    ]
  };
};
