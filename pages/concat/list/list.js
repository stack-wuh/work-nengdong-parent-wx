// pages/concat/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },

  fetchData(){
    app.apiPost('opinion/feedBackInfo.do').then(res=>{
      this.data.list = res.data
      this.setData({
        list:this.data.list
      })
    })
  }

})