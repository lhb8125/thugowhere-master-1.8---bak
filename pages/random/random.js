Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeList: [],
    canteenList:[],
    tasteList:[],
    cuisineList:[],
    canteen:0,
    taste:0,
    cuisine:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // // console.log(options.name)
    that.setData({
      gradeList: getApp().globalData.gradeList,
      canteenList: getApp().globalData.canteenList,
      tasteList: getApp().globalData.tasteList,
      cuisineList: getApp().globalData.cuisineList,
    })
    // that.getRandomDish()
  },

  generateRandom: function () {
    wx.navigateTo({
      url: '/pages/randomDish/randomDish?isRandom=1&canteen=zijing',
    })
  },

  changeCanteen:function(e){
    this.setData({
      canteen: e.detail.value
    });
    // console.log(this.data.canteenList[this.data.canteen])
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