// pages/grade/grading/grading.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[
      [
        {
          name:'英语四级证书',
          isPass:true,
          list:[
            {
              name:'教育学',
              max:100,
              line:60,
              isPass:true
            },
            {
              name:'教育学1',
              max:100,
              line:60,
              isPass:true
            }
          ]
        }
      ],
      [
        {
          name:'英语三级证书',
          isPass:true,
          list:[
            {
              name:'教育学',
              max:100,
              line:60,
              isPass:true
            },
            {
              name:'教育学1',
              max:100,
              line:60,
              isPass:true
            }
          ]
        }
      ],
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.fetchData()
  },

  fetchData(){
    app.apiPost('certificate/certificateList.do',{type:'now'}).then(res=>{

    })
  }
})