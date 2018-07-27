// pages/loading/loading/loading.js
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

  bindgetUserInfo(e){
    let self = this
    if(e.detail.userInfo){
      wx.showModal({
        content:'授权成功!',
        showCancel:false,
        confirmText:'知道了',
        success(res){
          wx.setStorageSync('userInfo',e.detail.userInfo)
          wx.switchTab({
            url:'/pages/index/index'
          })
        }
      })
    }
    app.apiPost('user/userLogin.do',{openid:wx.getStorageSync('openId')}).then(res=>{
      if(res.status == 0){
        wx.setStorageSync('sessionId',res.data.sessionId);
      }
    })
  },
})