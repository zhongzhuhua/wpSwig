var path = require('path');
var webpack = require('webpack');
var entryMap = require('./server/routes/entrymap.json');

// 复制文件
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var pluginsCopy = new TransferWebpackPlugin([
  { from: './client/libs', to: './libs' }
], path.resolve(__dirname));

module.exports = {

  // 插件
  plugins: [
    pluginsCopy,
    new webpack.optimize.CommonsChunkPlugin('common.js')
  ],

  // 脚本入口文件配置
  entry: entryMap,

  // 打包后，脚本文件输出配置
  output: {
    filename: '[name].js', //html(或者模板)页面将引入的是这个js，这里的name就是上面entry中的K值
    path: './public/'
  },

  // 其他方案入口，webpack 从该配置进入查找所有文件
  resolve: {
    // 入口根文件夹
    root: path.resolve(process.cwd(), 'client'),
    // 默认文件后缀
    extensions: ['', '.js', '.json', '.scss'],
    // 别名配置
    alias: {
      gm: 'js/vendors/global'
    }
  },

  // 全局插件
  externals: {
    jquery: 'jQuery'
  },

  module: {
    //加载器配置
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      //{ test: /\.js$/, loader: 'jsx-loader?harmony' },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
      //{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
};
