var util = require('../../utils/util.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoreStars: [],
    randomDish: {},
    randomIndex: 0,
    commentStars: [],
    comments: {
      /*
      studentID: ["2016210222", "2016310333", "2016010000"],
      studentNickname: ["张三", "李四", "wangwu",],
      studentHead: ["/images/head/zhangsan.jpg", "/images/head/lisi.jpg", "/images/head/wangwu.jpg",],
      studentGrade: [4, 8, 1,],
      commentDate: ["2017-1-12", "2018-4-21", "2018-2-12"],
      commentFavour: [12, 23, 34],
      studentScore: [[2, 2, 2, 2, 0], [2, 2, 2, 2, 2], [2, 2, 2, 1, 0]],
      studentComment: ["油条的叫法各地不一，东北和华北很多地区称油条为“馃子”；安徽一些地区称“油果子”；广州及周边地区称油炸鬼；潮汕地区等地称油炸果；浙江地区有天罗筋的称法（天罗即丝瓜，老丝瓜干燥后剥去壳会留下丝瓜筋，其形状与油条极像，遂称油条为天罗筋）。", "好吃，很脆！", "还可以吧。。"],
      isUserFavoured: [false, false, false],
      */
    },
    gradeList: [],
    isRandom: 1,
    dishID: 0,
    canteen: "",
    canteen_zh: "",
    windowHeight: 0,
    loadmore: 0,
    refresh: 0,
    btnHeight: 80,
    image_prefix: "https://tsingwind.top/weapp_img",
    image_suffix: "/1.jpg",
    isCompleted: 1,
    isFavoured: 0,
    favourWidth: "100%",
    isVoteListNeeded: false,
    voteList: []
  },

  //请求评论信息 by mengql

  requestCommentList: function () {
    util.showBusy('正在加载评论...')
    var that = this
    var options = {
      url: config.service.commentlistUrl,

      //需要在data里指定所有你需要的查询参数
      data: {
        canteen: that.data.canteen,
        dishID: that.data.dishID,
        openid: getApp().globalData.userInfo.openId,
        isVoteListNeeded: that.data.isVoteListNeeded
      },
      success(result) {
        util.showSuccess('加载完成')
        var resBundle = result.data.data
        console.log(resBundle)
        if (that.data.isVoteListNeeded) {
          that.setData({
            comments: resBundle.res,
            voteList: resBundle.votedlist
          })
          wx.setStorageSync('votelist', resBundle.votedlist)
        }
        else {
          that.setData({
            comments: resBundle.res
          })
        }
        that.getUpvoted()
        that.getCommentStars()
      },
      fail(error) {
        util.showModel('加载失败，请检查网络', error);
        console.log('request fail', error);
      }
    }
    wx.request(options)
  },


  //消除时区转换带来的日期错误（不是最好的解决方案) by mengql
  getRightDate: function () {

  },


  getUpvoted: function () {
    var length = this.data.comments.length
    for (let i = 0; i < length; i++) {
      this.setData({
        ['comments[' + i + '].isUpvoted']: false
      })
    }
    if (JSON.stringify(this.data.voteList) != '[]') {
      let voteList = this.data.voteList
      for (let i = 0; i < length; i++) {
        if (voteList.includes(this.data.comments[i].COMMENT_ID)) {
          this.setData({
            ['comments[' + i + '].isUpvoted']: true
          })
        }
      }
    }
  },

  getCommentStars: function () {
    var that = this;
    var starRank;
    for (var i = 0; i < that.data.comments.length; i++) {
      starRank = that.data.comments[i].commentStar;
      var scoreStars = 'commentStars[' + i + ']'
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    new app.WeToast()
    console.log(that.data.isRandom)
    that.setData({
      // name: options.name,
      gradeList: getApp().globalData.gradeList,
      isRandom: options.isRandom,
      dishID: options.isRandom == 1 ? Math.round(Math.random() * 10) + 1 : options.id,
      canteen: options.canteen,
      canteen_zh: util.canteenTable[options.canteen]
    })

    // 获取用户的点赞列表，优先从缓存中读取 by mengql
    var votelist = wx.getStorageSync('votelist')
    if (votelist) {
      this.setData({
        voteList: votelist,
        isVoteListNeeded: false
      })
      this.getUpvoted()
    }
    else {
      if (getApp().globalData.logged) {
        this.setData({
          isVoteListNeeded: true
        })
      }
      else {
        this.setData({
          isVoteListNeeded: false
        })
      }
    }

    that.requestDishList()
    that.requestCommentList()
    that.setIsFavoured()
    if (that.data.isRandom == 1) {
      that.setData({
        // btnHeight: 80,
        favourWidth: "50%",
      })
    }

    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight - res.windowWidth / 750 * that.data.btnHeight
        })
      }
    })
  },

  requestDishList: function () {
    util.showBusy('请求中...')
    console.log(this.data.dishID)
    var that = this
    var options = {
      url: config.service.dishlistUrl,

      //需要在data里指定所有你需要的查询参数
      data: {
        table: that.data.canteen,
        ID: that.data.dishID
      },
      success(result) {
        util.showSuccess('请求成功完成')
        // console.log('request success', result)
        var objectArray = result.data.data
        that.setData({
          requestDishResult: objectArray
        })
        that.getStars(that.data.requestDishResult[0].starRank);
        console.log(that.data.requestDishResult)
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    wx.request(options)
  },

  getStars: function (starRank) {
    var that = this;
    if (starRank >= 4.8) {
      that.setData({
        scoreStars: [2, 2, 2, 2, 2]
      })
    } else if (starRank >= 4.3 && starRank < 4.8) {
      that.setData({
        scoreStars: [2, 2, 2, 2, 1]
      })
    } else if (starRank >= 3.8 && starRank < 4.3) {
      that.setData({
        scoreStars: [2, 2, 2, 2, 0]
      })
    } else if (starRank >= 3.3 && starRank < 3.8) {
      that.setData({
        scoreStars: [2, 2, 2, 1, 0]
      })
    } else if (starRank >= 2.8 && starRank < 3.3) {
      that.setData({
        scoreStars: [2, 2, 2, 0, 0]
      })
    } else if (starRank >= 2.3 && starRank < 2.8) {
      that.setData({
        scoreStars: [2, 2, 1, 0, 0]
      })
    } else if (starRank >= 1.8 && starRank < 2.3) {
      that.setData({
        scoreStars: [2, 2, 0, 0, 0]
      })
    } else if (starRank >= 1.3 && starRank < 1.8) {
      that.setData({
        scoreStars: [2, 1, 0, 0, 0]
      })
    } else if (starRank >= 0.8 && starRank < 1.3) {
      that.setData({
        scoreStars: [2, 0, 0, 0, 0]
      })
    } else if (starRank >= 0.3 && starRank < 0.8) {
      that.setData({
        scoreStars: [1, 0, 0, 0, 0]
      })
    } else if (starRank < 0.3) {
      that.setData({
        scoreStars: [0, 0, 0, 0, 0]
      })
    }
  },

  getRandomDish: function () {
    var that = this;
    // wx.showToast({
    //   title: '数据加载中',
    //   icon: 'loading',
    //   duration: 500
    // });
    // that.data.randomIndex = Math.round(Math.random() * (that.data.database.length - 1));
    that.setData({
      dishID: Math.round(Math.random() * 10) + 1
    })
    that.requestDishList()
    that.requestCommentList()
  },

  //加载时设置菜品的收藏状态 by mengql
  setIsFavoured: function () {
    var dishStr = this.data.canteen + this.data.dishID.toString()
    if (app.globalData.favouredlist.includes(dishStr)) {
      this.setData({ isFavoured: 1 })
    }
    else {
      this.setData({ isFavoured: 0 })
    }
  },

  addFavouriteDish: function () {
    this.setData({
      isFavoured: this.data.isFavoured == 1 ? 0 : 1
    })
    var that = this
    var dishStr = this.data.canteen + this.data.dishID.toString()
    var tempFavouredlist = app.globalData.favouredlist
    var isDelete
    if (this.data.isFavoured){
      isDelete = false
      tempFavouredlist.push(dishStr)
    }
    else{
      isDelete = true
      tempFavouredlist.splice(tempFavouredlist.indexOf(dishStr), 1)
    }
    var options = {
      url: config.service.postFavourUrl,
      login: true,
      method: 'POST',
      //需要在data里指定所有你需要的查询参数
      data: {
        openid: app.globalData.userInfo.openId,
        canteen:this.data.canteen,
        dishID:this.data.dishID,
        isDelete: isDelete
      },
      success(result) {
        util.showSuccess('成功收藏')
        wx.setStorage({
          key: 'favouredlist',
          data: tempFavouredlist,
        })
      },
      fail(error) {
        util.showModel('收藏失败，请检查网络', error);
      }
    }
    qcloud.request(options)
  },

  writeComment: function () {
    if (app.globalData.logged) {
      wx.navigateTo({
        url: '/pages/comments/writeComment/writeComment?canteen=' + this.data.canteen +
        '&dishID=' + this.data.dishID,
      })
    }
    else {
      wx.showModal({
        title: '您尚未登录',
        content: '请返回主页，点击右下角“我”进行设置',
      })
    }
  },

  // 将点赞状态上传到服务器 by mengql
  postUpvote: function (commentID, isDelete, tempVotelist) {
    var that = this
    var options = {
      url: config.service.postUpvoteUrl,
      login: true,
      method: 'POST',
      //需要在data里指定所有你需要的查询参数
      data: {
        commentID: commentID,
        openid: getApp().globalData.userInfo.openId,
        isDelete: isDelete
      },
      success(result) {
        util.showSuccess('点赞完成')
        wx.setStorage({
          key: 'votelist',
          data: tempVotelist,
        })
      },
      fail(error) {
        util.showModel('点赞失败，请检查网络', error);
      }
    }
    qcloud.request(options)
  },

  // 更改点赞状态 by mengql
  changeUpvoted: function (e) {
    var that = this
    if (getApp().globalData.logged) {
      var i = e.currentTarget.id
      var tempVotelist = that.data.voteList
      var isDelete
      if (that.data.comments[i].isUpvoted) {
        that.setData({
          ['comments[' + i + '].isUpvoted']: false,
          ['comments[' + i + '].upvoteCount']: that.data.comments[i].upvoteCount - 1
        })
        tempVotelist.splice(tempVotelist.indexOf(that.data.comments[i].COMMENT_ID), 1)
        isDelete = true
      }
      else {
        that.setData({
          ['comments[' + i + '].isUpvoted']: true,
          ['comments[' + i + '].upvoteCount']: that.data.comments[i].upvoteCount + 1
        })
        tempVotelist.push(that.data.comments[i].COMMENT_ID)
        isDelete = false
      }
      that.setData({
        voteList: tempVotelist
      })
      that.postUpvote(that.data.comments[i].COMMENT_ID, isDelete, tempVotelist)
    }
    else {
      wx.showModal({
        title: '您尚未登录',
        content: '未登录状态下无法对评论点赞，请返回主页，点击右下角“我”进行设置',
      })
    }
  },

  lower: function (e) {
    var that = this
    if (that.data.isCompleted == 0) {
      that.setData({
        loadmore: 1
      })
      setTimeout(function () {
        that.setData({
          loadmore: 0
        })
      }, 1000)
    } else {
      this.wetoast.toast({
        title: '已加载全部评论',
        duration: 1000
      })
    }
  },

  showUserDetail() {
    console.log("showUserDetail")
    wx.navigateTo({
      url: '/pages/about/showDetail/showDetail',
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
    this.requestCommentList()
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