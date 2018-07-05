var Wxmlify = require('../../vendor/wxmlify/wxmlify.js')
var app = getApp()
Page({
    data: {
        test: '发文'
    },
    onLoad() {
        var article = wx.getStorageSync('current_article');
        // new 一个 wxmlify 实例就好了
        new Wxmlify(article.content, this, {});
        this.setData({
            articleItem: article
        });
        this.setData({
            category: app.getCategoryMap()
        }); 
    }
})