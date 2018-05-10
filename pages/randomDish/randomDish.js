var util = require('../../utils/util.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoreStars: [],
    randomDish: {},
    randomIndex: 0,
    comments: {
      studentID: ["2016210222", "2016310333", "2016010000"],
      studentNickname: ["张三", "李四", "wangwu",],
      studentHead: ["/images/head/zhangsan.jpg", "/images/head/lisi.jpg", "/images/head/wangwu.jpg",],
      studentGrade: [4, 8, 1,],
      commentDate: ["2017-1-12", "2018-4-21", "2018-2-12"],
      commentFavour: [12, 23, 34],
      studentScore: [[2, 2, 2, 2, 0], [2, 2, 2, 2, 2], [2, 2, 2, 1, 0]],
      studentComment: ["油条的叫法各地不一，东北和华北很多地区称油条为“馃子”；安徽一些地区称“油果子”；广州及周边地区称油炸鬼；潮汕地区等地称油炸果；浙江地区有天罗筋的称法（天罗即丝瓜，老丝瓜干燥后剥去壳会留下丝瓜筋，其形状与油条极像，遂称油条为天罗筋）。", "好吃，很脆！", "还可以吧。。"],
      isUserFavoured: [false, false, false],
    },
    gradeList: [],
    isRandom:1,
    dishID: 0,
    canteen: "zijing",
    windowHeight:0,
    loadmore:0,
    refresh:0,
    btnHeight:0,
    image_prefix: "https://tsingwind.top/weapp_img",
    image_suffix: "/1.jpg",
    isCompleted:1,
  },

  //请求评论信息 by mengql

  requestCommentList: function () {
    util.showBusy('正在加载评论...')
    var that = this
    var options = {
      url: config.service.commentlistUrl,

      //需要在data里指定所有你需要的查询参数
      data: {
        canteen: that.data.canteen,
        dishID: that.data.dishID
      },
      success(result) {
        util.showSuccess('加载完成')
        var objectArray = result.data.data
        that.setData({
          comments: objectArray
        })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    new app.WeToast()
    console.log(that.data.isRandom)
    that.setData({
      // name: options.name,
      gradeList: getApp().globalData.gradeList,
      isRandom: options.isRandom,
      dishID: options.isRandom == 1 ? Math.round(Math.random() * 10)+1 : options.id,
      canteen: options.canteen
    })
    // that.getRandomDish()
    that.requestDishList()
    console.log(that.data.dishID)
    console.log(that.data.canteen)
    // that.getStars()
    that.requestCommentList()
    if (that.data.isRandom == 1) {
      that.setData({
        btnHeight: 80
      })
    }
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        // console.log('height=' + res.windowHeight);
        // console.log('width=' + res.windowWidth);
        that.setData({
          windowHeight: res.windowHeight - res.windowWidth / 750 * that.data.btnHeight
        })
      }
    })
  },

  requestDishList: function () {
    util.showBusy('请求中...')
    console.log(this.data.dishID)
    var that = this
    var options = {
      url: config.service.dishlistUrl,

      //需要在data里指定所有你需要的查询参数
      data: {
        table: that.data.canteen,
        ID: that.data.dishID
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
    if (that.data.requestDishResult[0].starRank >= 4.8) {
      that.setData({
        scoreStars: [2, 2, 2, 2, 2]
      })
    } else if (that.data.requestDishResult[0].starRank >= 4.3 && that.data.requestDishResult[0].starRank < 4.8) {
      that.setData({
        scoreStars: [2, 2, 2, 2, 1]
      })
    } else if (that.data.requestDishResult[0].starRank >= 3.8 && that.data.requestDishResult[0].starRank < 4.3) {
      that.setData({
        scoreStars: [2, 2, 2, 2, 0]
      })
    } else if (that.data.requestDishResult[0].starRank >= 3.3 && that.data.requestDishResult[0].starRank < 3.8) {
      that.setData({
        scoreStars: [2, 2, 2, 1, 0]
      })
    } else if (that.data.requestDishResult[0].starRank >= 2.8 && that.data.requestDishResult[0].starRank < 3.3) {
      that.setData({
        scoreStars: [2, 2, 2, 0, 0]
      })
    } else if (that.data.requestDishResult[0].starRank >= 2.3 && that.data.requestDishResult[0].starRank < 2.8) {
      that.setData({
        scoreStars: [2, 2, 1, 0, 0]
      })
    } else if (that.data.requestDishResult[0].starRank >= 1.8 && that.data.requestDishResult[0].starRank < 2.3) {
      that.setData({
        scoreStars: [2, 2, 0, 0, 0]
      })
    } else if (that.data.requestDishResult[0].starRank >= 1.3 && that.data.requestDishResult[0].starRank < 1.8) {
      that.setData({
        scoreStars: [2, 1, 0, 0, 0]
      })
    } else if (that.data.requestDishResult[0].starRank >= 0.8 && that.data.requestDishResult[0].starRank < 1.3) {
      that.setData({
        scoreStars: [2, 0, 0, 0, 0]
      })
    } else if (that.data.requestDishResult[0].starRank >= 0.3 && that.data.requestDishResult[0].starRank < 0.8) {
      that.setData({
        scoreStars: [1, 0, 0, 0, 0]
      })
    } else if (that.data.requestDishResult[0].starRank < 0.3) {
      that.setData({
        scoreStars: [0, 0, 0, 0, 0]
      })
    }
  },

  getRandomDish: function () {
    var that = this;
    // wx.showToast({
    //   title: '数据加载中',
    //   icon: 'loading',
    //   duration: 500
    // });
    // that.data.randomIndex = Math.round(Math.random() * (that.data.database.length - 1));
    that.setData({
      dishID: Math.round(Math.random() * 10) + 1
    })
    that.requestDishList()
    that.requestCommentList()
  },

  writeComment: function () {
    wx.navigateTo({
      url: '/pages/comments/writeComment/writeComment',
    })
  },

  changeFavoured: function (e) {
    console.log(e.currentTarget.id)
    var isUserFavoured = 'comments.isUserFavoured[' + e.currentTarget.id + ']'
    this.setData({
      [isUserFavoured]: !this.data.comments.isUserFavoured[e.currentTarget.id],
    })
  },

  lower: function (e) {
    var that = this
    if (that.data.isCompleted == 0) {
      that.setData({
        loadmore: 1
      })
      setTimeout(function () {
        that.setData({
          loadmore: 0
        })
      }, 1000)
    } else {
      this.wetoast.toast({
        title: '已加载全部评论',
        duration: 1000
      })
    }
  },

  showUserDetail(){
    console.log("showUserDetail")
    wx.navigateTo({
      url: '/pages/about/showDetail/showDetail',
    })
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