// var base64 = require("/images/head.jpg");

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    userInfo: [],
    userDefinedInfo: {
      slogan: '我就是我，不一样的烟火'
    },
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

  showDishes: function () {
    wx.navigateTo({
      url: '/pages/dishes/myDishes/myDishes'
    })
  },

  showFollower: function () {
    wx.navigateTo({
      url: '/pages/about/myFriends/myFriends'
    })
  },

  showFollowing: function () {
    wx.navigateTo({
      url: '/pages/about/myFriends/myFriends'
    })
  },

  showSetting: function () {
    wx.navigateTo({
      url: '/pages/about/setting/setting'
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
          util.showSuccess('登录成功')
          app.globalData.userInfo = result
          app.globalData.userDefinedInfo = result.userDefinedInfo
          app.globalData.logged = true

          that.setData({
            "userInfo": app.globalData.userInfo,
            "userDefinedInfo": app.globalData.userDefinedInfo,
            "isRefuseLogin": false
          });
          app.getFavouredList()

        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            success(result) {
              util.showSuccess('登录成功')
              app.globalData.userInfo = result.data.data
              app.globalData.userDefinedInfo = result.data.data.userDefinedInfo
              app.globalData.logged = true

              that.setData({
                "userInfo": app.globalData.userInfo,
                "userDefinedInfo": app.globalData.userDefinedInfo,
                "isRefuseLogin": false
              });
              app.getFavouredList()
            },

            fail(error) {
              util.showModel('登录失败', error)
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

    var that = this

    if (app.globalData.logging) {
      var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve()
        }, 2000)
      })

      promise.then(function () {
        that.setData({
          "userInfo": app.globalData.userInfo,
          "userDefinedInfo": app.globalData.userDefinedInfo,
          "isRefuseLogin": false
        });
      })
    }

    else if (app.globalData.logged) {
      that.setData({
        "userInfo": app.globalData.userInfo,
        "userDefinedInfo": app.globalData.userDefinedInfo,
        "isRefuseLogin": false
      });
    }
    else {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，登录 获取头像昵称 获取个人收藏
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