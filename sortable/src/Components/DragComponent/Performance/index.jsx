import React,{Component} from 'react';
import createG2 from 'g2-react';
import { Stat ,Frame} from 'g2';
import {Spin} from 'antd'
import './style.css';
import { PERFORMANCELIST} from '../utils/Api.jsx';
import fetchData from '../utils/fetch.js';

class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data:[],
      loading:false,
      flag:true,
      forceFit: true,
      //width: 500,
      height:400,
      plotCfg: {
        margin: [5, 5]
      }
    }
  }
  componentWillMount(){
    this.setState({
      loading:true,
    })
    fetchData(PERFORMANCELIST, {},this.props.binding, function (res) {
      let data = eval(res);
      console.log("finsh>>>>",res)
      let item=data.businessData;
      let org=data.target
      let list=[];
      if(!item || item.length==0){
        list=[]
      }else{
        list=item.map((arr)=>{
          return({...arr,time:arr.sDateField1,"org":org,"finish":data.finished})
        })
      }
      if(data.flag=="SUCCESS"){
        this.setState({
          Data: list,
          loading:false
        })
      }
    }.bind(this))
  }
    render() {
      let oData=new Date('2017-10-26');
      let sData=new Date('2017-10-27')
      console.log("时间>>>>",(sData-oData))
      const Chart = createG2(chart => {
        
        chart.col("已结束-未处理(>70%)",{
          min:0,
          max:100,
          nice: true,
          formatter: function(val) {
            return val + 'w';
          },
         tickInterval:5
        })
        chart.col('time',{
          type: 'time',
          nice:true,
          mask: 'yyyy.mm.dd',
         // tickInterval: new Date('2017-10-27')-new Date('2017-10-26'),
          // range:[0,1]
          tickCount:20
        // ticks: ['2017-10-9','2017-10-26', '2017-10-26', '2017-11-16', '2017-11-23']
        })
        chart.col('目标',{
          min:0,
          max:100,
          formatter: function(val) {
            return val + 'w';
          },
          nice: false,
        })
        chart.col('已结束',{
          min:0,
          max:100,
          formatter: function(val) {
            return val + 'w';
          },
          nice: false,
        });
        chart.col('account',{
          min:0,
          // max:15,
          formatter: function(val) {
            return val + 'w';
          },
          nice: false,
        });
        chart.axis('目标', false);
        chart.axis('已结束', false);
        chart.axis('account', false);
        chart.axis("已结束-未处理(>70%)", {
          title: null,
          tickLine: false,
          nice: false,
          line: {
            stroke: '#000'
          },
          grid: {
            line: {
              stroke: '#d9d9d9'
            }
          }
        });
        chart.axis('time', {
          title: null,
          tickLine: false,
          line: {
            stroke: '#000'
          },
          grid: {
            line: {
              stroke: '#d9d9d9'
            }
          }
        });
        chart.tooltip({
          triggerOn: 'click' // 鼠标点击出发 tooltip
        }); // 关闭 tooltip
        chart.legend({
          position: 'bottom',
        })
        chart.line().position('time*已结束-未处理(>70%)').size(2).color('#69b9d4').selected((ev)=>{
        });
        chart.area().position('time*已结束-未处理(>70%)').color('#69b9d4').opacity(0.15);
        chart.line().position('time*目标').size(2).color('#60be88');
        chart.line().position('time*已结束').size(2).color('#efb975');
        chart.render();
        let geom = chart.getGeoms()[0]; // 获取所有的图形
        var items = geom.getData(); // 获取图形对应的数据
        // chart.on('tooltipchange',function(ev) {
        //   let items = ev.items; // tooltip显示的项
        //   let origin = items[1]; // 将一条数据改成多条数据
        //   let account = origin.point._origin.account+"w";
        //   items.splice(0); // 清空
        //   items.push({
        //     title: origin.title,
        //     name: '业务机会',
        //     marker: true,
        //     color: origin.color,
        //     value: account
        //   });
        // });
        chart.on('plotclick',function(ev){
          var data = ev.data;
          if (data) {
            var name = data._origin.org;
            chart.on('tooltipchange', function(ev,name) {

            let items = ev.items; // tooltip显示的项
            let origin = items[0]; // 将一条数据改成多条数据
            items.splice(0); // 清空
          });
          }
        });
      });
      const {Data}=this.state; 
      console.log("Data>>>>",Data)
      let frame = new Frame(Data);
      frame.addCol('已结束-未处理(>70%)', function(obj) {
        return obj.sumaccount/10000;
      });
      frame.addCol('目标', function(obj) {
        return obj.org/10000;
      });
      frame.addCol('已结束', function(obj) {
        return obj.finish/10000;
      });
      frame.addCol('account', function(obj) {
        return obj.account/10000;
      });
      frame = Frame.combinColumns(frame,'account', ['sDateField1', '已结束','已结束-未处理(>70%)','目标',]);
    return (
      <div className="performance">
        <Spin size="small" spinning={this.state.loading}>
          <h3 style={{color:this.props.text}}>销售业绩</h3>
          <Chart
            data={frame }
            height={this.state.height}
            forceFit={this.state.forceFit}
          />
        </Spin>
      </div>
    )
  }
}

export default Performance
