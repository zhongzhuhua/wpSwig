let path = require('path');
let webpack = require('webpack');
const entryMap = require('./server/routes/entrymap.json');

module.exports = {
  
  // 脚本入口文件配置
  entry: entryMap,

  // 打包后，脚本文件输出配置
  output: {
    filename: '[name].js', //html(或者模板)页面将引入的是这个js，这里的name就是上面entry中的K值
    path: './public/js/'
  },

  // 其他方案入口，webpack 从该配置进入查找所有文件
  resolve: {
    // 入口根文件夹
    root: path.resolve(process.cwd(), 'public'),
    // 默认文件后缀
    extensions: ['', '.js', '.json', '.scss']
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
