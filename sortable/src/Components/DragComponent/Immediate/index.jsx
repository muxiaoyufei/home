import React,{Component} from 'react';
import './style.scss';
import {IMMEDIATEEVENTLIST } from '../utils/Api.jsx';
import {Spin} from 'antd'
import fetchData from '../utils/fetch.js';

class Immediate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item:[],
      loading:false,
    }
 }
  componentWillMount() {
    this.setState({
      loading:true,
    })
    fetchData(IMMEDIATEEVENTLIST, {},this.props.binding, function (res) {
      let data = eval(res)
      if(data.flag=="SUCCESS"){
        this.setState({
          item: data.data,
          loading:false,
        });
      }
    }.bind(this))
  }

  // 开始时间处理
  startTime(date){
    let NowDate=new Date();
    let startDate=new Date(date);
    let milliDate=startDate.getTime()-NowDate.getTime();
    let _code=" ";
    let _hours=startDate.getHours();
    let _minutes=startDate.getMinutes();
    if(milliDate<=0){
      return ("立即")
    }else {
      if(_minutes<10){
        _code+="0"+_minutes;
      }else{
        _code+=Math.floor(_minutes/10)+_minutes%10;
      }
      if(_hours<=12){
        return ("上午"+`${_hours}`+":"+_code)
      }else{
        return ("下午"+`${_hours-12}`+":"+_code)
      }
    }
  }

  // 结束时间处理
  endTime(endDate){
    let enddate=new Date(endDate);
    let year=enddate.getFullYear()
    let month=enddate.getMonth() + 1
    let _dates=enddate.getDate();
    let _hours=enddate.getHours();
    let _minutes=enddate.getMinutes();
    let _seconds=enddate.getSeconds();
    let _code=" ";
    if(_minutes<10){
      _code+="0"+_minutes;
    }else{
      _code+=Math.floor(_minutes/10)+_minutes%10;
    }
    if(_hours<=12){
      return (year+"-"+month+"-"+_dates+" 上午"+`${_hours}`+":"+_code)
    }else{
      return (year+"-"+month+"-"+_dates+" 下午"+`${_hours-12}`+":"+_code)
    }
  }
  render() {
    const {item}=this.state;
    let itemLength=false;
    if(!item || item.length==0){
      itemLength=false
    }else{
      itemLength=true
    }
    return (
      <div className="immediate" name="immediate">
        <Spin spinning={this.state.loading} size="small">
          <h3 style={{color:this.props.text}}>即将进行的事件</h3>
          {
            itemLength ? <div className="immeEvent">
            {
              item.map((res,i)=>{
                return(
                  <dl key={i}>
                    <dt style={{color:this.props.text}}>{this.startTime(res.begintime)}</dt>
                    <dd>
                      <a
                        href={"query.action?&m=query&ismainpage=main&id="+`${res.id}`+"&rtnURL=home_mainPage.action"}
                        style={{color:this.props.link}}
                      >
                        {res.subject}
                      </a>
                    </dd>
                    <dd style={{color:this.props.detail}}>{this.endTime(res.endtime)}</dd>
                  </dl>
                )
              })
            }
            </div>:<div className="noneEvent" style={{color:this.props.text}}>
                看来您已完成今天的工作了
            </div>
          }
        </Spin>
      </div>
    )
  }
}

export default Immediate
