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
  },
  
  onLoad: function () {
    this.setData({
      userInfo: getApp().globalData.userInfo,
      gradeList: getApp().globalData.gradeList,
      hometownList: getApp().globalData.hometownList,
      majorList: getApp().globalData.majorList
    });
  }
});