// pages/concat/feedback/feedback.js
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
  
  },

  submit(e){
    let data = e.detail.value
    if(!data.content){
      app.toastMsg(-1,'请编辑内容')
      return
    }
    app.apiPost('opinion/addOption.do',data).then(res=>{
      app.toastMsg(res.status,res.msg)
      if(res.status == 0){
        setTimeout(() => {
          wx.switchTab({
            url:'/pages/index/index'
          })
        }, 1000);
      }
    })
  }
  
})