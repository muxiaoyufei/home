import React,{Component} from 'react';
import {Checkbox,Modal,Radio,message,Spin} from 'antd';
import { TASKLIST,TASKLISTSTATE,TASKSAVE } from '../utils/Api.jsx';
import './style.scss';
import fetchData from '../utils/fetch.js'

const RadioGroup = Radio.Group;

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[], // 今天的任务列表数据
      listState:[],
      checkData:[],
      taskVisible: false,
      taskId:"",
      value: "已结束",
      loading:false,
    }
  }
  // 获取数据方法
  getData(url, opts, binding) {
    this.setState({
      loading:true,
    })
    fetchData(url, opts, this.props.binding, function (res) {
      let data = eval(res)
        switch (url) {
          // 获取今天的任务数据
          case TASKLIST:
            if(data.flag=="SUCCESS"){
              this.setState({
                list: data.data
              });
            }
          break;
          // 任务状态列表
          case TASKLISTSTATE :
            if(data.flag=="SUCCESS"){
              this.setState({
                listState:data.data
              });
            }
          break;
        }
        if(data.flag=="SUCCESS"){
          this.setState({
            loading:false,
          })
        }
    }.bind(this))
  }
  componentWillMount() {
    const {binding}=this.props;
    this.getData(TASKLIST, {},binding)
    this.getData(TASKLISTSTATE , {},binding)
  }
  changstate() {
    this.setState({
      flag:true,
      firstClick:true,
    })
  }
  showTaskModal(res,i){
    const {list}=this.state
    if(res.className==="noLine"){
      list.forEach(item=>{
        if(item.id === res.id){
          item.className="line";
          this.setState({isUpdate: !this.state.isUpdate});
          fetchData(TASKSAVE, { "id":res.id,"state":"已结束"},this.props.binding,
            function (arr) {
              if(arr.flag==="SUCCESS"){
                message.success("保存成功",1)
              }else{
                message.error("保存失败")
              }
            }.bind(this)
          )
        }
      })
    }else {
      this.setState({
        taskVisible: true,
        taskId:res.id
      })
    }
  }
  handleAlertModalOk() {
    const {value,taskId}=this.state;
    fetchData(TASKSAVE,{"id":taskId,"state":value},this.props.binding,
    function (arr) {
      if(arr.flag==="SUCCESS"){
        message.success("保存成功",1)
        setTimeout(() => {
          this.setState({
            taskVisible: false, 
          });
          window.location.reload();
        }, 2000);
      }else{
        message.error("保存失败")
      }
    }.bind(this)); 
  }
  handleCreateModalCancel() {
    this.setState({
      taskVisible: false,
    })
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    const {data,list,listState,taskStyle,currentState}=this.state;
    let arr=this.arr
    let listLength=false;
    if(!list || list.length===0){
      listLength=false
    }else{
      listLength=true
    }
    return (
      <div className='task'>
        <Spin spinning={this.state.loading} size="small" >
          <h3 style={{color:this.props.text}}>今天的任务</h3>
          {listLength ? <ul>
            {
              list.map((res,i)=>{return(
                <li key={i}>
                  <Checkbox className={res.className} onChange={this.showTaskModal.bind(this,res,i)}>
                    <a className={res.id} style={{color:this.props.link}}>{res.subject}</a>
                  </Checkbox>
                </li>
                )
              })
            }
            <a className="all"
              href="/task.action?person=many&timeline=day&time_checked=today&taskcondition=today"
              style={{color:this.props.link}}
            >查看全部</a>
          </ul> :<div className="freeList" style={{color:this.props.text}}>今天没有到期任务-趁有时间，去喝杯咖啡吧。</div>}
          <Modal
            title="任务状态"
            wrapClassName="taskModal"
            visible={this.state.taskVisible}
            onOk={this.handleAlertModalOk.bind(this)}
            onCancel={this.handleCreateModalCancel.bind(this)}
            width = { 700 }
          >
            <RadioGroup style={{color:this.props.text}} onChange={this.onChange} value={this.state.value}>
              <Radio value={listState.未开始} style={{color:this.props.text}}>{listState.未开始}</Radio>
              <Radio value={listState.进行中} style={{color:this.props.text}}>{listState.进行中}</Radio>
              <Radio value={listState.已结束} style={{color:this.props.text}}>{listState.已结束}</Radio>
            </RadioGroup>
          </Modal>
        </Spin>
      </div>
    )
  }
}

export default Task
