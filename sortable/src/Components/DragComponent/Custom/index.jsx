import React, { Component } from 'react';
import {Icon,Popover,Input,Radio,Modal,message} from 'antd';
import $ from 'jquery';
import { SAVEPARAMETER } from '../../../utils/Api';
import { Request } from '../../../utils/Request'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function onDeleteComp(){
  $(".anticon-close").on('click',function(){
    $(this).parent().remove()
  })
}

class Custom extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      url : "",
      urlSel : "relative"
    }
  }

  render() {
    return (
      <div className="custom" style={{height:"560px"}}>
        <iframe frameBorder="0" src={this.state.url} style={{width:"100%",height:"500px"}}></iframe>
        <Icon type="setting" title="点击设置URL" onClick={this.showModal.bind(this)}/>
        <Icon onClick={onDeleteComp} type="close"/>
        <Modal
          title="输入URL地址"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="关闭"
          okText="保存"
        >
          <RadioGroup onChange={this.onChange} defaultValue={this.state.urlSel} style={{marginBottom:"15px"}}>
            <RadioButton value="relative">相对路径</RadioButton>
            <RadioButton value="absolute">绝对路径</RadioButton>
          </RadioGroup>
          {
            this.state.urlSel == "relative" ? 
            <Input addonBefore="Http://www.cloudcc.com/" onChange={this.onUrlChange.bind(this)} placeholder="请输入相对路径地址"/> : 
            <Input onChange={this.onUrlChange.bind(this)} placeholder="请输入绝对路径地址"/>
          }
        </Modal>
      </div>
    );
  }

  onChange = (e)=> {
    this.setState({
      urlSel : e.target.value
    })
  }

  showModal = () => {
    this.setState({
      visible:true
    });
  }

  handleOk = (e) => {
    Request(SAVEPARAMETER,"64659F37B307130FCEF071CA101AA0D9",{
      "id" : Math.random().toString(36).substr(2),
      "binding" : "64659F37B307130FCEF071CA101AA0D9",
      // "binding" : getCookie('binding'),
      "style" : "",
      "pageID" : Math.random().toString(36).substr(2),
      "param" : {
        "url" : this.state.url
      }
    }).then((data)=>{
      if(data.flag == "SUCCESS"){
        message.success("保存成功！")
      }else {
        message.success("保存失败！")
      }
      this.setState({
        visible: false,
      });
    })
    
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  onUrlChange = (e) =>{
    if(this.state.urlSel == "relative"){
      this.setState({
        url : "Http://www.cloudcc.com/" + e.target.value
      })
    }else{
      this.setState({
        url : e.target.value
      })
    }
  }
}

function getCookie(cookie_name) {
  var allcookies = document.cookie;
  var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度
  // 如果找到了索引，就代表cookie存在，
  // 反之，就说明不存在。
  if (cookie_pos != -1) {
    // 把cookie_pos放在值的开始，只要给值加1即可。
    cookie_pos += cookie_name.length + 1;
    var cookie_end = allcookies.indexOf(";", cookie_pos);
    if (cookie_end == -1) {
      cookie_end = allcookies.length;
    }
    //这里就可以得到你想要的cookie的值了。。。
    var value = unescape(allcookies.substring(cookie_pos, cookie_end));
  }
  return value;
}

export default Custom;