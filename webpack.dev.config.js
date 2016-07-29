let webpack = require('webpack');
// js css 热更新
let commonHot = new webpack.HotModuleReplacementPlugin();
let publicPath = 'http://localhost:' + process.env.PORT + '/';
const entryMap = require('./server/routes/entrymap.json');

module.exports = {
  // 插件
  plugins: [commonHot],

  // 脚本入口文件配置
  entry: entryMap,

  // 脚本文件输出配置
  output: {
    filename: '[name].js', //html(或者模板)页面将引入的是这个js，这里的name就是上面entry中的K值
    path: '/',
    publicPath: publicPath
  },
  // 全局插件
  externals: {
    jquery: 'window.$'
  }
};
