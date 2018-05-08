// dishes/dishes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    return{
      title: '清华去哪吃',
      path: 'path/user?id=123'
    }
  },
  changePage: function(event){
    //根据数据库确定餐厅层数
    if(event.currentTarget.id=="zijing"){
      var floor = 4
    } else if (event.currentTarget.id == "taoli"){
      var floor = 3
    }
    wx.navigateTo({
      url: '/pages/dishes/dishes?canteen=' + event.currentTarget.id,
    })
    //确定用户吃哪顿饭
    // wx.showActionSheet({
    //   itemList: ['早餐', '午餐', '晚餐'],
    //   success: function (res) {
    //     if (!res.cancel) {
    //       wx.navigateTo({
    //         url: '/pages/dishes/dishes?canteen=1&floor='+floor+'&'+'times='+res.tapIndex,
    //       })
    //     }
    //   }
    // });
  }
})