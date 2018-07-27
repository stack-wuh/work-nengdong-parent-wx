// pages/check/all/all.js
const Wxchart = require('../../../utils/wxcharts-min')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tables:[
      {
        name:'课程',
        prop:'lessonSum',
        list:[
          {
            name:'出勤率',
            data:'0%',
            prop:'rate',
          },
          {
            name:'考勤次数',
            data:'0',
            prop:'checkCount',
          },
          {
            name:'未签到次数',
            data:'0',
            prop:'noSign',
          }
        ]
      },
      {
        name:'晚点名',
        prop:'wdmSum',
        list:[
          {
            name:'出勤率',
            data:'0%',
            prop:'rate',
          },
          {
            name:'考勤次数',
            data:'0',
            prop:'checkCount',
          },
          {
            name:'未签到次数',
            data:'0',
            prop:'noSign',
          }
        ]
      },
      {
        name:'宿舍',
        prop:'dormSum',
        list:[
          {
            name:'出勤率',
            data:'0%',
            prop:'rate',
          },
          {
            name:'考勤次数',
            data:'0',
            prop:'checkCount',
          },
          {
            name:'未签到次数',
            data:'0',
            prop:'noSign',
          }
        ]
      }, 
      {
        name:'会议讲座',
        prop:'meetSum',
        list:[
          {
            name:'出勤率',
            data:'0%',
            prop:'rate',
          },
          {
            name:'考勤次数',
            data:'0',
            prop:'checkCount',
          },
          {
            name:'未签到次数',
            data:'0',
            prop:'noSign',
          }
        ]
      },                
    ],
    search:{
      semester:'',
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
    overview:[
      [
        {
          name:'总签到数',
          value:'',
          prop:'signTotal',
        },
        {
          name:'有效签到',
          value:'',
          prop:'valid',
        },
        {
          name:'未签到数',
          value:'',
          prop:'invalid',
        }
      ],
      [
        {
          name:'迟到数',
          value:'',
          prop:'later'
        },
        {
          name:'请假数',
          value:'',
          prop:'leave'
        },
        {
          name:'旷到数',
          value:'',
          prop:'out'
        }
      ]
    ],
    overViewData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
    this.wxInit()
  },

  /**
   * state ：1：有效签到 ， 2 : 迟到 , 3 : 请假 ,4 : 旷到
   * total/signTotal:总签到数
   * valid:有效签到
   * invalid：无效签到
   * later: 迟到
   * leave: 请假
   * out: 旷到
   */
  fetchData(){
    app.apiPost('attendance/attendanceSummary.do',this.data.search).then(res=>{
      let data = res.data , obj = {signTotal:data.signTotal,valid:0,later:0,leave:0,out:0,invalid:0,rate:0}
      for(var k in data){
        data[k] && Array.isArray(data[k]) && data[k].map(list=>{
          if(list.state == 1){   //有效签到
            obj['valid'] += list.count
          }else if(list.state == 2){ // 迟到
            obj['later'] += list.count
            obj['invalid'] += list.count
          }else if(list.state == 3){ // 请假
            obj['leave'] += list.count
            obj['invalid'] += list.count
          }else if(list.state == 4){ // 旷到
            obj['out'] += list.count
            obj['invalid'] += list.count
          }
        })
      }
      this.data.overview.map(item => {
        item.map(list => {
          for(var k in obj){
            if(list.prop == k){
              list.value = obj[k]
            }
          }
          var rate = Number.parseInt((obj.valid/obj.signTotal) * 100)
          obj['rate'] = isNaN(rate) ? 0 : rate
        })
      })

      this.data.tables.map(item => {
        for(var k in res.data){
          if(item.prop == k){
            item.list.map(list => {
              list.data = res.data[k][list.prop]
              list.data = isNaN(list.data) ? 0 : list.data
            })
          }
        }
      })

      this.setData({
        overview:this.data.overview,
        overViewData:obj,
        tables:this.data.tables
      })
      
      this.wxInit()
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
   * charts初始化
   */
  wxInit(){
    let self = this
    new Wxchart({
      animation:true,
      canvasId:'rings',
      type:'ring',
      extra:{
        ringWidth:10,
      },
      series:[
        {
          name:'已签到',
          data:self.data.overViewData.valid || 0,
          color:"#00998d",
        },
        {
          name:'未签到',
          data:self.data.overViewData.invalid || 0,
          color:'#eee',
        }
      ],
      subtitle:{
        name:self.data.overViewData.rate || 0 +'%',
        color:'#00998d',
        fontSize:30
      },
      title:{
        name:'总出勤率',
        color:'#333',
        fontSize:14
      },
      width:150,
      height:180,
      dataLabel:false,
    })
  }
  
})