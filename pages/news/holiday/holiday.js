// pages/news/holiday/holiday.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[[],[]],
    search1:{
      type:0,
      currPageNo:1
    },
    search2:{
      type:1,
      currPageNo:1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHolidayNodes()
    this.getHolidayHelps()
  },

  /**
   * 获取放假通知
   */
  getHolidayNodes(){
    app.apiPost('holidayNotice/getNoticeList.do',this.data.search1).then(res=>{
      this.data.data[0] = res.data.list
      this.setData({
        data:this.data.data
      })
    })
  },

  /**
   * 获取放假安排
   */
  getHolidayHelps(){
    app.apiPost('holidayNotice/getNoticeList.do',this.data.search2).then(res=>{
      this.data.data[1] = res.data.list
      this.setData({
        data:this.data.data
      })
    })
  }
})