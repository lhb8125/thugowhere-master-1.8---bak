let { WeToast } = require('src/wetoast.js')
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util')

App({
  WeToast,

  globalData: {
    gradeList: ["大一", "大二", "大三", "大四", "硕一", "硕二", "硕三", "硕士", "博一", "博二", "博三", "博四", "博五", "博士"],
    hometownList: ["北京", "天津", "上海", "广东", "重庆",],
    majorList: ["能源与动力工程系", "机械工程系", "经济与信息管理学院", "汽车工程系", "人文学院",],
    canteenList: ["不限", "紫荆", "桃李"],
    tasteList: ["不限", "油腻", "清淡", "麻辣", "香辣",],
    cuisineList: ["不限", "川菜", "京菜", "鲁菜", "东北菜", "淮扬菜", "粤菜", "云贵风味", "西北风味",],

    someoneInfo: {
      nickname: "斌",
      name: "刘宏斌",
      studentID: "2016210481",
      grade: 6,
      hometown: 2,
      major: 1,
      hobby: "足球",
      head: '/images/head.jpg',
      phone: "18920533989",
      briefInfo: "我就是我，不一样的烟火"
    },

    userInfo: {},
    logged: false,
    favouredlist: []
  },

  login: function () {
    if (this.globalData.logged) return

    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录1成功')
          that.globalData.userInfo = result
          that.globalData.logged = true
          that.getFavouredList()
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            success(result) {
              util.showSuccess('登录2成功')
              that.globalData.userInfo = result.data.data
              that.globalData.logged = true
              that.getFavouredList()
            },
            fail(error) {
              util.showModel('请求失败', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
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
