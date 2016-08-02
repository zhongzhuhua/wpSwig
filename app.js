// 引用 express path swig
var express = require('express');
var path = require('path');
var swig = require('swig');

// 创建服务器对象，是否开发环境，读取端口
var app = express();
var isDev = process.env.NODE_ENV !== 'production';
var port = isDev ? 3000 : process.env.PORT;
process.env.PORT = port;

// 配置静态文件服务器
app.use(express.static(__dirname));

// 设置视图文件夹，设置视图后缀名，设置 html 文件由 swig 模板引擎管理
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// 全局配置，提供给 nodejs 使用，包括模板引擎也可以使用
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

if (isDev) {
  // 如果是开发环境，加载开发环境配置文件
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.dev.config.js');
  // 加载 dev hot 中间件，让 node 管理 webpack-dev-server
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');

  // 装载 webpack 容器
  var compiler = webpack(webpackConfig);

  // 链接 webpack 服务器
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: false,
    inline: true,
    stats: {
      cached: false,
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  // 定义路由器
  require('./server/routes/index')(app);

  // 创建应用服务器
  var http = require('http');
  var server = http.createServer(app);

  server.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  });

  // 重载配置
  var reload = require('reload');
  reload(server, app);
} else {

}
