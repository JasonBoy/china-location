'use strict';

const reformat = require('./lib/reformat');

module.exports = {
  reformatLocation: reformat,
  ChinaLocation: require('./lib/ChinaLocation'),
};