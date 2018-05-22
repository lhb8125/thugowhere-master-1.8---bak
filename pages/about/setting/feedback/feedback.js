// pages/about/setting/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemList: ["闪退", "卡顿", "黑屏", "界面错位", "界面设计", "搜索和筛选", "好友和粉丝", "评论", "其他"],
    problem: 0,
    wordCount: 0,
    pic: [],
    picList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindTextAreaBlur: function (e) {
    this.setData({
      wordCount: e.detail.value.length
    })
    console.log(this.data.value)
  },

  changeProblem: function (e) {
    this.setData({
      problem: e.detail.value
    })
  },

  listenerButtonChooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      //original原图，compressed压缩图
      sizeType: ['original'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function (res) {
        //重绘视图
        // picture.push(res.tempFilePaths)
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          that.data.picList.push(res.tempFilePaths[i])
        }
        that.setData({
          pic: that.data.picList
        })
        console.log(that.data.pic)
      }
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