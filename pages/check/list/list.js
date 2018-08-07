// pages/check/list/list.js
const wxChart = require('../../../utils/wxcharts-min')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'', // navBar-title
    url:'', // 请求地址
    search:{ // 请求参数
      semester:'大三下学期', //学期
      leaveNo:1,   // 请假页码
      lateNo:1,   // 迟到页码
      cutNo:1    // 旷课页码
    },
    gradeList:[
      '大一上学期',
      '大一下学期',
      '大二上学期',
      '大二下学期',
      '大三上学期',
      '大三下学期',
      '大四上学期',
      '大四下学期',
    ],
    overviewData:{},
    data:[],
    isShowDetail:false,
    details:{},
    data : [{title:'旷到',prop:'cutInfo',data:[],isShowMore:false,style:'background-color:#F28F81;'},
    {title:'迟到',prop:'lateInfo',data:[],isShowMore:false,style:'background-color:#89A1FF;'},
    {title:'请假',prop:'leaveInfo',data:[],isShowMore:false,style:'background-color:#6CB6FF;'}] , 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type , url = ''
    switch(type){
      case '课程考勤' : url = 'attendance/lessonAttendance.do'
        break;
      case '晚点名考勤' : url = 'attendance/nightMention.do'
        break;
      case '宿舍考勤' : url = 'attendance/dormAttendance.do'
        break;
      case '讲座考勤' : url = 'attendance/meetAttendance.do'
        break;
    }
    wx.setNavigationBarTitle({
      title:type
    })
    this.setData({
      url:url,
      title:type
    })
    this.fetchData()
  },

  /**
   * signTotal: 总签到数
   * valid：有效签到数
   * invalid：无效签到数
   * rate：总出勤率
   * later: 迟到
   * leave:请假
   * out:旷课
   * state: 1:签到 ， 2：迟到 ， 3：请假 ，4：旷到
   */
  fetchData(){
    app.apiPost(this.data.url,this.data.search).then(res=>{
      let signInfo = res.data.signInfo , 
          obj = {signTotal:res.data.signTotal,valid:0,invalid:0,rate:0,out:0,leave:0,later:0}
      signInfo.map(item => {
        if(item.state == 1){
          obj['valid'] += item.count
        }else if(item.state == 2) { // 迟到
          obj['later'] += item.count
          obj['invalid'] += item.count
        }else if(item.state == 3){ // 请假
          obj['leave'] += item.count
          obj['invalid'] += item.count
        }else if(item.state == 4){ // 旷到
          obj['out'] += item.count 
          obj['invalid'] += item.count
        }
        var rate = Number.parseInt((obj.valid / obj.signTotal)*100)
        obj['rate'] = isNaN(rate) ? 0 : rate
      })
      this.data.data.map(item => {
        (res.data[item.prop].list.length == 2 || res.data[item.prop].list.length == 10) ? item.isShowMore = true : item.isShowMore = false
        item.data = item.data.concat(res.data[item.prop].list)
      })
      this.setData({
        overviewData:obj,
        data:this.data.data,
      })
      this.WxchartInit()
    })
  },

  /**
   * 单击查看更多
   * index 0:旷到 ， 1 ： 迟到 , 2 : 请假
   */
  handleClickShowMore(e){
    let index = e.currentTarget.dataset.id
    if(index == 0){
      this.data.search.cutNo ++ 
    }else if(index == 1){
      this.data.search.lateNo ++
    }else if(index == 2){
      this.data.search.leaveNo ++ 
    }
    this.setData({
      search:this.data.search
    })
    this.fetchData()
  },

  /**
   * 查看详情
   */
  handleClickChangeDetail(e){
    let info = e.currentTarget.dataset.info
    this.setData({
      details:info,
      isShowDetail:true
    })
  },

  /**
   * 单击隐藏模态框
   */
  handleClickHideModal(){
    this.setData({
      isShowDetail:false
    })
  },

    /**
   * picker选择器改变学年
   */
  pickerChange(e){
    let index = e.detail.value
    this.data.search.semester = this.data.gradeList[index]
    this.setData({
      search:this.data.search
    })
    this.fetchData()
  },

  /**
   * 初始化charts
   */
  WxchartInit(){
    let self = this
    new wxChart({
      animation:true,
      canvasId:'rings',
      type:'ring',
      extra:{
        ringWidth:10,
      },
      series:[
        {
          name:'总签到数' + self.data.overviewData.signTotal || 0,
          data:self.data.overviewData.valid || 0,
          color:"#00998d",
        },
        {
          name:'未签到数' + self.data.overviewData.invalid || 0,
          data:self.data.overviewData.invalid || 0,
          color:'#eee',
        }
      ],
      subtitle:{
        name:self.data.overviewData.rate || 0+'%',
        color:'#00998d',
        fontSize:30
      },
      title:{
        name:'总出勤率',
        color:'#333',
        fontSize:14
      },
      width:300,
      height:180,
      dataLabel:false,
    })
  }
})