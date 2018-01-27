import React, { Component } from 'react';
import './style.css'
import { Layout,Menu, Icon,Row,Col,Input } from 'antd';
const Search = Input.Search;
const MenuItem = Menu.Item;


class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      current: '首页',
    }
  }
  render() {
    return (
      <div className="header" name="header">
        <Row className="header-box">
          <Col xl={6} lg={6} md={6}>
            <img src="https://login.cloudcc.com/images/getApplogo.png" style={{height:40,marginTop:10}}/>
          </Col>
          <Col xl={12} lg={12} md={12}>
            <Search
              placeholder="请输入搜索内容"
              style={{width:"90%",margin:"15px auto"}}
              onSearch={value => console.log(value)}
            />
          </Col>
          <Col xl={6} lg={6} md={6}>
            <Icon type="exclamation-circle"/>
            <Icon type="pie-chart"/>
            <Icon type="star"/>
          </Col>
        </Row>
        <Row className="menu-box">
          <Col xl={3} lg={5} md={6} className="all-app">
            全部系统应用
          </Col>
          <Col xl={21} lg={19} md={18}>
            <Menu 
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <MenuItem key="首页">首页</MenuItem>
              <MenuItem key="潜在客户">潜在客户</MenuItem>
              <MenuItem key="业务机会">业务机会</MenuItem>
              <MenuItem key="仪表板">仪表板</MenuItem>
              <MenuItem key="客户">客户</MenuItem>
              <MenuItem key="日报工">日报工</MenuItem>
              <MenuItem key="费用报销">费用报销</MenuItem>
              <MenuItem key="阿里云订单">阿里云订单</MenuItem>
              <MenuItem key="文档">文档</MenuItem>
              <MenuItem key="报表">报表</MenuItem>
              <MenuItem key="需求描述">需求描述</MenuItem>
              <MenuItem key="考勤">考勤</MenuItem>
              <MenuItem key="请假单">请假单</MenuItem>
            </Menu>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;