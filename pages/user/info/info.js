// pages/user/info/info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        title:'基本信息',
        list:[
          {
            name:'姓名',
            value:'',
            prop:'name',
          },
          {
            name:'性别',
            value:'',
            prop:'sex',
          },
          {
            name:'生日',
            value:'',
            prop:'birth',
          },
          {
            name:'身份证号',
            value:'',
            prop:'idCard',
          },
          {
            name:'专业班级',
            value:'',
            prop:'classes',
          },
          {
            name:'学号',
            value:'',
            prop:'number',
          },
          {
            name:'政治面貌',
            value:'',
            prop:'status',
          }
        ]
      },
      {
        title:'联系方式',
        list:[
          {
            name:'手机号',
            value:'',
            prop:'phone',
          },
          {
            name:'微信',
            value:'',
            prop:'wechat'
          },
          {
            name:'宿舍',
            value:'',
            prop:['dormitory','room'],
          },
          {
            name:'校园卡号',
            value:'',
            prop:'campus'
          },
          {
            name:'地址',
            value:'',
            prop:'address',
          }
        ],
        style:'border-top:20rpx solid #e8f0f0;'
      }
    ],
    userInfo:wx.getStorageSync('userInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },

  fetchData(){
    app.apiPost('student/getUserStudent.do').then(res =>{
      var data = res.data
      for(var k in data.studentInfo){
        this.data.list.map(item =>{
          item.list.map(list => {
            if(typeof(list.prop == 'string') && list.prop == k){
              list.value = data.studentInfo[k] ? data.studentInfo[k] : '暂无'
              if(k == 'sex'){
                list.value = data.studentInfo.sex == 1 ? '男' : '女'
              }
            }else if(typeof(list.prop) == 'object'){
              var arr = []
              for(var ll in list.prop){
                if(k == list.prop[ll]){
                  list.value += data.studentInfo[k]
                  list.value = list.value.length > 0 ? list.value : '暂无'
                }
              }
            }
          })
        })
      }
      this.setData({
        list:this.data.list
      })
    })
  }
  
})