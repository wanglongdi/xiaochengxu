var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({
  data: {
    isPlayImgMusic: false
  },
  onLoad: function (options) {
    var postId = options.id;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });
    //收藏
    this.data.currentPostId = postId;
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    if (app.globalData.g_isPlayimgMusic && this.data.currpenpPostId === postId) {
      this.setData({
        isPlayimgMusic: true
      })
    }
    this.setMusicMonitor();

  },
  onColletionTap: function (event) {
    this.getPostsCollectedSyc();
    //this. getPostsCollectedAsy();


  },

  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayimgMusic: true
      })
      app.globalData.g_isPlayimgMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currpenpPostId;
    })

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayimgMusic: false
      })
      app.globalData.g_isPlayimgMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })

    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayimgMusic: false
      })
      app.globalData.g_isPlayimgMusic = false;
      app.globalData.g_currentMusicPostId = null;

    })
  },
  getPostsCollectedAsy: function () {//异步缓存
    var that = this;
    wx.getStorage({
      Key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        //收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  },


  getPostsCollectedSyc: function () {//同步缓存
    var that = this;
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[that.data.currentPostId];
    //收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[that.data.currentPostId] = postCollected;
    that.showToast(postsCollected, postCollected);
  },


  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏该文章?" : "取消收藏该文章??",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          //更新文章是否的缓存值
          wx.setStorageSync('posts_collected', postsCollected);
          //更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },


  showToast: function (postsCollected, postCollected) {
    var that = this;
    //更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而实现切换图片
    that.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: 'true'
    })
  },

  onShareTap: function (event) {
    var itemList = ["分享到微信好友", "分享到朋友圈", "分享到QQ", "分享到微博"];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        //res.cancel 用户是不是点击了取消按钮
        //res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "用户是否取消" + res.cancel + "现在无法实现分享功能，什么时候能支持"
        })
      }
    })
  },

  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayimgMusic = this.data.isPlayimgMusic;
    if (isPlayimgMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayimgMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg //真机才能看到
      })
      this.setData({
        isPlayimgMusic: true
      })
    }


  }
})