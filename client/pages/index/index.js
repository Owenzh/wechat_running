//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        logged: false,
        requestResult: ''
    },
    onLoad: function () {
        this.getTopFive();
    },
    // 用户登录示例
    bindGetUserInfo: function () {
        if (this.data.logged) return

        util.showBusy('正在登录')

        const session = qcloud.Session.get()

        if (session) {
            // 第二次登录
            // 或者本地已经有登录态
            // 可使用本函数更新登录态
            qcloud.loginWithCode({
                success: res => {
                    this.setData({
                        userInfo: res,
                        logged: true
                    })
                    util.showSuccess('登录成功')
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        } else {
            // 首次登录
            qcloud.login({
                success: res => {
                    this.setData({
                        userInfo: res,
                        logged: true
                    })
                    util.showSuccess('登录成功')
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        }
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
    viewArticle: function (event) {
        console.log(event.currentTarget.dataset.article);
        try {
            wx.setStorageSync('current_article', event.currentTarget.dataset.article);
            var detail = {
                url: '../detail/detail'
            };
            wx.navigateTo(detail);
        } catch (e) {}
    }
})