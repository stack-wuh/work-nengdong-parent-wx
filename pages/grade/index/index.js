// pages/grade/index/index.js
const app = getApp()
const WxParse = require('../../../utils/wxParse/wxParse')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'',
    height:null,
    current:1,
    search:{
      semester:'大三下学期'
    },
    gradeList:[
      '大一上学期',
      '大一下学期',
      '大二上学期',
      '大二下学期',
      '大三上学期',
      '大三下学期',
      '大四上学期',
      '大四下学期',
    ],
    info:{
      grade:{},
      score:[]
    },
    letter:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    wx.getSystemInfo({
      success(e){
        self.setData({
          height:e.windowHeight
        })
      },
    })
    this.getStuGrade()
    this.getLetterInfo()
  },

  /**
   * 获取学生期末考试成绩
   */
  getStuGrade(){
    app.apiPost('score/getScoreInfo.do',this.data.search).then(res=>{
      this.data.info.grade = res.data
      this.data.info.score = res.data.scoreInfoList
      this.setData({
        info:this.data.info,
      })
    })
  },

  /**
   * picker 切换学年
   */
  handlePickerChange(e){
    let index = e.detail.value
    this.data.search.semester = this.data.gradeList[index]
    this.setData({
      search:this.data.search
    })
  },

  /**
   * 
   * @param {*} e
   * scroll-view 中的滚动事件
   * scroll-view 中的nav点击事件 
   */
  scroll(e){
    // console.log(e)
  },
  tap(e){ 
    let index = e.currentTarget.dataset.index,
    current = e.currentTarget.dataset.current
    this.setData({
      toView:index,
      current:current
    })
  },

  /**
   * 获取告家长书内容
   */
  getLetterInfo(){
    app.apiPost('holidayNotice/getUserSummary.do',this.data.search).then(res=>{
      var article = res.data.content
      WxParse.wxParse('article','html',article,this,20)
      this.setData({
        letter:res.data
      })
    })
  }
})