// pages/comments/writeComment/writeComment.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // score:[0,0,0,0,0],
    wordCount: 0,
    star: [0, 0, 0, 0, 0],
    starRank: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindTextAreaBlur: function (e) {
    this.setData({
      wordCount: this.data.wordCount + 1
    })
    console.log(this.data.wordCount)
  },

  getScore: function (e) {
    var score
    if (this.data.star[e.currentTarget.id] == 0) {
      score = parseInt(e.currentTarget.id) + 0.5
    } else if (this.data.star[e.currentTarget.id] == 1) {
      score = parseInt(e.currentTarget.id) + 1.0
    } else if (this.data.star[e.currentTarget.id] == 2) {
      score = parseInt(e.currentTarget.id) 
    }
    // this.setData({
    //   starRank: score
    // })
    this.getStars(score)
  },

  getStars: function (score) {
    var that = this;
    if (score >= 4.8) {
      that.setData({
        star: [2, 2, 2, 2, 2]
      })
    } else if (score >= 4.3 && score < 4.8) {
      that.setData({
        star: [2, 2, 2, 2, 1]
      })
    } else if (score >= 3.8 && score < 4.3) {
      that.setData({
        star: [2, 2, 2, 2, 0]
      })
    } else if (score >= 3.3 && score < 3.8) {
      that.setData({
        star: [2, 2, 2, 1, 0]
      })
    } else if (score >= 2.8 && score < 3.3) {
      that.setData({
        star: [2, 2, 2, 0, 0]
      })
    } else if (score >= 2.3 && score < 2.8) {
      that.setData({
        star: [2, 2, 1, 0, 0]
      })
    } else if (score >= 1.8 && score < 2.3) {
      that.setData({
        star: [2, 2, 0, 0, 0]
      })
    } else if (score >= 1.3 && score < 1.8) {
      that.setData({
        star: [2, 1, 0, 0, 0]
      })
    } else if (score >= 0.8 && score < 1.3) {
      that.setData({
        star: [2, 0, 0, 0, 0]
      })
    } else if (score >= 0.3 && score < 0.8) {
      that.setData({
        star: [1, 0, 0, 0, 0]
      })
    } else if (score < 0.3) {
      that.setData({
        star: [0, 0, 0, 0, 0]
      })
    }
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