// pages/about/detail/changeDetail/changeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    gradeList: []
    // gradeList: ["大一", "大二", "大三", "大四", "硕一", "硕二", "硕三", "硕士", "博一", "博二", "博三", "博四", "博五", "博士"],
    // nickname: "斌",
    // name: "刘宏斌",
    // studentID: "2016210481",
    // grade: 6,
    // hobby: "足球",
    // head: '/images/head.jpg',
    // phone: "18920533989"
  },

  bindPickerChange: function (e) {
    this.setData({
      'userInfo.grade': e.detail.value
    });
  },
  makeSure: function(){
    getApp().globalData.userInfo = this.data.userInfo;
    wx.navigateBack({
      delta: 1
    })
  },
  nameInput: function(e){
    this.setData({
      'userInfo.name': e.detail.value
    })
  },
  hobbyInput: function (e) {
    this.setData({
      'userInfo.hobby': e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      'userInfo.phone': e.detail.value
    })
  },
  vcodeInput: function (e) {
    // this.setData({
    //   'userInfo.name': e.detail.value
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: getApp().globalData.userInfo,
      gradeList: getApp().globalData.gradeList
    });
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