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
    isRefuseLogin: false,
    canIUseInfo: wx.canIUse('button.open-type.getUserInfo')

  },
  showDetail: function () {
    wx.navigateTo({
      url: '/pages/about/detail/detail?studentID=' + this.data.studentID
    })
  },

  showComments: function () {
    wx.navigateTo({
      url: '/pages/comments/myComments/myComments'
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

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      this.login()
    }
  },

  login: function () {
    if (app.globalData.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录1成功')
          app.globalData.userInfo = result
          app.globalData.logged = true

          that.setData({
            "userInfo": app.globalData.userInfo,
            "isRefuseLogin": false
          });

        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            success(result) {
              util.showSuccess('登录2成功')
              app.globalData.userInfo = result.data.data
              console.log(result)
              app.globalData.logged = true

              that.setData({
                "userInfo": app.globalData.userInfo,
                "isRefuseLogin": false
              });

            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },

  onLoad: function () {

    var that = this

    if (app.globalData.logged) {
      that.setData({
        "userInfo": app.globalData.userInfo,
        "isRefuseLogin": false
      });
    }
    else {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，登录 获取头像昵称
            that.login()
          }
          else {
            that.setData({
              "isRefuseLogin": true
            });
          }
        },
        fail: function () {
          that.setData({
            "isRefuseLogin": true
          });
        }
      })
    }
  }
});