import React,{Component} from 'react';
import {Icon,Button,Collapse,Col,Popover,Row, Modal,Spin} from 'antd';
import './style.scss';
import { ASSISTANT } from '../utils/Api.jsx';
import fetchData from '../utils/fetch.js';
import NewEvent from './new/NewEvent.js';
import NewTask from './new/NewTask.js'
import SetModal from './new/setModal.jsx'
const Panel = Collapse.Panel;

class Assistant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      AssistData:[],
      notActivity:[], // 30天内无业务机会
      todayCustomer:[], // 今天分配给你的潜在客户
      notUntreatedWork:[], // 无未处理活动的业务机会
      overdueWork:[], // 带有过期任务的业务机会
      content:{},
      language:{},
      setVisible:false,
      loading:false,
    }
  }

  // 显示隐藏设置模态框
  // showSetModal = () => {
  //   this.setState({
  //     setVisible: true,
  //   });
  // }
  // handleSetOk = (e) => {
  //   this.setState({
  //     setVisible: false,
  //   });
  // }
  // handleSetCancel = (e) => {
  //   this.setState({
  //     setVisible: false,
  //   });
  // }

  componentWillMount() {
    this.setState({
      loading:true
    })
    fetchData(ASSISTANT, {},this.props.binding, function (res) {
      let data = eval(res);
      if(data){
        let {notActivity,todayCustomer,notUntreatedWork,overdueWork,allAssist,allData,
          notActivityData,todayCustomerData,notUntreatedWorkData,overdueWorkData,allAssistData}=[];
        // notActivity:[], // 30天内无业务机会
        // todayCustomer:[], // 今天分配给你的潜在客户
        // notUntreatedWork:[], // 无未处理活动的业务机会
        // overdueWork:[], // 带有过期任务的业务机会
        // label_component_helper:"助理"
        // label_component_helper_businesschange_0UntreatActivity:"无未处理活动的业务机会"
        // label_component_helper_businesschange_0activity:"30天内没有任何活动"
        // label_component_helper_businesschange_expiredtask:"业务机会包含逾期任务"
        // label_component_helper_nodata:"目前，无注意事项，请稍候检查"
        // label_component_helper_potentialcustom:"今天为你分配的潜在客户"
        // label_component_hotdeal_nodata:"无业务机会相关数据"
  
        notActivityData=data.BusinessChangeWithoutActivity;
        todayCustomerData=data.AssignedPotentialCustom;
        notUntreatedWorkData=data.BusinessChangeWith0UntreatActivity;
        overdueWorkData=data.BusinessChangeWithOverdueTask;
        notActivity=notActivityData.map((res)=>{
          return({
            ...res,
            title:data.language.label_component_helper_businesschange_0activity
          })
        })
        todayCustomer=todayCustomerData.map((res)=>{
          return({
            ...res,
            title:data.language.label_component_helper_potentialcustom,
          })
        })
        notUntreatedWork=notUntreatedWorkData.map((res)=>{
          return({
            ...res,
            title:data.language.label_component_helper_businesschange_0UntreatActivity
          })
        })
        overdueWork=overdueWorkData.map((res)=>{
          return({
            ...res,
            title:data.language.label_component_helper_businesschange_expiredtask
          })
        })
        allAssistData=notActivity.concat(todayCustomer);
        allAssist=allAssistData.concat(notUntreatedWork);
        allData=allAssist.concat(overdueWork)
        this.setState({
          AssistData: allData,
          language:data.language,
        });
        this.setState({
          loading:false,
        });
      }
    }.bind(this))
  }

  render() {
    const {assistData,classname,language,AssistData}=this.state;
    // label_component_helper:"助理"
    // label_component_helper_businesschange_0UntreatActivity:"无未处理活动的业务机会"
    // label_component_helper_businesschange_0activity:"30天内没有任何活动"
    // label_component_helper_businesschange_expiredtask:"业务机会包含逾期任务"
    // label_component_helper_nodata:"目前，无注意事项，请稍候检查"
    // label_component_helper_potentialcustom:"今天为你分配的潜在客户"
    // label_component_hotdeal_nodata:"无业务机会相关数据"
    return (
      <div className="assistant">
        <Spin spinning={this.state.loading} size="small">
          <h3 style={{color:this.props.text}} style={{color:this.props.text}}>{language.label_component_helper ? language.label_component_helper : ""}</h3>
          {AssistData?<div>
            {
              AssistData.map((res,i)=>{ 
                switch(res.title){
                  case `${language.label_component_helper_potentialcustom}`:
                    return (
                      <div key={i}>
                        <NotActivity 
                          binding={this.props.binding}
                          language={language}
                          id={res.id}
                          res={res}
                          text={this.props.text} 
                          operation={this.props.operation} 
                          link={this.props.link} 
                          btnText={this.props.btnText} 
                          border={this.props.border}
                          detail={this.props.detail} 
                        />
                      </div>
                    );
                  break;
                  case `${language.label_component_helper_businesschange_expiredtask}`:
                    return(
                      <div key={i}>
                        <NotActivity 
                          res={res}
                          id={res.id}
                          language={language}
                          binding={this.props.binding}
                          text={this.props.text} 
                          operation={this.props.operation} 
                          link={this.props.link} 
                          btnText={this.props.btnText} 
                          border={this.props.border}
                          detail={this.props.detail} 
                        />
                      </div>
                    );
                  break; 
                  case `${language.label_component_helper_businesschange_0activity}` :
                    return (
                      <div key={i}>
                        <NotActivity 
                          res={res}
                          id={res.id}
                          language={language}
                          binding={this.props.binding}
                          text={this.props.text} 
                          operation={this.props.operation} 
                          link={this.props.link} 
                          btnText={this.props.btnText} 
                          border={this.props.border}
                          detail={this.props.detail} 
                        />
                      </div>
                    );
                  break;
                  case `${language.label_component_helper_businesschange_0UntreatActivity}` :
                    return (
                      <div key={i}>
                        <NotActivity 
                          res={res}
                          id={res.id}
                          language={language}
                          binding={this.props.binding}
                          text={this.props.text} 
                          operation={this.props.operation} 
                          link={this.props.link} 
                          btnText={this.props.btnText} 
                          border={this.props.border}
                          detail={this.props.detail}  
                        />
                      </div>
                    );
                  break;
                }
              })
            }
          </div>:<div className="freeList" style={{color:this.props.text}}>
            {language.label_component_helper_nodata ? language.label_component_helper_nodata : ""}
          </div>
          }
          {/***<SetModal 
            visible={this.state.setVisible}
            onOk={this.handleSetOk}
            onCancel={this.handleSetCancel} 
            id={this.props.id}
            binding={this.props.binding}
            text={this.props.text} 
            operation={this.props.operation} 
            link={this.props.link} 
            btnText={this.props.btnText} 
            border={this.props.border}
            detail={this.props.detail}  
          />**/}
        </Spin>
      </div>
    )
  }
}

