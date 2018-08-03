// pages/grade/resume/resume.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[
      {
        year:'2017-2018',
        post:'学生会主席',
        content:'工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述'
      },
      {
        year:'2017-2018',
        post:'学生会主席',
        content:'工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述'
      },
      {
        year:'2017-2018',
        post:'学生会主席',
        content:'工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述工作内容描述'
      },            
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },

  fetchData(){
    app.apiPost('student/studentRecord.do').then(res=>{

    })
  }

})