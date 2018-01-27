import React, {Component} from 'react';
import {Menu,Dropdown,Icon,Input,Row,Col,Button,Form,Select} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;


class Posts extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      size : 'large',
      key:"我的追随者"
    }
  }
  handleSubmitpost = (e) => {
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
    // 中国标准时间
     // Date.prototype.toJSON = function () { return this.toLocaleString(); }
    return(
      <div className="micro">
        <Form onSubmit={this.props.handleSubmitpost.bind(this,this.props.form.getFieldsValue(),this.state.key,new Date())}>
          <p>到
            <Dropdown overlay={menu} trigger={['click']} > 
              {/*...getFieldProps('follower')  //在a里面 追随者*/}
              <a > {this.state.key} <Icon type="caret-down"/></a>
            </Dropdown>
          </p>
          <FormItem>
            <Input type="textarea" rows={3} className="content-input" size={this.state.size} {...getFieldProps('content')}/>
          </FormItem>
          <Row className="row">
            
            <Col span={24} style={{textAlign:'right'}}>
              <Button type="primary" htmlType="submit" size={this.state.size} >发表</Button>
            </Col>
          </Row>
            
        </Form>
      </div>
    )
  }
};
const Post = Form.create()(Posts);
export default Post;