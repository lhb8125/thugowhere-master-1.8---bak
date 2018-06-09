// pages/dishes/dishes.js
var sliderWidth = 120; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeList: ["早餐", "午餐", "晚餐"],
    floorList: ["地下", "一层", "二层", "三层", "四层"],
    sortList: ["窗口", "评价", "价格"],
    canteen: 0,
    floor: 1,
    time: 0,
    sort: 0,
    arrays: [-1, 1, 2, 3, 4],
    tabs: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    numberArray: [1, 2, 3],
    database: [],
    image_prefix: config.service.image_prefix,
    image_suffix: config.service.image_suffix,
    scoreStars: [],
    dishesCount: 4,
    star: [],
    dishDetailIndex: "0",
    inputShowed: false,
    inputVal: "",
    isShowDetail: false,
    txt: "测试",
    maxDataLength: 8,
    requestTimes: 0,
    isCompleted: 0,
    isHideLoadMore: 1,
    scrollTop: 0,
    isShowTop: 0,
    isShowFilter: 0,
    canteenList: [],
    tasteList: [],
    cuisineList: [],
    filterCanteen: 0,
    filterTaste: 0,
    filterCuisine: 0,
    sortOrder: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      canteen: options.canteen,
      canteenList: getApp().globalData.canteenList,
      tasteList: getApp().globalData.tasteList,
      cuisineList: getApp().globalData.cuisineList,
    })
    that.requestDishList();
    new app.WeToast()
  },

  requestDishList: function () {
    var that = this
    var options = {
      url: config.service.dishlistUrl,

      //需要在data里指定所有你需要的查询参数
      data: {
        table: that.data.canteen
      },
      success(result) {
        util.showSuccess('菜品成功加载')
        var objectArray = result.data.data
        that.setData({
          requestDishResult: objectArray
        })
        that.getDishes();
        that.getStars();
      },
      fail(error) {
        util.showModel('请求失败', error);
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

  getDishes: function () {
    var count = 0
    var that = this
    var database = that.data.database
    for (var i = 0; i < that.data.maxDataLength; i++) {
      if (i + that.data.requestTimes * that.data.maxDataLength < that.data.requestDishResult.length) {
        database.push(that.data.requestDishResult[i + that.data.requestTimes * that.data.maxDataLength])
      } else {
        that.setData({
          isCompleted: 1
        })
      }
    }
    // database.push(that.data.requestDishResult[that.data.requestDishResult.length-1])
    that.setData({
      database: database,
      requestTimes: that.data.requestTimes + 1
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  changeTime: function (e) {
    // var that = this;
    // wx.showActionSheet({
    //   itemList: this.data.timeList,
    //   success: function (res) {
    //     if (!res.cancel) {
    //       that.setData({
    //         time: res.tapIndex
    //       });
    //       that.getDishes();
    //     }
    //   }
    // });
    this.setData({
      time: e.detail.value
    });
  },
  changeFloor: function (e) {
    this.setData({
      floor: e.detail.value
    });
  },
  changeSort: function (e) {
    this.setData({
      sort: e.detail.value
    });
  },
  preventTouchMove: function () {

  },

  changeCanteen: function (e) {
    this.setData({
      canteen: e.detail.value
    });
  },
  changeTaste: function (e) {
    this.setData({
      taste: e.detail.value
    });
  },
  changeCuisine: function (e) {
    this.setData({
      cuisine: e.detail.value
    });
  },

  showFilter: function () {
    this.setData({
      isShowFilter: this.data.isShowFilter == 1 ? 0 : 1
    })
  },

  performFilter: function () {
    this.setData({
      isShowFilter: 0,
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
    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var options = {
      url: config.service.dishlistUrl,

      //需要在data里指定所有你需要的查询参数
      data: {
        table: that.data.canteen
      },
      success(result) {
        var objectArray = result.data.data
        that.setData({
          requestDishResult: objectArray,
          isCompleted: 0,
          requestTimes: 0,
          database: []
        })
        that.getDishes();
        that.getStars();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      fail(error) {
        util.showModel('请求失败', error);
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  lower: function () {
    var that = this
    if (that.data.isCompleted == 0) {
      wx.showToast({
        title: '数据加载中',
        icon: 'loading',
        duration: 1000,
        mask: true,
        complete: function () { that.getDishes() }
      });
    } else {
      this.wetoast.toast({
        title: '已加载全部菜品',
        duration: 1000
      })
    }
  },

  scrollToTop: function () {
    this.setData({
      scrollTop: 0,
    })
  },

  scroll: function (e) {
    if (e.detail.scrollTop > 300) {
      this.setData({
        isShowTop: 1
      })
    } else {
      this.setData({
        isShowTop: 0
      });
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showDetail: function (e) {
    this.setData({
      isShowDetail: true,
      dishDetailIndex: e.currentTarget.id
    })
  },
  cancelDetail: function () {
    this.setData({
      isShowDetail: false,
    })
  },
  showComments: function (event) {
    //根据数据库确定餐厅层数
    this.setData({
      isShowDetail: false,
    })
    wx.navigateTo({
      url: '/pages/randomDish/randomDish?isRandom=0&id=' + this.data.requestDishResult[this.data.dishDetailIndex].ID + '&canteen=' + this.data.canteen
    })
  }

})