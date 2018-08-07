// pages/index/detail/detail.js
const app = getApp()
const wxParse = require('../../../utils/wxParse/wxParse')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = getCurrentPages()
    let prev = page[page.length - 2]
    let data = prev.data.list[options.index]
    let article = data.content
    wxParse.wxParse('article','html',article,this,20)
    this.setData({
      info:data
    })
    wx.setNavigationBarTitle({
      title:data.title
    })
  },
})