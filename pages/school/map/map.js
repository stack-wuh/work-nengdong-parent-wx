// pages/school/map/map.js
const app = getApp()
const WxParse = require('../../../utils/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:30.612941,
    longitude:114.362908,
    scale:16,
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    this.mapCtx = wx.createMapContext('myMap')
    this.fetchData()
  },

  fetchData(){
    app.apiPost('recruit/getSchoolRoute.do').then(res=>{
        res.data.map(item => {
          var article = item.content
          WxParse.wxParse('article','html',article,this,20)
        })
        this.setData({
          data:res.data
        })
    })
  }

})