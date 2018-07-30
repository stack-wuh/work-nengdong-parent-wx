// pages/concat/teacher/teacher.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      name:'',
      wxPic:'',
      gender:'',
    },
    list:[
      {
        name:'手机',
        value:'15227272727',
        prop:'tel',
      },
      {
        name:'紧急联系电话',
        value:'1923-1239123',
        prop:'urgencyTel',
      },
      {
        name:'邮箱',
        value:'12380@qq.com',
        prop:'email',
      },
      {
        name:'QQ',
        value:'81239123',
        prop:'qq',
      },
      {
        name:'微信',
        value:'1293120938102',
        prop:'wechat',
      },
      {
        name:'办公地址',
        value:'湖北省武汉市洪山区光谷大道现代世贸中心E栋1102',
        prop:'address',
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
    
    this.fetchData(type)
  },

  fetchData(type){
    let url = type == '辅导员' ? 'student/getInstructor.do' : 'student/getClassTeacher.do'
    app.apiPost(url).then(res=>{  
      for(var k in res.data){
        this.data.list.map(item => {
          if(item.prop == k){
            item.value = res.data[k] ? res.data[k] : '暂无'
          }
        })
        for(var j in this.data.user){
          if(k == j){
            this.data.user[j] = res.data[k]
          }
        }
      }
      this.setData({
        list:this.data.list,
        user:this.data.user
      })
    })
  },
})