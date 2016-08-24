// 公用工具类
var path = require('path');
var fs = require('fs');
var rootPath = path.resolve('client');

/* 读取所有脚本，生成 webpack entry 入口文件
 */
function getEntryMap() {
  var result = {};

  // 读取非 vendors 下的所有文件
  var files = getAllFiles('./client/js', /^(?!.*vendors).*\.js$/);

  if (files != null) {
    files.forEach(function(item) {
      var filePath = item.replace(rootPath + '/js/', '').replace('.js', '');
      var key = filePath;
      result[key] = ['./client/js/' + filePath];
    });
  }

  // console.log(result);
  return result;
};

// getEntryMap();
exports.getEntryMap = getEntryMap;

/* 读取目录下所有文件
 * @param root 根目录
 * @param reg 文件正则匹配
 */
function getAllFiles(root, reg) {
  var res = [];
  var files = fs.readdirSync(root);
  files.forEach(function(file) {
    var pathname = root + '/' + file,
      stat = fs.lstatSync(pathname);

    if (!stat.isDirectory()) {
      if (reg.test(path.resolve(root, file))) {
        res.push(path.resolve(root, file));
      }
    } else {
      res = res.concat(getAllFiles(pathname, reg));
    }
  });

  // console.log(res);
  return res;
};

exports.getAllFiles = getAllFiles;

// var list = this.getAllFiles('server/views', /^(?!.*_inc).*\.html$/);
var swig = require('swig');
var list = require('./server/routes/pagelist.json');
var pathPublic = path.resolve('public');

list.forEach(function(item, index) {
  var filePath = path.resolve('server/views', item.render + '.html');
  var content = swig.compileFile(filePath, item.data);
  console.log('public/' + item.render)
  createFile('public/' + item.render + '.html', content, {});
});

function createFile(root, content) {
  var pathArr = root.split('/');
  var dirPath = pathArr.slice(0, pathArr.length);
  var fileName = pathArr.slice(pathArr.length);
  for (var i = 0; i < dirPath.length; i++) {
    var p = path.resolve(dirPath.slice(0, i).join('/'));
    if (dirPath[i] && !fs.existsSync(p)) {
      fs.mkdirSync(p, '0777');
    }
  }
  fs.writeFileSync(path.resolve(root), content, {});
}
