# 创建 nodejs 项目，使用 swig 模板引擎，使用 webpage 构建工具

# 安装 nodejs

# swig 是基于 express 运行的模板引擎，如果没有安装 express 则先安装
  [sudo] npm install express -g
  npm install express [--save-dev]

# 安装 swig
  [sudo] npm install swig -g 
	npm install swig [--save-dev]

# 安装 webpack
  [sudo] npm install webpack -g
  npm install webpack [--save-dev]

# 安装中间件 webpack-dev-middleware webpack-hot-middleware
  [sudo] npm install webpack-dev-middleware -g
  [sudo] npm install webpack-hot-middleware -g
  npm install webpack-dev-middleware [--save-dev]
  npm install webpack-hot-middleware [--save-dev]

# 安装 reload 自动重启服务器插件
  [sudo] npm install reload -g
  npm install reload [--save-dev]

# 安装 supervisor 监听服务器文件变更
  [sudo] npm install supervisor -g
  npm install supervisor [--save-dev]

# supervisor 用于监听文件，使用方式和 node 指令相似

# 如下代码，表示执行 node app.js ,如果根目录有文件修改了【除了 client 文件夹和 app.js 文件】，则重新执行 node app.js
# supervisor -i client,app.js app

# 如果目录 server 和 app.js 有修改，则重新执行 node app.js
# supervisor -w server,app.js app


# 通过配置 package.json 的 script: {} 设置执行的指令
# 使用 npm dev 执行开发环境启动
# 使用 npm start 执行生产环境启动