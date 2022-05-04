const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/pages/index.js',
    output: {
        filename: 'main.js',
          path: path.resolve(__dirname, 'dist')
    },
    plugins: [
          new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src', 'index.html')
        })
      ],
    mode: 'development',
    module:  {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1
                    }
                  },
                  'postcss-loader'
                ]
              },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
        ],
    },
} 