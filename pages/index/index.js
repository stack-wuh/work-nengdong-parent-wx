// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    menuList:[
      {
        title:'新闻中心',
        list:[
          {
            icon:'/images/icon-1.png',
            name:'新闻速递',
            path:"/pages/news/list/list?type=新闻速递",
          },
          {
            icon:'/images/icon-2.png',
            name:'通知公告',
            path:"/pages/news/list/list?type=通知公告",
          },
          {
            icon:'/images/icon-3.png',
            name:'放假通知',
            path:'/pages/news/holiday/holiday',
          }
        ]
      },
      {
        title:'学院概况',
        list:[
          {
            icon:'/images/icon-4.png',
            name:'学院简介',
            path:'',
          },
          {
            icon:'/images/icon-5.png',
            name:'招生简章',
            path:'/pages/school/guide/guide',
          },
          {
            icon:'/images/icon-6.png',
            name:'宣传视频',
            path:'',
          },
          {
            icon:'/images/icon-7.png',
            name:'乘车路线',
            path:'/pages/school/map/map',
          },          
        ]
      },
      {
        title:'成绩管理',
        list:[
          {
            icon:'/images/icon-8.png',
            name:'期末总结',
            path:'/pages/grade/index/index',
          },
          {
            icon:'/images/icon-9.png',
            name:'挂科记录',
            path:'/pages/grade/fail/fail',
          },
          {
            icon:'/images/icon-10.png',
            name:'等级证书',
            path:'/pages/grade/grading/grading',
          },
          {
            icon:'/images/icon-11.png',
            name:'在校履历',
            path:'/pages/grade/resume/resume',
          },
          {
            icon:'/images/icon-12.png',
            name:'奖惩记录',
            path:'/pages/grade/recode/recode',
          },
        ]
      },
      {
        title:'考勤追踪',
        list:[
          {
            icon:'/images/icon-13.png',
            name:'考勤汇总',
            path:'/pages/check/all/all',
          },
          {
            icon:'/images/icon-14.png',
            name:'课程考勤',
            path:"/pages/check/list/list?type=课程考勤",
          },
          {
            icon:'/images/icon-15.png',
            name:'晚点名考勤',
            path:'/pages/check/list/list?type=晚点名考勤',
          },
          {
            icon:'/images/icon-16.png',
            name:'宿舍考勤',
            path:'/pages/check/list/list?type=宿舍考勤',
          },
          {
            icon:'/images/icon-17.png',
            name:'讲座考勤',
            path:'/pages/check/list/list?type=讲座考勤',
          },
          // {
          //   icon:'/images/icon-18.png',
          //   name:'其他考勤',
          //   path:'/pages/check/list/list?type=其他考勤',
          // },
        ]
      },
      {
        title:'互动交流',
        list:[
          {
            icon:'/images/icon-19.png',
            name:'辅导员',
            path:'/pages/concat/teacher/teacher?type=辅导员',
          },
          {
            icon:'/images/icon-20.png',
            name:'班主任',
            path:'/pages/concat/teacher/teacher?type=班主任',
          },
          {
            icon:'/images/icon-21.png',
            name:'意见反馈',
            path:'/pages/concat/feedback/feedback',
          },
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()

  },
  fetchData(){
    app.apiPost('news/queryBanner.do').then(res=>{
      this.setData({
        list:res.data
      })
    })
  },
  jump2other(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url:'/pages/index/detail/detail?index=' + index
    })
  }
})