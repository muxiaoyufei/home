import React, {Component} from 'react';
import {Menu,Dropdown,Icon,Form,Input,Button} from 'antd';
const FormItem = Form.Item;


class Links extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      formLayout : 'vertical',
      size : 'large',
      key:"我的追随者"
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
  render(){
    const { getFieldProps } = this.props.form; 
    const menu = (
      <Menu onClick={this.onClick.bind(this)}>
        <Menu.Item key="我的追随者">我的追随者</Menu.Item>
        <Menu.Item key="我的小组">我的小组</Menu.Item>
        <Menu.Item key="所有人">所有人</Menu.Item>
      </Menu>
    )
    return(
      <div className="micro">
        <Form onSubmit={this.props.handleSubmitLink.bind(this,this.props.form.getFieldsValue(),this.state.key,new Date().toLocaleTimeString())}>
          <p>到
            <Dropdown overlay={menu} trigger={['click']} >
              {/*...getFieldProps('follower') //追随者 延后*/}
              <a  > {this.state.key} <Icon type="caret-down"/></a>
            </Dropdown>
          </p>
          <FormItem label="链接URL">
          <Input size={this.state.size} {...getFieldProps('linkUrl')}/>
          </FormItem>

          <FormItem label="链接名称">
            <Input size={this.state.size} {...getFieldProps('linkName')}/>
          </FormItem>

          <FormItem>
            <Input type="textarea" rows={3} className="content-input" size={this.state.size} {...getFieldProps('content')}/>
          </FormItem>

          <FormItem style={{textAlign : 'right',marginBottom:10}}>
            <Button type="primary" htmlType="submit" size={this.state.size}>发表</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const Link = Form.create()(Links);
export default Link;