var Wxmlify = require('../../vendor/wxmlify/wxmlify.js')
var sample = require('../../vendor/wxmlify/sample.js')
Page({
    data: {
        text: '发文'
    },
    onLoad() {
        // 以任何方式获得要解析的Html代码
        // var html = getHTMLStringSomehow()

        // new 一个 wxmlify 实例就好了
        var wxmlify = new Wxmlify(sample.test, this, {})
    }
})