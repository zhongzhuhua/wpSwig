var path = require('path');
var swig = require('swig');
var webpack = require('webpack');
var del = require('del');
var utils = require('./utils');
var entryMap = utils.getEntryMap();

// 复制插件，把 client/libs 下所有插件原封不动搬到 libs 下
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var pluginsCopy = new TransferWebpackPlugin([
  { from: './client/libs', to: './libs' }
], path.resolve(__dirname));

// 独立打包文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('./css/[name].[chunkhash:8].css');

// 项目配置
var configs = {
  path: './public/',
  resolve: 'client/js',
  extensions: ['', '.js', '.json', '.scss', '.css']
};

// 打包所需配置
var webpackConfigs = {

  // 插件
  plugins: [
    pluginsCopy,
    new webpack.optimize.CommonsChunkPlugin('js/common.[chunkhash:8].js'),
    extractCSS
  ],

  // 脚本入口文件配置
  entry: entryMap,

  // 打包后，脚本文件输出配置， path 配置所有输出的根目录
  output: {
    filename: 'js/[name].[chunkhash:8].js', //html(或者模板)页面将引入的是这个js，这里的name就是上面entry中的K值
    path: configs.path
  },

  // 其他方案入口，webpack 从该配置进入查找所有文件
  resolve: {
    // 入口根文件夹
    root: path.resolve(process.cwd(), configs.resolve),
    // 默认文件后缀
    extensions: configs.extensions,
    // 别名配置
    alias: {
      gm: 'vendors/global'
    }
  },

  // 全局插件
  externals: {
    jquery: 'jQuery'
  },

  module: {
    //加载器配置
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss$/,
      include: /client/,
      exclude: /(node_modules|bower_components)/,
      loader: extractCSS.extract(['css?minimize', 'sass?sourceMap'])
    }]
  },
};


// 文件 hash 值
var hashJson = {};
var rootPath = path.resolve('public');

// 开始执行打包
console.log('webpack begin...');
module.exports = webpackConfigs;

// 删除源打包文件
del.sync(configs.path);
console.log('webpack remove public...');

// 执行回调
webpack(webpackConfigs, function() {

  // 遍历脚本 hash
  var list = utils.getAllFiles('public/js', /\.js$/);
  list.forEach(function(item, index) {
    var name = item.replace(rootPath + '/js/', '');
    var key = name.substring(0, name.lastIndexOf('.js') - 9) + '.js';
    if (key != '') {
      hashJson[key] = name;
    }
  });

  // 便利样式 hash
  list = utils.getAllFiles('public/css', /\.css$/);
  list.forEach(function(item, index) {
    var name = item.replace(rootPath + '/css/', '');
    var key = name.substring(0, name.lastIndexOf('.css') - 9) + '.css';
    if (key != '') {
      hashJson[key] = name;
    }
  });

  console.log('webpack hash success...');

  // swig to html
  list = utils.getAllFiles('server/views', /^(?!.*_inc).*\.html$/);
  list.forEach(function(item, index) {
  });

});
