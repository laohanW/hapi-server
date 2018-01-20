const services = require('../services')
module.exports = {
    demo0:function(request,h){
        return services.base();
    },
    demo1: function(request, h){
        return services.test.demo1();
    },
    demo2: function(request, h){
        return services.test.demo2();
    }
}