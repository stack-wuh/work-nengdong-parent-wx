// pages/grade/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'',
    height:null,
    current:1
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
  },

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
  }
})