const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const tsLoader = nextLoader => ({
  test: /\.(ts|tsx|js|)$/,
  use: [{ loader: 'ts-loader' }, nextLoader].filter(Boolean),
  exclude: [/node_modules/, /\.ejs$/],
});

module.exports = (env) => {
  const isProd = env.prod === true;
  const isExample = env.example === true;
  const type = isExample ? 'example' : 'lib';

  // eslint-disable-next-line no-console
  console.log(`Compiling: ${type} in mode: ${isProd ? 'production' : 'dev'}`);

  const entries = {
    example: './example/src/index.tsx',
    lib: './src/index.ts',
  };

  const outputPaths = {
    example: path.resolve(__dirname, 'example/dist'),
    lib: path.resolve(__dirname, 'dist'),
  };

  const config = {
    entry: entries[type],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      path: outputPaths[type],
      filename: 'index.js',
    },
  };

  if (isProd) {
    return webpackMerge(config, {
      module: {
        rules: [tsLoader()],
      },
      mode: 'production',
      optimization: {
        minimize: false,
      },
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
    });
  }

  return webpackMerge(config, {
    module: {
      rules: [
        tsLoader({
          loader: 'linaria/loader',
          options: {
            sourceMap: true,
          },
        }),
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
  });
};
