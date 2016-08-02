// 引用 express path swig
var express = require('express');
var path = require('path');
var swig = require('swig');

// 创建服务器对象，是否开发环境，读取端口
var app = express(); 
var port = 3000;

// 设置视图文件夹，设置视图后缀名，设置 html 文件由 swig 模板引擎管理
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// 配置静态文件服务器
app.use(express.static(__dirname));
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
