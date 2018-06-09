// pages/comments/writeComment/writeComment.js

var util = require("../../../utils/util")
var config = require("../../../config")
var qcloud = require('../../../vendor/wafer2-client-sdk/index')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // score:[0,0,0,0,0],
    wordCount: 0,
    commentBody: '',
    star: [0, 0, 0, 0, 0],
    starRank: 0,
    dishID: {},
    canteen: '',
    takeSession: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      canteen: options.canteen,
      dishID: options.dishID
    })
  },

  //修复了删除文字字数不变化的bug by mengql 
  bindTextAreaBlur: function (e) {
    this.setData({
      wordCount: e.detail.value.length
    })
  },

  getScore: function (e) {
    var score
    if (this.data.star[e.currentTarget.id] == 0) {
      score = parseInt(e.currentTarget.id) + 0.5
    } else if (this.data.star[e.currentTarget.id] == 1) {
      score = parseInt(e.currentTarget.id) + 1.0
    } else if (this.data.star[e.currentTarget.id] == 2) {
      score = parseInt(e.currentTarget.id)
    }
    this.setData({
      starRank: score
    })
    this.getStars(score)
  },

  getStars: function (score) {
    var that = this;
    if (score >= 4.8) {
      that.setData({
        star: [2, 2, 2, 2, 2]
      })
    } else if (score >= 4.3 && score < 4.8) {
      that.setData({
        star: [2, 2, 2, 2, 1]
      })
    } else if (score >= 3.8 && score < 4.3) {
      that.setData({
        star: [2, 2, 2, 2, 0]
      })
    } else if (score >= 3.3 && score < 3.8) {
      that.setData({
        star: [2, 2, 2, 1, 0]
      })
    } else if (score >= 2.8 && score < 3.3) {
      that.setData({
        star: [2, 2, 2, 0, 0]
      })
    } else if (score >= 2.3 && score < 2.8) {
      that.setData({
        star: [2, 2, 1, 0, 0]
      })
    } else if (score >= 1.8 && score < 2.3) {
      that.setData({
        star: [2, 2, 0, 0, 0]
      })
    } else if (score >= 1.3 && score < 1.8) {
      that.setData({
        star: [2, 1, 0, 0, 0]
      })
    } else if (score >= 0.8 && score < 1.3) {
      that.setData({
        star: [2, 0, 0, 0, 0]
      })
    } else if (score >= 0.3 && score < 0.8) {
      that.setData({
        star: [1, 0, 0, 0, 0]
      })
    } else if (score < 0.3) {
      that.setData({
        star: [0, 0, 0, 0, 0]
      })
    }
  },

  //提交评论 by mengql

  bindFormSubmit: function (e) {
    util.showBusy('正在提交...')
    var that = this
    var app = getApp()
    var options = {
      url: config.service.commentSubmitUrl,
      login: true,
      method: 'POST',
      //需要在data里指定所有你需要的查询参数
      data: {
        canteen: that.data.canteen,
        ID: that.data.dishID,
        openid: app.globalData.userInfo.openId,
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        commentBody: e.detail.value.textarea,
        commentStar: that.data.starRank
      },
      success(result) {
        wx.hideToast()
        if (result.data.data.returnCode == 0) {
          util.showSuccess('评论提交成功')
          wx.navigateBack({
            delta: 1
          })
        }
        else if (result.data.data.returnCode == 1) {
          wx.showModal({
            title: '用户信息错误',
            content: '您的登录状态有问题，建议尝试退出重新登录',
          })
        }
        else if (result.data.data.returnCode == 2) {
          wx.showModal({
            title: '不能重复评论',
            content: '您已经评论过这道菜了，去别的菜看一看吧~',
          })
        }
      },
      fail(error) {
        util.showModel('提交失败', error);
      }
    }
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
    }
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