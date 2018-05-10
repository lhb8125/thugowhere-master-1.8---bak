// var base64 = require("/images/head.jpg");

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    // icon: '/images/head.jpg',
    // head: '/images/head.jpg',
    // // name: "斌",
    // // studentID: "2016210481",
    // gradeList: ["大一", "大二", "大三", "大四", "硕一", "硕二", "硕三", "硕士", "博一", "博二", "博三", "博四", "博五", "博士"],
    // nickname: "斌",
    // name: "刘宏斌",
    // studentID: "2016210481",
    // grade: "硕二",
    // hobby: "足球",
    // head: '/images/head.jpg',
    // phone: "18920533989",
    userInfo: [],
    isRefuseLogin:false
  },
  showDetail: function () {
    wx.navigateTo({
      url: '/pages/about/detail/detail?studentID=' + this.data.studentID
    })
  },

  listenerButtonChooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function (res) {
        //重绘视图
        that.setData({
          'userInfo.head': res.tempFilePaths
        })
      }
    })
  },

  reSetting: function(){
    var that=this
    wx.openSetting({
      success:(res)=>{
        if(res.authSetting["scope.userInfo"]){
          app.globalData.isRefuseLogin = false
          that.setData({"isRefuseLogin":false})
          qcloud.setLoginUrl(config.service.loginUrl)
          that.login()
        }
      }
    })
  },

  login: function () {
    if (app.globalData.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          app.globalData.userInfo = result
          app.globalData.logged = true
          that.setData({
            "userInfo": app.globalData.userInfo
          });
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              app.globalData.userInfo = result
              app.globalData.logged = true
              that.setData({
                "userInfo": app.globalData.userInfo
              });
            },

            fail(error) {
              //util.showModel('用户拒绝登录,返回首页', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
      }
    })
  },

  onLoad: function () {

    this.setData({ 'isRefuseLogin': app.globalData.isRefuseLogin}) 
    if (app.globalData.logged) {
      console.log(app.globalData.userInfo)
      this.setData({
        "userInfo": app.globalData.userInfo
      });
    }
    else {
      if(!this.data.isRefuseLogin)
      {
        qcloud.setLoginUrl(config.service.loginUrl)
        this.login()
      }
    }
  }
});