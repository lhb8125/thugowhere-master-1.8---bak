let { WeToast } = require('src/wetoast.js')
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util')

App({
  WeToast,

  globalData: {
    userInfo: {},
    userDefinedInfo:{},
    logging: false,
    logged: false,
    favouredlist: []
  },

  login: function () {
    if (this.globalData.logged) return

    var that = this
    util.showBusy('正在登录')
    that.globalData.logging = true

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.globalData.userInfo = result
          that.globalData.userDefinedInfo = result.userDefinedInfo
          that.globalData.logged = true
          that.globalData.logging = false
          that.getFavouredList()
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            success(result) {
              util.showSuccess('登录成功')
              that.globalData.userInfo = result.data.data
              that.globalData.userDefinedInfo = result.data.data.userDefinedInfo
              that.globalData.logged = true
              that.globalData.logging = false
              that.getFavouredList()
            },
            fail(error) {
              util.showModel('登录失败', error)
              that.globalData.logging = false
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        that.globalData.logging = false
      }
    })
  },

  //拉取收藏菜品列表，优先从缓存中读取 by mengql
  getFavouredList: function () {
    var favouredlist = wx.getStorageSync('favouredlist')
    if (favouredlist) {
      this.globalData.favouredlist = favouredlist
    }
    else {
      //缓存中没有则进行请求
      util.showBusy('正在加载收藏...')
      var that = this
      var options = {
        url: config.service.favouredlistUrl,

        //需要在data里指定所有你需要的查询参数
        data: {
          openid: that.globalData.userInfo.openId,
        },
        success(result) {
          util.showSuccess('加载完成')
          var res = result.data.data
          that.globalData.favouredlist = res
          wx.setStorageSync('favouredlist', res)
        },
        fail(error) {
          util.showModel('加载失败，请检查网络', error);
        }
      }
      wx.request(options)
    }
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

    qcloud.setLoginUrl(config.service.loginUrl)

    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，登录 获取头像昵称
          that.login()
        }
      }
    });

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
