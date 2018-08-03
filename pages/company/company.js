// pages/company/company.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    data:[],
    search:{
      keyword:''
    },
    remind:'没有更多啦'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },

  /**
   * 获取黄页信息
   */
  fetchData(){
    let url = this.data.current == 0 ? 'page/getSchoolPage.do' : 'page/getCollected.do'
    app.apiPost(url,this.data.search).then(res=>{
      this.setData({
        data:res.data
      })
    })
  },
  
  /**
   * 单击切换header
   */
  handleClickChange(e){
    let current = e.currentTarget.dataset.current
    this.setData({
      current:current,
      data:[]
    })
    this.fetchData()
  },
  /**
   * 单击收藏黄页
   */
  handleClickCollect(e){
    let pageId = e.currentTarget.dataset.id
    app.apiPost('page/collectOr.do',{pageId:pageId}).then(res=>{
      app.toastMsg(res.status,res.msg)
      if(res.status == 0){
        this.data.data.map(item => item.id == pageId && (item.isCollected=!item.isCollected))
        this.setData({
          data:this.data.data
        })
      }
    })
  },
  /**
   * 关键字搜索
   */
  bindInputValue(e){
    this.data.search.keyword = e.detail.value
    this.setData({
      search:this.data.search      
    })
  },
})