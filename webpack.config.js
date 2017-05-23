const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const isProd = env.prod === true;
  const isExample = env.example === true;
  const type = isExample ? 'example' : 'lib';

  console.log(`Compiling: ${type} in mode: ${isProd ? 'production': 'dev'}`);

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
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
    plugins: [],
  };

  if (!isExample) {
    config.output.libraryTarget = 'commonjs2';
    // @see https://github.com/webpack/webpack/issues/603#issuecomment-215547651
    config.externals = /^[^.]/;
    return config;
  }

  config.devServer = {
    contentBase: outputPaths.example,
    compress: true,
    port: 8080,
  };

  config.plugins.push(new HtmlWebpackPlugin({
    template: './example/src/index.ejs',
  }));

  return config;
};
