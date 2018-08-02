// pages/account/detail/detail.js
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

  formSubmit(e){
    let data = e.detail.value
    for(var k in data){
      if(data[k] === ''){
        app.toastMsg(-1,'请编辑必填项')
      }
      if(k == 'studentIdNum'){
        const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        if(data[k] && !reg.test(data[k])){ 
          app.toastMsg(1,'身份证格式错误!')
        }
      }
    }
    app.apiPost('user/associatedStudent.do',data).then(res=>{
      app.toastMsg(res.status,res.msg)
      if(res.status == 0){
        wx.switchTab({
          url:'/pages/user/user'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  scanCode(){
    wx.scanCode({
      scanType:['qrCode'],
      success(res){
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })
  }
})