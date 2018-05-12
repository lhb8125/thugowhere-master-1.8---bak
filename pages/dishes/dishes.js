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
    sortList: ["按窗口排序", "按评价排序", "按价格排序"],
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
    image_prefix: "https://tsingwind.top/weapp_img",
    image_suffix: "/1.jpg",
    scoreStars: [],
    dishesCount: 4,
    dishes: {
      id: ["kaoyu", "xianguo", "youtiao", "egg"],
      name: ["烤鱼", "麻辣香锅", "油条", "鸡蛋"],
      time: [1, 2, 0, 0],
      floor: [2, 1, 1, 1],
      path: ['/images/kaoyu.jpg', '/images/xiangguo.jpg', '/images/youtiao.jpg', '/images/egg.jpg'],
      price: [18, 8, 1, 0.5],
      scoreStars: [[2, 2, 2, 2, 0], [2, 2, 2, 2, 2], [2, 2, 2, 1, 0], [2, 2, 2, 2, 0]],
      score: [4.0, 5.0, 4.2, 4.5, 3.7],
      description: ["一种发源于重庆巫溪县，而发扬于万州的特色美食，在流传过程中，融合腌、烤、炖三种烹饪工艺技术，充分借鉴传统渝菜及重庆火锅用料特点，是口味奇绝、营养丰富的风味小吃。", "清芬的香锅最好吃", "一种古老的中式面食，长条形中空的油炸食品，口感松脆有韧劲。", "健康，含有丰富的蛋白质"],
      cuisine: ["川菜", "川菜", "不限", "不限"],
      taste: ["香辣", "麻辣", "油腻", "清淡"],
      calory: [200, 250, 180, 30]
    },
    selectedDishesCount: 0,
    selectedDishes: {
      id: [],
      name: [],
      time: [],
      floor: [],
      path: [],
      price: [],
      scoreStars: [],
      score: [],
      description: [],
      cuisine: [],
      taste: [],
      calory: []
    },
    star: [],
    dishDetailIndex: "0",
    inputShowed: false,
    inputVal: "",
    isShowDetail: false,
    txt: "测试",
    maxDataLength: 8,
    requestTimes: 0,
    // isbottom: 0,
    // isTop: 0,
    isCompleted: 0,
    isHideLoadMore:1,
    // toView:0,
    scrollTop:0,
    isShowTop:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // canteen = options.canteen;
    // floor = options.floor;
    this.setData({
      canteen: options.canteen,
    })
    that.requestDishList();
    new app.WeToast()
    // that.getDishes();
    // that.getStars();
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
        that.getDishes();
        that.getStars();
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

  getDishes: function () {
    var count = 0
    var that = this
    var database = that.data.database
    for (var i = 0; i < that.data.maxDataLength; i++) {
      if (i + that.data.requestTimes * that.data.maxDataLength <= that.data.requestDishResult.length) {
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
    console.log(that.data.requestDishResult)
    console.log(that.data.database)
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
    var that = this;
    wx.showActionSheet({
      itemList: this.data.timeList,
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            time: res.tapIndex
          });
          that.getDishes();
        }
      }
    });
  },
  changeFloor: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: this.data.floorList,
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            floor: res.tapIndex
          });
          that.getDishes();
        }
      }
    });
  },
  changeSort: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: this.data.sortList,
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            sort: res.tapIndex
          });
          that.getDishes();
        }
      }
    });
  },
  preventTouchMove: function () {

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
        console.log('request fail', error);
      }
    }
    this.data.takeSession = false;
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
    }
    //模拟加载
    // setTimeout(function () {
    //   // complete
    //   wx.hideNavigationBarLoading() //完成停止加载
    //   wx.stopPullDownRefresh() //停止下拉刷新
    // }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // var that = this
    // if (that.data.isCompleted == 0) {
    //   that.setData({
    //     isHideLoadMore:0
    //   })
    //   setTimeout(() => {
    //   var options = {
    //     url: config.service.dishlistUrl,

    //     //需要在data里指定所有你需要的查询参数
    //     data: {
    //       table: that.data.canteen
    //     },
    //     success(result) {
    //       var objectArray = result.data.data
    //       that.setData({
    //         requestDishResult: objectArray,
    //         isHideLoadMore: 1
    //       })
    //       that.getDishes();
    //       that.getStars();
    //     },
    //     fail(error) {
    //       util.showModel('请求失败', error);
    //       console.log('request fail', error);
    //     }
    //   }
    //   this.data.takeSession = false;
    //   if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
    //     qcloud.request(options)
    //   } else {    // 使用 wx.request 则不带登录态
    //     wx.request(options)
    //   }
    //   }, 1000)
    // } else {
    //   this.wetoast.toast({
    //     title: '已加载全部菜品',
    //     duration: 1000
    //   })
    // }
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
    // var that = this
    // if (that.data.isCompleted == 0) {
    //   that.setData({
    //     isHideLoadMore: 0
    //   })
    //   setTimeout(() => {
    //     var options = {
    //       url: config.service.dishlistUrl,

    //       //需要在data里指定所有你需要的查询参数
    //       data: {
    //         table: that.data.canteen
    //       },
    //       success(result) {
    //         var objectArray = result.data.data
    //         that.setData({
    //           requestDishResult: objectArray,
    //           isHideLoadMore: 1
    //         })
    //         that.getDishes();
    //         that.getStars();
    //       },
    //       fail(error) {
    //         util.showModel('请求失败', error);
    //         console.log('request fail', error);
    //       }
    //     }
    //     this.data.takeSession = false;
    //     if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
    //       qcloud.request(options)
    //     } else {    // 使用 wx.request 则不带登录态
    //       wx.request(options)
    //     }
    //   }, 1000)
    // } else {
    //   this.wetoast.toast({
    //     title: '已加载全部菜品',
    //     duration: 1000
    //   })
    // }
  },

  scrollToTop:function(){
    console.log("scrollToTop")
    this.setData({
      scrollTop:0,
    })
  },

  scroll:function(e){
    console.log(e.detail)
    if(e.detail.scrollTop>300){
      this.setData({
        isShowTop:1
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
    // var isUserFavoured = 'comments.isUserFavoured[' + e.currentTarget.id + ']'
    // this.setData({
    //   [isUserFavoured]: !this.data.comments.isUserFavoured[e.currentTarget.id],
    // })
    // var id = 'selectedDishes.id[' + count + ']'
    // var name = 'selectedDishes.name[' + count + ']'
    // var time = 'selectedDishes.time[' + count + ']'
    // var floor = 'selectedDishes.floor[' + count + ']'
    // var path = 'selectedDishes.path[' + count + ']'
    // var price = 'selectedDishes.price[' + count + ']'
    // var scoreStars = 'selectedDishes.scoreStars[' + count + ']'
    // that.setData({
    //   [dishDetail.name]: that.data.selectedDishes.id[e.currentTarget.id],
    //   [dishDetail.score]: that.data.selectedDishes.id[e.currentTarget.id],
    //   [dishDetail.scoreStars]: that.data.selectedDishes.id[e.currentTarget.id],
    //   [dishDetail.taste]: that.data.selectedDishes.id[e.currentTarget.id],
    //   [dishDetail.cuisine]: that.data.selectedDishes.id[e.currentTarget.id],
    //   [dishDetail.calory]: that.data.selectedDishes.id[e.currentTarget.id],
    // })
  },
  cancelDetail: function () {
    this.setData({
      isShowDetail: false,
    })
  },
  showComments: function (event) {
    //根据数据库确定餐厅层数
    // console.log("youtiao")
    if (event.currentTarget.id == "youtiao") {
    } else if (event.currentTarget.id == "kaoyu") {
    } else if (event.currentTarget.id == "xiangguo") {
    }
    this.setData({
      isShowDetail: false,
    })
    wx.navigateTo({
      url: '/pages/randomDish/randomDish?isRandom=0&id=' + this.data.requestDishResult[this.data.dishDetailIndex].ID + '&canteen=' + this.data.canteen
    })
    //确定用户吃哪顿饭
    // wx.showActionSheet({
    //   itemList: ['早餐', '午餐', '晚餐'],
    //   success: function (res) {
    //     if (!res.cancel) {
    //       wx.navigateTo({
    //         url: '/pages/dishes/dishes?canteen=1&floor=' + floor + '&' + 'times=' + res.tapIndex,
    //       })
    //     }
    //   }
    // });
  }

})