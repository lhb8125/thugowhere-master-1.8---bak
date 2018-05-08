// pages/comments/comments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: '/images/youtiao.jpg',
    id: "youtiao",
    name: "油条",
    score: 4.5,
    comments: {
      studentID: ["2016210222", "2016310333", "2016010000"],
      studentNickname: ["张三", "李四", "wangwu",],
      studentHead: ["/images/head/zhangsan.jpg", "/images/head/lisi.jpg", "/images/head/wangwu.jpg",],
      studentGrade: [4,8,1,],
      commentDate: ["2017-1-12", "2018-4-21", "2018-2-12"],
      commentFavour: [12,23,34],
      studentScore: [[2, 2, 2, 2, 0], [2, 2, 2, 2, 2], [2, 2, 2, 1, 0]],
      studentComment: ["油条的叫法各地不一，东北和华北很多地区称油条为“馃子”；安徽一些地区称“油果子”；广州及周边地区称油炸鬼；潮汕地区等地称油炸果；浙江地区有天罗筋的称法（天罗即丝瓜，老丝瓜干燥后剥去壳会留下丝瓜筋，其形状与油条极像，遂称油条为天罗筋）。", "好吃，很脆！","还可以吧。。" ],
      isUserFavoured: [false, false, false],
    },
    gradeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(options.name)
    that.setData({
      name: options.name,
      gradeList: getApp().globalData.gradeList
    })
    
    //初始化楼层数组以供显示
    // for (var i = 0; i < options.floor; i++) {
    //   var item = 'tabs[' + i + ']'    //这里使array的下标可以动态改变
    //   that.setData({
    //     [item]: i + 1    //注意：这里item必须要加[]，至于为什么我也不明白
    //   })
    // }
  },

  changeFavoured:function(e){
    console.log(e.currentTarget.id)
    var isUserFavoured = 'comments.isUserFavoured[' + e.currentTarget.id + ']'
    this.setData({
      [isUserFavoured]: !this.data.comments.isUserFavoured[e.currentTarget.id],
    })
  },

  typeComment:function(){
    wx.navigateTo({
      url: '/pages/comments/writeComment/writeComment',
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