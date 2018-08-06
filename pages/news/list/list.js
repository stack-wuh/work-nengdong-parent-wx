// pages/news/list/list.js
const list = [
  {
    title:'新闻速递',
    list:[
      {
        name:'全部',
        value:'',
      },
      {
        name:'工会活动',
        value:'工会活动'
      },
      {
        name:'班级建设',
        value:'班级建设'
      }
    ]
  },
  {
    title:'通知公告',
    list:[
      {
        name:'全部',
        value:'',
      },
      {
        name:'院办',
        value:'',
      },
      {
        name:'研工办',
        value:''
      }
    ]
  }
]
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    type:'',
    current:0,
    search:{
      currPageNo:1,
      list:'',
      keyword:''
    },
    data:[],
    remind:'没有更多啦',
    isShowMore:false,
    list:list
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type
    wx.setNavigationBarTitle({
      title:type,
    })
    const obj = this.data.list.find(item => item.title == type)
    this.setData({
      navList:obj,
      type:type
    })
    this.fetchData()
    this.getTypesList(type)
  }, 

  /**
   * 
   * @param {*} type -- 新闻速递 / 通知公告 
   */
   fetchData(){
    let url =  this.data.type === '新闻速递' ? 'news/getArticleList.do' : this.data.type === '通知公告' ? 'news/announcementList.do' :''
    app.apiPost(url,this.data.search).then(res=>{
      this.data.data = this.data.data.concat(res.data.list)
      this.setData({
        data:this.data.data
      })
      if(res.data.list.length == 10){
        this.setData({
          isShowMore:true,
          remind:'正在加载更多',
        })
      }else{
        this.setData({
          isShowMore:false,
          remind:'没有更多啦'
        })
      }
    })
   },

   /**
    * 
    * @param {*} e 绑定input输入框的value 
    */
   bindInputValue(e){
    this.data.search.keyword = e.detail.value
    this.setData({
      search:this.data.search,
    })
  },

  /**
   * 顶部导航切换
   */
  handleChangeType(e){
    this.data.search = {
      list:e.currentTarget.dataset.list,
      currPageNo:1,
    }
    this.setData({
      search:this.data.search,
      data:[],
      current:e.currentTarget.dataset.index,
    })
    this.fetchData()
  },

   /**
    * 下拉加载更多
    */
   onReachBottom: function () {
    if(this.data.isShowMore){
      this.data.search.currPageNo ++ 
      this.setData({
        search:this.data.search
      })
      this.fetchData()
    }
   },

   /**
    * 获取新闻类型列表
    */
   getTypesList(type){
    let url = type === '新闻速递' ? 'news/getArticleType.do' : 'news/getNoticeType.do'
     app.apiPost(url).then(res=>{
        let data = res.data
        this.data.list.map(item => {
          (item.title == type) && (item.list = data.map(item =>{ return {name:item,value:item} }))
        })
        this.setData({
          list:this.data.list
        })
        const obj = this.data.list.find(item => item.title == type)
        this.setData({
          navList:obj,
        })
     })
   },
})