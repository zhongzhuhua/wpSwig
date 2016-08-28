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
      var key = item.replace(rootPath, '').replace(/\\+/g, '/').replace('.js', '');
      result[key.replace('/js/', '')] = ['./client' + key];
    });
  }

  // console.log(rootPath);
  // console.log(result);
  return result;
};

//getEntryMap();
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


/* 创建文件
 * @param root 保存的路径
 * @param content 文件内容
 */
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
};

exports.createFile = createFile;
