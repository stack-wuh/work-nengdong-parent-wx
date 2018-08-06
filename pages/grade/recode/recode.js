// pages/grade/recode/recode.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
  },

  /**
   * 切换nav
   */
  handleClickChange(e){
    let type = e.currentTarget.dataset.type
    this.setData({
      current:type
    })
    this.fetchData()
  },

  /**
   * burseList -- 奖学金列表
   * titleList -- 称号列表
   * patentList -- 专利列表
   * thesisList -- 论文列表
   * prizeList -- 获奖列表
   */
  fetchData(){
    let url = ''
    url = this.data.current == 0 ? 'disciplinary/praiseRecord.do' : 'disciplinary/studentPunis.do'
    app.apiPost(url).then(res=>{
      this.setData({
        data:res.data
      })
    })
  }

})