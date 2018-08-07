// pages/grade/grading/grading.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [
      {
        title: 'his',
        list: []
      },
      {
        title: 'now',
        list: []
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },

  fetchData() {
    app.apiPost('certificate/certificateList.do').then(res => {
      this.data.data.map(item => {
        for(var k in res.data){
          if(item.title == k){
            item.list = res.data[k]
          }
        }
      })
      this.setData({
        data:this.data.data
      })
    })
  }
})