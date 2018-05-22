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
    commentCount: 0,
    canteen: "zijing",
    scoreStars: [],
    image_prefix: "https://tsingwind.top/weapp_img",
    image_suffix: "/1.jpg",
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

  requestCommentList: function () {
    util.showBusy('正在加载评论...')
    var that = this
    var options = {
      url: config.service.personalCommentlistUrl,

      //需要在data里指定所有你需要的查询参数
      data: {
        openid: app.globalData.userInfo.openId
      },
      success(result) {
        util.showSuccess('加载完成')
        var objectArray = result.data.data
        that.setData({
          comments: objectArray,
        })
        console.log(that.data.comments)
        that.getCommentStars()
        console.log(that.data.commentStars)
        that.setData({
          commentCount: that.data.comments.length
        })
        console.log(that.data.commentCount)
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

  deleteComment: function () {
    wx.showModal({
      title: '删除评论',
      content: '删除后评论及点赞信息将不可恢复，确认删除该条评论吗？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },

  showDish: function (e) {
    console.log(e.currentTarget.id)
    // wx.navigateTo({
    //   url: '/pages/randomDish/randomDish?isRandom=0&id=' + this.data.comments[e.currentTarget.id].dishID + '&canteen=' + this.data.comments[e.currentTarget.id].dishCanteen
    // )}
    wx.navigateTo({
      url: '/pages/randomDish/randomDish?isRandom=0&id=' + this.data.requestDishResult[e.currentTarget.id].ID + '&canteen=' + this.data.canteen
    })
  },

  requestDishList: function () {
    // util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.dishlistUrl,

      //需要在data里指定所有你需要的查询参数
      data: {
        table: that.data.canteen
      },
      success(result) {
        util.showSuccess('请求成功完成')
        // console.log('request success', result)
        var objectArray = result.data.data
        that.setData({
          requestDishResult: objectArray
        })
        that.getStars();
        console.log(that.data.requestDishResult)
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestCommentList()
    this.requestDishList()
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