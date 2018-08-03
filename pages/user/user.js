// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    data:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo:this.data.userInfo
    })
    this.getUserInfo()
  },

  getUserInfo(){
    app.apiPost('student/getUserStudent.do').then(res=>{
      var grade = +res.data.studentInfo.grade
      res.data.studentInfo.gradeTime = `20${grade}年9月 - 20${grade+4}年6月`  
      this.setData({
          data:res.data
        })
    })
  },

  /**
   * 单击注销登录操作
   */
  logout(){
    app.apiPost('user/userLoginOut.do').then(res=>{
      app.toastMsg(res.status,res.msg)
      if(res.status == 0){
        wx.navigateTo({
          url:'/pages/loading/loading/loading'
        })
      }
    })
  },
})