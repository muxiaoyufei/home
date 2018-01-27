import React, {Component} from 'react';
import {Menu,Dropdown,Icon,Form,Input,Button} from 'antd';
const FormItem = Form.Item;

class Votes extends Component{
 
  constructor(porps){
    super(porps);
    this.state = {
      formLayout : 'vertical',
      size : 'large',
      key:"我的追随者",
      i:2,
    }
  }
  handleSubmitLink = (e) => {
    e.preventDefault();
    const data=this.props.form.getFieldsValue();
  }
  onClick = function({key}){
    this.setState({
      key:{key}.key
    })
  };
  handleAddClick = ()=>{
    this.setState({
      i:this.state.i+1
    })
  }
  render(){
    const { getFieldProps } = this.props.form; 
    const menu = (
      <Menu onClick={this.onClick.bind(this)}>
        <Menu.Item key="我的追随者">我的追随者</Menu.Item>
        <Menu.Item key="我的小组">我的小组</Menu.Item>
        <Menu.Item key="所有人">所有人</Menu.Item>
      </Menu>
    )
    var optionData=[]
    for(var i=0;i<this.state.i;i++){
      var j=i+1
      var obj = new Object()
      obj.label="选项"+j;
      obj.option="Option"+j;
      optionData.push(obj)
    }
    const formitem = optionData.map((value,index)=>{
      return(
        <FormItem label={value.label} key={index}>
          <Input  {...getFieldProps(value.option)}/>
        </FormItem>
      )
    })
    return(
      <div className="micro">
        <Form onSubmit={this.props.handleSubmitVote.bind(this,this.props.form.getFieldsValue(),this.state.key,new Date().toLocaleTimeString())}>
          <p>到
            <Dropdown overlay={menu} trigger={['click']} >
              {/*...getFieldProps('follower')  //追随者  延后*/}
              <a  > {this.state.key} <Icon type="caret-down"/></a>
            </Dropdown>
          </p>
          <FormItem label="问题">
            <Input  placeholder="你想提问什么？"  className="content-input" size={this.state.size} {...getFieldProps('content')}/>
          </FormItem>
          {formitem}
          <FormItem style={{textAlign : 'right',marginBottom:10}}>
            <Button type="dashed" size="large" onClick={this.handleAddClick} style={{border : 'none',padding:0,float:'left',color:'#108ee9'}}>+添加选项</Button>
            <Button type="primary" htmlType="submit" size={this.state.size}>发表</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const Vote = Form.create()(Votes);
export default Vote;