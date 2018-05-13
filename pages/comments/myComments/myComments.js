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
    //commentDate:"2018-5-12",
    comments:{},
    takeSession:false,
    scoreStars:[]
  },

  getCommentStars: function () {
    var that = this;
    var starRank;
    for (var i = 0; i < that.data.comments.length; i++) {
      starRank = that.data.comments[i].commentStar;
      var scoreStars = 'commentStars[' + i + ']'
      // console.log(i)
      // console.log(that.data.requestDishResult[i].starRank)
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

  //请求评论信息 by mengql

  requestCommentList: function () {
    util.showBusy('正在加载评论...')
    var that = this
    var options = {
      url: config.service.personalCommentlistUrl,

      //需要在data里指定所有你需要的查询参数
      data: {
        openid:app.globalData.userInfo.openId
      },
      success(result) {
        util.showSuccess('加载完成')
        var objectArray = result.data.data
        that.setData({
          comments: objectArray
        })
        console.log(that.data.comments)
        that.getCommentStars()
        console.log(that.data.commentStars)
      },
      fail(error) {
        util.showModel('加载失败，请检查网络', error);
        console.log('request fail', error);
      }
    }
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.requestCommentList()
  
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