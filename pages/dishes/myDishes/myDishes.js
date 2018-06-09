// pages/comments/myComments/myComments.js
var util = require("../../../utils/util")
var config = require("../../../config")
var qcloud = require('../../../vendor/wafer2-client-sdk/index')

var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: {},
    takeSession: false,
    commentStars: [],
    requestDishResult:[],
    dishCount: 0,
    scoreStars: [],
    image_prefix: config.service.image_prefix,
    image_suffix: config.service.image_suffix,
  },

  getCommentStars: function () {
    var that = this;
    var starRank;
    for (var i = 0; i < that.data.comments.length; i++) {
      starRank = that.data.comments[i].commentStar;
      var scoreStars = 'commentStars[' + i + ']'
      if (starRank >= 4.8) {
        that.setData({
          [scoreStars]: [2, 2, 2, 2, 2]
        })
      } else if (starRank >= 4.3 && starRank < 4.8) {
        that.setData({
          [scoreStars]: [2, 2, 2, 2, 1]
        })
      } else if (starRank >= 3.8 && starRank < 4.3) {
        that.setData({
          [scoreStars]: [2, 2, 2, 2, 0]
        })
      } else if (starRank >= 3.3 && starRank < 3.8) {
        that.setData({
          [scoreStars]: [2, 2, 2, 1, 0]
        })
      } else if (starRank >= 2.8 && starRank < 3.3) {
        that.setData({
          [scoreStars]: [2, 2, 2, 0, 0]
        })
      } else if (starRank >= 2.3 && starRank < 2.8) {
        that.setData({
          [scoreStars]: [2, 2, 1, 0, 0]
        })
      } else if (starRank >= 1.8 && starRank < 2.3) {
        that.setData({
          [scoreStars]: [2, 2, 0, 0, 0]
        })
      } else if (starRank >= 1.3 && starRank < 1.8) {
        that.setData({
          [scoreStars]: [2, 1, 0, 0, 0]
        })
      } else if (starRank >= 0.8 && starRank < 1.3) {
        that.setData({
          [scoreStars]: [2, 0, 0, 0, 0]
        })
      } else if (starRank >= 0.3 && starRank < 0.8) {
        that.setData({
          [scoreStars]: [1, 0, 0, 0, 0]
        })
      } else if (starRank < 0.3) {
        that.setData({
          [scoreStars]: [0, 0, 0, 0, 0]
        })
      }
    }
  },


  showDish: function (e) {
    wx.navigateTo({
      url: '/pages/randomDish/randomDish?isRandom=0&id=' + this.data.requestDishResult[e.currentTarget.id].ID + '&canteen=' + this.data.requestDishResult[e.currentTarget.id].canteen
    })
  },

  requestFavouredDishList: function () {
    // util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.favoureddishesUrl,

      //需要在data里指定所有你需要的查询参数
      data: {
        openid:getApp().globalData.userInfo.openId
      },
      success(result) {
        util.showSuccess('加载完成')
        var objectArray = result.data.data
        that.setData({
          requestDishResult: objectArray,
          dishCount: objectArray.length
        })
        that.getStars();
      },
      fail(error) {
        util.showModel('请求失败', error);
      }
    }
    this.data.takeSession = false;
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
    }
  },

  getStars: function () {
    var that = this;
    var starRank;
    for (var i = 0; i < that.data.requestDishResult.length; i++) {
      starRank = that.data.requestDishResult[i].starRank;
      var scoreStars = 'scoreStars[' + i + ']'
      if (starRank >= 4.8) {
        that.setData({
          [scoreStars]: [2, 2, 2, 2, 2]
        })
      } else if (starRank >= 4.3 && starRank < 4.8) {
        that.setData({
          [scoreStars]: [2, 2, 2, 2, 1]
        })
      } else if (starRank >= 3.8 && starRank < 4.3) {
        that.setData({
          [scoreStars]: [2, 2, 2, 2, 0]
        })
      } else if (starRank >= 3.3 && starRank < 3.8) {
        that.setData({
          [scoreStars]: [2, 2, 2, 1, 0]
        })
      } else if (starRank >= 2.8 && starRank < 3.3) {
        that.setData({
          [scoreStars]: [2, 2, 2, 0, 0]
        })
      } else if (starRank >= 2.3 && starRank < 2.8) {
        that.setData({
          [scoreStars]: [2, 2, 1, 0, 0]
        })
      } else if (starRank >= 1.8 && starRank < 2.3) {
        that.setData({
          [scoreStars]: [2, 2, 0, 0, 0]
        })
      } else if (starRank >= 1.3 && starRank < 1.8) {
        that.setData({
          [scoreStars]: [2, 1, 0, 0, 0]
        })
      } else if (starRank >= 0.8 && starRank < 1.3) {
        that.setData({
          [scoreStars]: [2, 0, 0, 0, 0]
        })
      } else if (starRank >= 0.3 && starRank < 0.8) {
        that.setData({
          [scoreStars]: [1, 0, 0, 0, 0]
        })
      } else if (starRank < 0.3) {
        that.setData({
          [scoreStars]: [0, 0, 0, 0, 0]
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestFavouredDishList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})