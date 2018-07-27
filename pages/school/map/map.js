// pages/school/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:12,
    longitude:14,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    this.mapCtx = wx.createMapContext('myMap')
  },

  
})