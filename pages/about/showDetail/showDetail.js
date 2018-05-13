// var base64 = require("/images/head.jpg");
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
    gradeList: [],
    hometownList: [],
    majorList: [],
    isFollowed: 0,
    animationData: {},
    isPlus:0,
  },

  changeFollowed: function () {
    this.setData({
      isFollowed: this.data.isFollowed == 1 ? 0 : 1,
      isPlus: this.data.isFollowed == 1 ? -1 : 1
    })
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.opacity(0).translate(0, -5).step()
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.opacity(1).translate(0, 5).step()
      this.setData({
        animationData: animation.export(),
        isPlus: 0
      })
    }.bind(this), 1000)
  },

  onLoad: function () {
    this.setData({
      userInfo: getApp().globalData.userInfo,
      gradeList: getApp().globalData.gradeList,
      hometownList: getApp().globalData.hometownList,
      majorList: getApp().globalData.majorList
    });

    // var animation = wx.createAnimation({
    //   duration: 2000,
    //   timingFunction: 'ease',
    // })
    // this.animation = animation
    // animation.translate(0,-10).step()
    // this.setData({
    //   animationData: animation.export()
    // })
    // setTimeout(function () {
    //   animation.translate(0,5).step()
    //   this.setData({
    //     animationData: animation.export()
    //   })
    // }.bind(this), 1000)
  }
});