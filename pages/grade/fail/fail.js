// pages/grade/fail/fail.js
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

  /**
   * 获取详情
   */
  fetchData(){
    app.apiPost('score/getFailScore.do').then(res=>{
      console.log(res)
    })
  }
})