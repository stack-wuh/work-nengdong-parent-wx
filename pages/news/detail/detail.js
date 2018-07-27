// pages/news/detail/detail.js
const app = getApp()
const WxParse = require('../../../utils/wxParse/wxParse.js')
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
    let prevpage = page[page.length-2]
    let data = prevpage.data.data[options.index]
    this.setData({
      info:data
    })
    wx.setNavigationBarTitle({
      title:this.data.info.list
    })
    var article = this.data.info.content
    WxParse.wxParse('article','html',article,this,20)
  },


 
})