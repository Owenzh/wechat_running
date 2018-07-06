var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var moment = require('../../vendor/moment/moment.js');
var app = getApp()
Page({
  data: {
    currentTab: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var category = app.getCategory();
    this.setData({
      cate: category
    });
    this.getArticleViaCategory(category[0].value);
  },

  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
      that.getArticleViaCategory(e.target.dataset.currentCategory.value);
    }
  },
  getArticleViaCategory: function (categoryVal) {
    util.showBusy('请求中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/article_list/category/${categoryVal}`,
      login: true,
      success(result) {
        util.showSuccess('请求成功完成')
        var article_list = result.data.data.res;
        for (var i = 0, len = article_list.length; i < len; i++) {
          var dataIns = new Date(article_list[i].creatts);
          article_list[i].creatts = moment(dataIns).format('YYYY-MM-DD HH:mm');
        }
        that.setData({
          requestResult: article_list
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  viewArticle: function (event) {
    try {
      wx.setStorageSync('current_article', event.currentTarget.dataset.article);
      var detail = {
        url: '../detail/detail'
      };
      wx.navigateTo(detail);
    } catch (e) {}
  }
})