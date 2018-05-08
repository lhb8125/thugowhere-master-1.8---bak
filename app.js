let { WeToast } = require('src/wetoast.js')

App({
  WeToast,

  globalData:{
    gradeList: ["大一", "大二", "大三", "大四", "硕一", "硕二", "硕三", "硕士", "博一", "博二", "博三", "博四", "博五", "博士"],
    hometownList: ["北京", "天津", "上海", "广东", "重庆",],
    majorList: ["能源与动力工程系", "机械工程系", "经济与信息管理学院", "汽车工程系", "人文学院",],
    canteenList: ["不限", "紫荆", "桃李"],
    tasteList: ["不限", "油腻", "清淡", "麻辣", "香辣",],
    cuisineList: ["不限","川菜", "京菜", "鲁菜", "东北菜", "淮扬菜", "粤菜", "云贵风味", "西北风味",],
    userInfo:{
      nickname: "斌",
      name: "刘宏斌",
      studentID: "2016210481",
      grade: 6,
      hometown:2,
      major: 1,
      hobby: "足球",
      head: '/images/head.jpg',
      phone: "18920533989",
      briefInfo: "我就是我，不一样的烟火"
    }
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
