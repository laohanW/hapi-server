'use strict';
const services = require('../services')
module.exports = {
  toFan: function (request, h) {
    return services.base();
  },
  cancelFan: function (request, h) {
    return services.test.demo1();
  },
  list: function (request, h) {
    return services.test.demo2();
  }
}
