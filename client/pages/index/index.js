//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        requestResult: ''
    },
    onLoad: function () {
        this.getTopFive();
    },
    getTopFive: function () {
        util.showBusy('请求中...')
        var that = this
        qcloud.request({
            url: `${config.service.host}/weapp/article_list/top/5`,
            login: true,
            success(result) {
                util.showSuccess('请求成功完成')
                console.log(result.data);
                that.setData({
                    requestResult: result.data.data.res
                })
            },
            fail(error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    },
})