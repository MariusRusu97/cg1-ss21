/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = env => {
  const dist = env && env.production;
  const config = {
    mode: dist ? 'production' : 'development',
    devServer: {
      contentBase: path.join(__dirname, 'assets'),
      host: 'localhost',
      open: true,
    },
    entry: './src/main.ts',
    module: {
      rules: [
        {
          test: /\.(glsl|vs|fs|vert|frag)$/,
          use: ['raw-loader', 'glslify-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{from: './assets', to: 'assets'}],
      }),
      new HtmlWebpackPlugin({
        title: 'LMU Munich Computer Graphics SS21',
        meta: {
          viewport: `width=device-width, initial-scale=1, 
          shrink-to-fit=no, maximum-scale=1.0, user-scalable=no`,
        },
      }),
      ...(dist
        ? [
            new WebpackObfuscator(
              {
                rotateStringArray: true,
              },
              ['[name].js']
            ),
          ]
        : []),
    ],
    devtool: dist ? false : 'inline-source-map',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
    },
    performance: {hints: false},
  };
  return config;
};
