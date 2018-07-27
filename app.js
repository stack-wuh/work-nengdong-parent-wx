//app.js
const userInfo = wx.getStorageSync('userInfo')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let self = this
    // 登录
    wx.login({
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        success(res){
          wx.request({
            url:self.server + 'user/authorization.do',
            data:{code:res.code},
            success(res){
              wx.setStorageSync('openId',res.data.openid)
              wx.request({
                url:self.server + 'user/userLogin.do',
                data:{openid:res.data.openid},
                success(res){
                  wx.setStorageSync('sessionId',res.data.data.sessionId);
                }
              })

            }
          })
          if(userInfo){
            // wx.switchTab({
            //   url:'/pages/index/index'
            // })
          }else{
            wx.navigateTo({
              url:'/pages/loading/loading/loading'
            })
          }
        }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  apiPost:function(url,data = {},title = '加载中'){
    let self = this
    wx.showLoading({
      title:title
    })
    return new Promise((resolve,reject)=>{
      wx.request({
        url:self.server + url,
        method:'POST',
        header:{
          'content-type':'application/x-www-form-urlencoded',
          'cookie':'JSESSIONID=' +  wx.getStorageSync('sessionId')
        },
        data:data,
        success(res){
          wx.hideLoading()
          resolve(res.data)
        },
        fail(res){
          wx.hideLoading()
          reject(res.data)
          wx.showToast({
            title:'请求超时',
            image:'/images/error.png'
          })
        }
      })
    })
  },

  toastMsg(cate,msg){
    if(cate == 0){
      wx.showToast({
        title:msg,
        icon:'success'
      })
    }else if(cate == 1){
      wx.showToast({
        title:msg,
        image:'/images/error.png'
      })
    }else if(cate == -1){
      wx.showToast({
        title:msg,
        image:'/images/warning.png'
      })
    }
  },

  server:'http://192.168.10.122:8080/parents_guide/'
})