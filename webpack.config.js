const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env) => {
  const isDev = env.MODE === 'development';
  const publicPath = isDev ? '/' : '/static/';
  const productionPlugins = isDev
    ? []
    : [
        new WebpackPwaManifest({
          name: 'Crazy Diamond',
          short_name: 'CZD',
          description: 'Crazy Diamond is an image sliding puzzle game.',
          background_color: '#ffffff',
          theme_color: '#f8d2d2',
          crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
          icons: [
            {
              src: path.resolve('public/favicon.png'),
              destination: path.join('icons'),
              sizes: [32, 96, 128, 192, 256, 384, 512]
            }
          ]
        }),
        new WorkboxPlugin.GenerateSW({
          swDest: path.resolve('dist', 'sw.js'),
          clientsClaim: true,
          skipWaiting: true
        })
      ];

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
              attributes: false,
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
      }),
      new CopyPlugin([
        { from: 'public/puzzles.html', to: 'puzzles.html' },
        { from: 'public/_puzzle.html', to: '_puzzle.html' }
      ]),
      ...productionPlugins
    ]
  };
};
