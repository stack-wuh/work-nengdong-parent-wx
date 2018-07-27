// pages/concat/teacher/teacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        name:'手机',
        value:'15227272727',
      },
      {
        name:'办公电话',
        value:'1923-1239123',
      },
      {
        name:'邮箱',
        value:'12380@qq.com',
      },
      {
        name:'QQ',
        value:'81239123',
      },
      {
        name:'微信',
        value:'1293120938102'
      },
      {
        name:'办公地址',
        value:'湖北省武汉市洪山区光谷大道现代世贸中心E栋1102'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type
    wx.setNavigationBarTitle({
      title:type
    })
  },

  
})