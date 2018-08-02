// pages/school/guide/guide.js
const app = getApp()
const WxParse = require('../../../utils/wxParse/wxParse')
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
    this.fetchData()
  },

  fetchData(){
    app.apiPost('recruit/getStudentRecruit.do').then(res=>{
        var article = res.data[0].content
        WxParse.wxParse('article','html',article,this,20)
        this.setData({
          info:res.data[0]
        })
    })
  }
})