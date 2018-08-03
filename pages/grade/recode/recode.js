// pages/grade/recode/recode.js
const app = getApp()
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
    this.fetchData()
  },

  fetchData(){
    app.apiPost('disciplinary/praiseRecord.do').then(res=>{

    })
  }

})