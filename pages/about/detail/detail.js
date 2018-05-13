var util = require('../../../utils/util.js')
var qcloud = require('../../../vendor/wafer2-client-sdk/index')
var config = require('../../../config')
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // nickname: "斌",
    // name: "刘宏斌",
    // studentID: "2016210481",
    // grade: "硕二",
    // hobby: "足球",
    // head: '/images/head.jpg',
    // phone: "18920533989"
    userInfo: [],
    gradeList: [],
    hometownList:[],
    majorList:[],
    isChanged: 0,
    canteen:"zijing"
  },
  changeDetail: function () {
    // wx.navigateTo({
    //   url: '/pages/about/detail/changeDetail/changeDetail',
    // })
    this.setData({
      isChanged: 1
    })
  },

  changeGrade: function (e) {
    this.setData({
      'userInfo.grade': e.detail.value
    });
  },
  changeHometown: function (e) {
    this.setData({
      'userInfo.hometown': e.detail.value
    });
  },
  changeMajor: function (e) {
    this.setData({
      'userInfo.major': e.detail.value
    });
  },
  makeSure: function () {
    getApp().globalData.userInfo = this.data.userInfo;
    this.setData({
      isChanged: 0
    })
  },
  nameInput: function (e) {
    this.setData({
      'userInfo.name': e.detail.value
    })
  },
  nicknameInput: function (e) {
    this.setData({
      'userInfo.nickname': e.detail.value
    })
  },
  hobbyInput: function (e) {
    this.setData({
      'userInfo.hobby': e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      'userInfo.phone': e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: getApp().globalData.userInfo,
      gradeList: getApp().globalData.gradeList,
      hometownList: getApp().globalData.hometownList,
      majorList: getApp().globalData.majorList
    });
    console.log(this.data.userInfo)
    this.requestCommentList()
  },

  requestCommentList: function () {
    util.showBusy('正在加载评论...')
    var that = this
    var options = {
      url: config.service.commentlistUrl,
      //需要在data里指定所有你需要的查询参数
      data: {
        canteen: that.data.canteen,
        
        dishID:2,
        studentID:2016010000
      },
      success(result) {
        util.showSuccess('加载完成')
        var objectArray = result.data.data
        that.setData({
          comments: objectArray
        })
        console.log(objectArray)
        console.log(that.data.userInfo.openId)
        // that.getCommentStars()
        // console.log(that.data.commentStars)
      },
      fail(error) {
        util.showModel('加载失败，请检查网络', error);
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: getApp().globalData.userInfo,
      gradeList: getApp().globalData.gradeList
    });
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