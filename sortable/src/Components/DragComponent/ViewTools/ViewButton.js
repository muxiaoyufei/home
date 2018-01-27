/**
 * @class 视图操作
 * Created by fanpf on 2017/5/18.
 */
import React, {Component} from 'react';
import {Button, Radio, Icon, Menu, Dropdown,Modal} from 'antd';
const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;

class ViewButton extends Component {

  /**
  |--------------------------------------------------
  | @method 新建
  |--------------------------------------------------
  */
  onNew = ()=>{
    const {viewBtn,prefix,viewId,listId} = this.props;
    if(prefix == 'bef' || prefix == 'bfa'){
      // window.open("/query.action?obj="+prefix+"&ismainpage=view&m=newpage");
    }else {
      // window.open("/query.action?obj="+prefix+"&m=newpage");
    }
  }
  
  /**
  |--------------------------------------------------
  | @method 批量编辑
  |--------------------------------------------------
  */
  onEdit = ()=>{
    Modal.info({
      title : "信息提示",
      content : "是否批量编辑"
    })
  }

  /**
  |--------------------------------------------------
  | @method 批量删除
  |--------------------------------------------------
  */
  onDelete = ()=>{
    Modal.info({
      title : "信息提示",
      content : "是否删除此内容"
    })
  }

  /**
  |--------------------------------------------------
  | @method 批量转移
  |--------------------------------------------------
  */
  onTransfer = ()=>{
    Modal.info({
      title : "信息提示",
      content : "是否转移此内容"
    })
  }

  /**
  |--------------------------------------------------
  | @method 批量新增
  |--------------------------------------------------
  */
  onAdd = ()=>{
    Modal.info({
      title : "信息提示",
      content : "是否批量新增"
    })
  }

  /**
  |--------------------------------------------------
  | @method 合并"选择的记录不能超过10条"
  |--------------------------------------------------
  */
  onMerge = ()=>{
    Modal.info({
      title : "信息提示",
      content : "是否合并此内容"
    })
  }
  render() {
    const {viewBtn,prefix,viewId,listId,multiLanguage} = this.props;
    const btn = (
      viewBtn.map((value,index)=>{
        if(index < 3){
          if(value.name == "New"){
            return (
              <Radio.Button value={value.label} key={index} >{value.label}</Radio.Button>
            )
          }else if(value.name == "Batch Editor"){
            return (
              <Radio.Button value={value.label} key={index} onClick={this.onEdit}>{value.label}</Radio.Button>
            )
          }else if(value.name == "Batch Delete"){
            return (
              <Radio.Button value={value.label} key={index} onClick={this.onDelete}>{value.label}</Radio.Button>
            )
          }else if(value.name == "Batch Transfer"){
            return (
              <Radio.Button value={value.label} key={index} onClick={this.onTransfer}>{value.label}</Radio.Button>
            )
          }else if(value.name == "Batch Added"){
            return (
              <Radio.Button value={value.label} key={index} onClick={this.onAdd}>{value.label}</Radio.Button>
            )
          }else if(value.name == "Merge"){
            return (
              <Radio.Button value={value.label} key={index} onClick={this.onMerge}>{value.label}</Radio.Button>
            )
          }
        }
      })
    )
    const menu = (
      <Menu className="view-btn-dropdown">
        {
          viewBtn.map((value,index)=>{
            if(index > 2){
              if(value.name == "New"){
                return (
                  <Menu.Item key={index} value={value.label}><a href="javascript:void(0)">{value.label}</a></Menu.Item>
                )
              }else if(value.name == "Batch Editor"){
                return (
                  <Menu.Item key={index} value={value.label}><a href="javascript:void(0)" onClick={this.onEdit}>{value.label}</a></Menu.Item>
                )
              }else if(value.name == "Batch Delete"){
                return (
                  <Menu.Item key={index} value={value.label}><a href="javascript:void(0)" onClick={this.onDelete}>{value.label}</a></Menu.Item>
                )
              }else if(value.name == "Batch Transfer"){
                return (
                  <Menu.Item key={index} value={value.label}><a href="javascript:void(0)" onClick={this.onTransfer}>{value.label}</a></Menu.Item>
                )
              }else if(value.name == "Batch Added"){
                return (
                  <Menu.Item key={index} value={value.label}><a href="javascript:void(0)" onClick={this.onAdd}>{value.label}</a></Menu.Item>
                )
              }else if(value.name == "Merge"){
                return (
                  <Menu.Item key={index} value={value.label}><a href="javascript:void(0)" onClick={this.onMerge}>{value.label}</a></Menu.Item>
                )
              }
            }
          })
        }
      </Menu>
    )
    
    var viewbtn;
    if(viewBtn.length>0){
      viewbtn='block';
    }else{
      viewbtn='none';
    }
    return (
      <div style={{textAlign: "right",display:viewbtn }} >
        <Radio.Group size="large">
          {btn} 
          {this.props.viewBtn.length > 3 ? <Dropdown overlay={menu} trigger={['click']}>
            <Radio.Button value="down"><Icon type="caret-down"/></Radio.Button>
          </Dropdown> : <div></div>}
        </Radio.Group>
      </div>
    )
  }
};

export default ViewButton;