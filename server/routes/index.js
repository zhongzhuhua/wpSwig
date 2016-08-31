'use strict';

var express = require('express');
var router = express.Router();
var pageList = require('./pagelist.json');

// slug 用作每个页面body的样式定义, slug值尽量和要渲染的页面名一致 
// webpack在做自动获取入口路径时，也可以考虑使用此处的slug

module.exports = (app) => {

  Array.from(pageList, (pageInfo) => {
    app.use(router.get(pageInfo.route, function(req, res, next) {  
      pageInfo.data['commonjs'] = 'common.js';
      res.render(pageInfo.render + '.html', pageInfo.data);
    }));
    app.use(router.get(pageInfo.route + '.html', function(req, res, next) {  
      pageInfo.data['commonjs'] = 'common.js';
      res.render(pageInfo.render + '.html', pageInfo.data);
    }));
    return pageInfo;
  });

};
