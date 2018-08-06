// pages/news/holiday/holiday.js
const app = getApp()
const WxParse = require('../../../utils/wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[[],[]],
    temp_data1:[],
    temp_data2:[],
    search1:{
      type:0,
      currPageNo:1,
      isShowMore:false,
    },
    search2:{
      type:1,
      currPageNo:1,
      isShowMore:false,
    },
    isShowDetail:false,
    info:{}
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
      let data = res.data.list
      data.map(item => {
        var article = item.content
        WxParse.wxParse('article','html',article,this,20)
      })
      this.setData({
        temp_data1:data
      })
      if(this.data.search1.currPageNo == 1){
        let arr = data.slice(0,2)
        if(data.length > 2){
          this.data.search1.isShowMore = true
        }else{
          this.data.search1.isShowMore = false
        }
        this.data.data[0] = arr
      }else{
        this.data.data[0] = this.data.data[0].concat(data)
        this.data.search1.isShowMore = data.length == 10 ?true : false
      }
      this.setData({
        data:this.data.data,
        search1:this.data.search1
      })
    })
  },

  /**
   * 获取放假安排
   */
  getHolidayHelps(){
    app.apiPost('holidayNotice/getNoticeList.do',this.data.search2).then(res=>{
      let data = res.data.list
      data.map(item => {
        var article = item.content
        WxParse.wxParse('article','html',article,this,20)
      })
      this.setData({
        temp_data2:data
      })
      if(this.data.search2.currPageNo == 1){
        let arr = data.slice(0,2)
        if(data.length > 2){
          this.data.search2.isShowMore = true
        }else{
          this.data.search2.isShowMore = false
        }
        this.data.data[1] = arr
      }else{
        this.data.data[1] = this.data.data[0].concat(data)
        this.data.search2.isShowMore = data.length == 10 ?true : false
      }
      this.setData({
        data:this.data.data,
        search2:this.data.search2
      })
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
  },

  /**
   * 单击列表显示详情
   */
  handleClickGetDetail(e){
    let id = e.currentTarget.dataset.id
    app.apiPost('holidayNotice/getNoticeInfo.do',{id}).then(res=>{
      let article = res.data && res.data.content
      WxParse.wxParse('article','html',article,this,20)
      this.data.info = res.data
      this.setData({
        isShowDetail:true,
        info:this.data.info
      })
    })
  },
  /**
   * 单击隐藏详情并清除
   */
  handleClickHideModalWithClear(){
    this.setData({
      isShowDetail:false,
      info:{}
    })
  },
  /**
   * 点击获取更多
   */
  handleShowMore(e){
    let type = e.currentTarget.dataset.type
    if(type == 0){
      if(this.data.search1.currPageNo == 1 && this.data.search1.isShowMore ){
        this.data.data[0] = this.data.temp_data1
        if(this.data.data[0].length ==10){
          this.data.search1.isShowMore = true
        }else{
          this.data.search1.isShowMore = false
        }
        this.setData({
          data:this.data.data,
          search1:this.data.search1
        })
      }else{
        this.data.search1.currPageNo ++ 
        this.setData({
          search1:this.data.search1
        })
        this.getHolidayNodes()
      }
    }else if(type ==1){
      if(this.data.search2.currPageNo == 1 && this.data.search2.isShowMore ){
        this.data.data[1] = this.data.temp_data2
        if(this.data.data[1].length ==10){
          this.data.search2.isShowMore = true
        }else{
          this.data.search2.isShowMore = false
        }
        this.setData({
          data:this.data.data,
          search2:this.data.search2
        })
      }else{
        this.data.search2.currPageNo ++ 
        this.setData({
          search2:this.data.search2
        })
        this.getHolidayHelps()
      } 
    }
  }

})