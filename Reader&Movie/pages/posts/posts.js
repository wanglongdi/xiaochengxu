// pages/posts/posts.js
var postsData = require('../../data/posts-data.js');
Page({
  // 页面的初始数据
  data: {
   
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    //console.log(postId);
    wx.navigateTo({
      url: "posts-detail/posts-detail?id="+postId
    })
  },
  onSwiperItemTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    //console.log(postId);
    wx.navigateTo({
      url: "posts-detail/posts-detail?id=" + postId
    })
  },
  onSwiperTap: function (event) {
    var postId = event.target.dataset.postid;
    //target这里指的是image,而currentTarget指的是swiper
    //console.log(postId);
    wx.navigateTo({
      url: "posts-detail/posts-detail?id=" + postId
    })
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    
    this.setData({
      posts_key: postsData.postList
    });

    
  },

 
})