// pages/news/holiday/holiday.js
const app = getApp()
const WxParse = require('../../../utils/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[[],[]],
    search1:{
      type:0,
      currPageNo:1,
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
      this.data.data[0] && this.data.data[0].map(item => {
        var article = item.content
        WxParse.wxParse('article','html',article,this,20)
      })
      this.setData({
        data:this.data.data
      })
      console.log(this.data)
    })
  },

  /**
   * 获取放假安排
   */
  getHolidayHelps(){
    app.apiPost('holidayNotice/getNoticeList.do',this.data.search2).then(res=>{
      this.data.data[1] = res.data.list
      this.data.data[1] && this.data.data[1].map(item => {
        var article = item.content
        WxParse.wxParse('article','html',article,this,20)
      })
      this.setData({
        data:this.data.data
      })
      console.log(this.data)
    })
  },

  /**
   * 关键字搜索
   */
  bindInputValue(e){
    this.data.search1.keyword = e.detail.value
    this.data.search2.keyword = e.detail.value
    this.setData({
      search1:this.data.search1,
      search2:this.data.search2
    })
    console.log(this.data)
  },

  /**
   * 点击获取更多
   */
  handleShowMore(e){
    let type = e.currentTarget.dataset.type
    if(type == 0){
      this.data.search1.currPageNo ++
      this.setData({
        search1:this.data.search1
      }) 
      this.getHolidayNodes()
    }
  }

})