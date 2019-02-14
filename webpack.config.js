const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProd = env.prod === true;
  const isExample = env.example === true;
  const type = isExample ? 'example' : 'lib';

  // eslint-disable-next-line no-console
  console.log(`Compiling: ${type} in mode: ${isProd ? 'production' : 'dev'}`);

  const entries = {
    example: './example/src/index.js',
    lib: './src/index.js',
  };

  const outputPaths = {
    example: path.resolve(__dirname, 'example/dist'),
    lib: path.resolve(__dirname, 'dist'),
  };

  const config = {
    entry: entries[type],
    output: {
      path: outputPaths[type],
      filename: 'index.js',
    },
  };

  if (isProd) {
    return webpackMerge(
      config,
      {
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              use: 'babel-loader',
              exclude: /node_modules/,
            },
          ],
        },
        mode: 'production',
        output: {
          library: 'ReactRouterLastLocation',
          libraryTarget: 'umd',
        },
        // @see https://github.com/webpack/webpack/issues/603#issuecomment-215547651
        externals: /^[^.]/,
        plugins: [
          new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
          }),
        ],
      },
    );
  }

  return webpackMerge(
    config,
    {
      module: {
        rules: [
          {
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: 'linaria/loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              'css-hot-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: 'global',
                  sourceMap: true,
                },
              },
            ],
          },
        ],
      },
      mode: 'development',
      devtool: 'cheap-module-eval-source-map',
      devServer: {
        contentBase: outputPaths.example,
        compress: true,
        hot: true,
        port: 8080,
        historyApiFallback: { disableDotRule: true },
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './example/src/index.ejs',
        }),
        new MiniCssExtractPlugin({
          filename: 'styles.css',
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
    },
  );
};
