var webpack = require('webpack');
// js css 热更新
var commonHot = new webpack.HotModuleReplacementPlugin();

if (process.env.NODE_ENV == 'test') {

  module.exports = {
    // 插件
    plugins: [commonHot],

    // 脚本入口文件配置
    entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      './index.js'
    ],

    // 脚本文件输出配置
    output: {
      filename: 'index.js'
    }
  };

} else {

  module.exports = {
    // 脚本入口文件配置
    entry: {
      'global': './jquery.js',
      'index': './index.js'
    },

    // 脚本文件输出配置
    output: {
      path: './assets',
      filename: '[name].js'
    },

    // 加载配置
    module: {
      loaders: [{
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.html$/,
        loader: 'raw-loader'
      }]
    }
  };
  
}
