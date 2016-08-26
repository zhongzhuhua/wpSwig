console.log('index');

require('./../scss/index.scss');

require('gm');
var $ = require('jquery');
require('./hello');

$(function(argument) {
  console.log('jquery init');
});
