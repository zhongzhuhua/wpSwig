'use strict';

var express = require('express');
var router = express.Router();

// slug 用作每个页面body的样式定义, slug值尽量和要渲染的页面名一致 
// webpack在做自动获取入口路径时，也可以考虑使用此处的slug

module.exports = (app) => {
	app.use(router.get('/', function(req, res, next) {
	  res.render('index', { 
	  	title: '首页',
	  	slug: 'index'
	  });
	}));
}