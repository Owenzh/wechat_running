//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    //custome
    getCategory: function () {
        return config.view.category || [];
    },
    getCategoryMap: function () {
        return config.view.category_map || {};
    }
})