var Wxmlify = require('../../vendor/wxmlify/wxmlify.js')
var sample = require('../../vendor/wxmlify/sample.js')
Page({
    data: {
        test: '发文'
    },
    onLoad() {
        var article = wx.getStorageSync('current_article');
        // new 一个 wxmlify 实例就好了
        var wxmlify = new Wxmlify(article.content, this, {})
    }
})