const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const urlMap = require('./config')
console.log(urlMap)
const original = JSON.parse(process.env.npm_config_argv).original
const url = urlMap[original[original.findIndex(item => item === '-api') + 1]]
console.log(url)
module.exports = {
  entry:{
    index: './src/index.js' //['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.[hash:8].js'
  },
  module:{
    rules:[
      {
        test: /\.js?$/, // jsx/js文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use:{
          // loader 是 babel
          loader: 'babel-loader',
          options: {
            // babel 转义的配置选项
            babelrc: false,
            presets: [
              ["@babel/preset-env",{
                "useBuiltIns":"usage"
              }],
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css/,
        use: [
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              publicPath: "../"
            }
          },
          // 'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: "[name].[hash:4].[ext]",
          outputPath: "./img",//打包后图片文件输出路径
          publicPath:'../img',
          esModule: false
        }
      },
    ]
  },
  plugins:[
    new HtmlWebPackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: true
    }),
    new CleanWebpackPlugin(), // 清空项目根目录下dist
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:6].css",
      chunkFilename: "[id].css"
      }),
    new webpack.DefinePlugin({
      'API_URL': JSON.stringify(url)
    }),
  ],
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: 3000,
    useLocalIp: true,
    proxy: {
      '/api': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    },
  },
}
