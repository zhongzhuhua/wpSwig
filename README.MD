# 创建 nodejs 项目，使用 swig 模板引擎，使用 webpage 构建工具

# 安装 nodejs

# 由于项目使用 sass 是基于 ruby 的，所以需要安装 ruby，使用 rvm 来安装 ruby
# 安装 rvm
  curl -L https://get.rvm.io | bash -s stable

# 检查 rvm 版本
# 使用 source 指令，初始化环境变量，然后使用 rvm -v检查安装版本，如果不用 source 的话，直接关闭重启 cmd[终端] 也可以
  source ~/.rvm/scripts/rvm
  rvm -v

# 安装 ruby，若不写 2.1.1 版本，则是默认安装最新版本，需要一定时间
  sudo rvm install [2.1.1]
# 安装完成之后，如果是多版本，使用下面指令，设置默认的 ruby 版本
  rvm 2.1.1 --default
# 使用 gem -v 查询 ruby 版本
  gem -v

# 查询当前所有版本 rvm list known
# 查询当前安装的版本 rvm list
# 删除某一个版本 rvm remove 2.1.1

# 使用下面的语句，把 ruby 数据源从 rubygems 切换成淘宝的，防止被墙
  gem source -a https://ruby.taobao.org
  gem source --remove https://rubygems.org/

# gem source -l 查询数据源

# 安装 sass
  [sudo] gem install sass
# sass -v 查看 sass 版本

# 安装 webpack 解析器和插件，如果需要其他的，图片什么的，自己安装
  npm install style-loader css-loader sass-loader 

# 安装 webpack 独立打包文件
  [sudo] npm install extract-text-webpack-plugin -g
   npm install extract-text-webpack-plugin [--save-dev]


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