export default Assistant


class NotActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail:false,
      Eventvisible: false,
      Taskvisible: false,
      language:{},
    }
  }
  componentWillMount() {
    fetchData(ASSISTANT, {"binding":this.props.binding},this.props.binding, function (res) {
      let data = eval(res);
      this.setState({
        language:data.language,
      });
    }.bind(this))
  }
  // 滑过名字显示详细信息
  showPopover(res){
    return(
      <div className="detail">
        <Row>
          <Col span={12}>
            <span style={{color:this.props.text}}>可能性(%)</span>
            <span style={{color:this.props.text}}>{res.possibility ? res.possibility : "--"}</span>
          </Col>
          <Col span={12}>
            <span style={{color:this.props.text}}>金额</span>
            <span style={{color:this.props.text}}>￥{res.money ? res.money : "--"}</span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <span style={{color:this.props.text}}>客户名</span>
            <a style={{color:this.props.link}}>{res.customername ? res.customername : "--" }</a>
          </Col>
          <Col span={12}>
            <span style={{color:this.props.text}}>类型</span>
            <span style={{color:this.props.text}}>{res.category ? res.category : "--" }</span>
          </Col>
        </Row>
      </div>
    )
  }
  // 显示事件模态框
  showEventModal = () => {
    this.setState({
      Eventvisible: true,
    });
  }
  handleEventOk = (e) => {
    this.setState({
      Eventvisible: false,
    });
  }
  handleEventCancel = (e) => {
    this.setState({
      Eventvisible: false,
    });
  }
  // 显示任务模态框
  showTaskModal = () => {
    this.setState({
      Taskvisible: true,
    });
  }
  handleTaskOk = (e) => {
    this.setState({
      Taskvisible: false,
    });
  }
  handleTaskCancel = (e) => {
    this.setState({
      Taskvisible: false,
    });
  }
  render() {
    const {res,language}=this.props;
    // label_component_helper:"助理"
    // label_component_helper_businesschange_0UntreatActivity:"无未处理活动的业务机会"
    // label_component_helper_businesschange_0activity:"30天内没有任何活动"
    // label_component_helper_businesschange_expiredtask:"业务机会包含逾期任务"
    // label_component_helper_nodata:"目前，无注意事项，请稍候检查"
    // label_component_helper_potentialcustom:"今天为你分配的潜在客户"
    // label_component_hotdeal_nodata:"无业务机会相关数据"
    const {showDetail}=this.state;
      switch(res.title){
        case `${language.label_component_helper_potentialcustom}`:
          return (
            <div className="collapse" style={{borderBottom:this.props.border}}>
              <div className="collapse-header">
                <dl>
                  <span className="arrow" >
                    <Icon type="right" style={{color:this.props.operation}} onClick={()=>{this.setState({showDetail:true})}} style={{display:showDetail ? "none" : "block"}} />
                    <Icon type="down" style={{color:this.props.operation}} onClick={()=>{this.setState({showDetail:false})}} style={{display:showDetail ? "block" : "none"}} />
                  </span>
                  <dt><Icon className="star" type="star" /></dt>
                  <Col span={12} >
                    <Col span={16} style={{color:this.props.text,lineHeight: showDetail ? "24px" :"12px" }}>{res.title}</Col>
                    <Col span={16} style={{display:showDetail ? "none" : "block",marginTop:"5px"}}>
                      <Popover overlayClassName="assistantPopover"
                        content={this.showPopover(res)} trigger="hover"
                        title={
                          <div className="popoverTitle">
                            <i class="start">&#xe610;</i>
                            <span style={{color:this.props.text}}>{res.name}</span>
                          </div>
                        }
                      >
                        <a style={{color:this.props.link}}>{res.name}</a>
                      </Popover>
                    </Col>
                  </Col>
                </dl>
              </div>
              <div className="collapse-content" style={{display:showDetail? "block":"none"}}>
                <Row>
                  <Popover overlayClassName="assistantPopover"
                    content={this.showPopover(res)} trigger="hover"
                    title={
                      <div className="popoverTitle">
                        <i class="start">&#xe610;</i>
                        <span style={{color:this.props.text}}>{res.name}</span>
                      </div>
                    }
                  >
                    <a style={{color:this.props.link}}>{res.name}</a>
                  </Popover>  
                </Row>
                <Row>
                  <p style={{color:this.props.text}}>{res.telephone ? res.telephone : "--"}·{res.mobile ? res.mobile : "--"}·<a style={{color:this.props.link}}>{res.ownename?res.ownename:"--"}</a></p>
                </Row>
              </div>
            </div>
          );
        break;
        case `${language.label_component_helper_businesschange_expiredtask}`:
          return(
            <div className="collapse" style={{borderBottom:this.props.border}}>
              <div className="collapse-header">
                <dl>
                  <span className="arrow" >
                    <Icon type="right" style={{color:this.props.operation}} onClick={()=>{this.setState({showDetail:true})}} style={{display:showDetail ? "none" : "block"}} />
                    <Icon type="down" style={{color:this.props.operation}} onClick={()=>{this.setState({showDetail:false})}} style={{display:showDetail ? "block" : "none"}} />
                  </span> 
                  <dt><i className="overTask">&#xe625;</i></dt>
                  <Col span={12} >
                    <Col span={16} style={{color:this.props.text,lineHeight: showDetail ? "24px" :"12px" }}>{res.title}</Col>
                    <Col span={16} style={{display:showDetail ? "none" : "block",marginTop:"5px"}}>
                      <Popover overlayClassName="assistantPopover"
                        content={this.showPopover(res)} trigger="hover"
                        title={
                          <div className="popoverTitle">
                            <i className="overTask">&#xe625;</i>
                            <span style={{color:this.props.text}}>{res.name}</span>
                          </div>
                        }
                      >
                        <a style={{color:this.props.link}}>{res.name}</a>
                      </Popover>  
                    </Col>
                  </Col>
                </dl>
              </div>
              <div className="collapse-content" style={{display:showDetail? "block":"none"}}>
                <Row>
                  <Popover overlayClassName="assistantPopover"
                    content={this.showPopover(res)} trigger="hover"
                    title={
                      <div className="popoverTitle">
                        <i className="overTask">&#xe625;</i>
                        <span style={{color:this.props.text}}>{res.name}</span>
                      </div>
                    }
                  >
                    <a style={{color:this.props.link}}>{res.name}</a>
                  </Popover>
                </Row>
              </div>
            </div>
          );
        break; 
        case `${language.label_component_helper_businesschange_0activity}` :
          return (
            <div className="collapse" style={{borderBottom:this.props.border}}>
              <div className="collapse-header">
                <dl>
                  <span className="arrow" >
                    <Icon type="right" style={{color:this.props.operation}} onClick={()=>{this.setState({showDetail:true})}} style={{display:showDetail ? "none" : "block"}} />
                    <Icon type="down" style={{color:this.props.operation}} onClick={()=>{this.setState({showDetail:false})}} style={{display:showDetail ? "block" : "none"}} />
                  </span>
                  <dt><i className="crown">&#xe713;</i></dt>
                  <Col span={12} >
                    <Col span={16} style={{color:this.props.text,lineHeight: showDetail ? "24px" :"12px" }}>{res.title}</Col>
                    <Col span={16} style={{display:showDetail ? "none" : "block",marginTop:"5px"}}>
                      <Popover overlayClassName="assistantPopover"
                        content={this.showPopover(res)} trigger="hover"
                        title={
                          <div className="popoverTitle">
                            <i className="crown">&#xe713;</i>
                            <span style={{color:this.props.text}}>{res.name}</span>
                          </div>
                        }
                      >
                        <a style={{color:this.props.link}}>{res.name}</a>
                      </Popover>
                    </Col>
                  </Col>
                  <dd className="createIcon" style={{display:showDetail ? "none" : "block"}}>
                    <em className="leftIcon" onClick={this.showTaskModal.bind(this)}><Icon type="bars" /></em>
                    <em onClick={this.showEventModal.bind(this)}><Icon type="calendar" /></em>
                  </dd>
                </dl>
              </div>
              <div className="collapse-content" style={{display:showDetail? "block":"none"}}>
                <Row>
                  <Popover overlayClassName="assistantPopover"
                    content={this.showPopover(res)} trigger="hover"
                    title={
                      <div className="popoverTitle">
                        <i className="crown">&#xe713;</i>
                        <span style={{color:this.props.text}}>{res.name}</span>
                      </div>
                    }
                  >
                    <a style={{color:this.props.link}}>{res.name}</a>
                  </Popover>
                </Row>
                <Row className="Btn">
                  <Col span={10} onClick={this.showTaskModal.bind(this)}><Button style={{color:this.props.btnText}}>新建任务</Button></Col>
                  <Col span={10} onClick={this.showEventModal.bind(this)}><Button style={{color:this.props.btnText}}>新建事件</Button></Col>
                </Row>
              </div> 
              <NewEvent 
                binding={this.props.binding}
                id={res.id}
                objectApi="Account" 
                visible={this.state.Eventvisible}
                onOk={this.handleEventOk}
                onCancel={this.handleEventCancel} 
                text={this.props.text} 
                operation={this.props.operation} 
                link={this.props.link} 
                btnText={this.props.btnText} 
                border={this.props.border}
                detail={this.props.detail}   
              />
              <NewTask
                binding={this.props.binding}
                id={res.id}
                objectApi="Account" 
                visible={this.state.Taskvisible}
                onOk={this.handleTaskOk}
                onCancel={this.handleTaskCancel}   
                text={this.props.text} 
                operation={this.props.operation} 
                link={this.props.link} 
                btnText={this.props.btnText} 
                border={this.props.border}
                detail={this.props.detail}  
              />
            </div>
          );
        break;
        case `${language.label_component_helper_businesschange_0UntreatActivity}`:
        return(
          <div className="collapse" style={{borderBottom:this.props.border}}>
            <div className="collapse-header">
              <dl>
                <span className="arrow" >
                  <Icon type="right" style={{color:this.props.operation}} onClick={()=>{this.setState({showDetail:true})}} style={{display:showDetail ? "none" : "block"}} />
                  <Icon type="down" style={{color:this.props.operation}} onClick={()=>{this.setState({showDetail:false})}} style={{display:showDetail ? "block" : "none"}} />
                </span>
                <dt><i className="UntreatActivit">&#xea6e;</i></dt>
                <Col span={12} >
                  <Col span={16} style={{color:this.props.text,lineHeight: showDetail ? "24px" :"12px" }}>{res.title}</Col>
                  <Col span={16} style={{display:showDetail ? "none" : "block",marginTop:"5px"}}>
                    <Popover overlayClassName="assistantPopover"
                      content={this.showPopover(res)} trigger="hover"
                      title={
                        <div className="popoverTitle">
                          <i className="UntreatActivit">&#xea6e;</i>
                          <span style={{color:this.props.text}}>{res.name}</span>
                        </div>
                      }
                    >
                      <a style={{color:this.props.link}}>{res.name}</a>
                    </Popover>  
                  </Col>
                </Col>
              </dl>
            </div>
            <div className="collapse-content" style={{display:showDetail? "block":"none"}}>
              <Row>
                <Popover overlayClassName="assistantPopover"
                  content={this.showPopover(res)} trigger="hover"
                  title={
                    <div className="popoverTitle">
                      <i className="UntreatActivit">&#xea6e;</i>
                      <span style={{color:this.props.text}}>{res.name}</span>
                    </div>
                  }
                >
                  <a style={{color:this.props.link}}>{res.name}</a>
                </Popover>
              </Row>
            </div>
          </div>
        );
      }      
  }
}
