// pages/account/bind/bind.js
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
  
  handleSubmit(e){
    let data = e.detail.value
    for(var k in data){
      if(!data[k]){
        app.toastMsg('-1','请编辑必填项')
        return
      }
    }
    app.apiPost('user/consummateUser.do',data).then(res=>{
      app.toastMsg(res.status,res.msg)
      if(res.status == 0){
        wx.switchTab({
          url:'/pages/user/user'
        })
      }
    })
  }
  
})