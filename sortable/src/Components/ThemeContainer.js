/**
|--------------------------------------------------
| @class 品牌库组件
|--------------------------------------------------
*/

import React, { Component } from 'react';
import { GETTHEMELIST,DELETETHEME } from '../utils/Api';
import { Request } from '../utils/Request';
import { EDITETHEME } from '../utils/Api';
import reactCSS from 'reactcss';
import ThemeLayout from './ThemeComponent/ThemeLayout'
import { Button, Layout, Icon, Row, Col, Card, Breadcrumb,message } from 'antd';
const {Content } = Layout;

class ThemeContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      binding: "",
      objThemeList : [],
      bolNewTheme : true,
      objEditTheme : {}
    }
    this.onEditTheme = this.onEditTheme.bind(this)
    this.onDeleteTheme = this.onDeleteTheme.bind(this)
  }
  render() {
    // 布局列表
    let themeList = this.state.objThemeList.map((value, index) => {
      return (
        <Col className="layout-body-main" span={6} key={value.id}>
          <Card title={value.label} bordered={false} className="card-item">
            <Icon id={value.id} type="edit" title="编辑" onClick={this.onEditTheme}/>
            <Icon id={value.id} type="close" title="删除" onClick={this.onDeleteTheme}/>
            <ul>
              <li style={{background:value.style.textColor}}></li>
              <li style={{background:value.style.btnTextColor}}></li>
              <li style={{background:value.style.detailColor}}></li>
              <li style={{background:value.style.linkColor}}></li>
              <li style={{background:value.style.operationColor}}></li>
              <li style={{background:value.style.borderColor}}></li>
            </ul>
            <p>{value.memo}</p>
          </Card>
        </Col>
      )
    })

    return (
      <div>
        <Content>
          <Row className="bread-layout">
            <Col span={20}>
              <Breadcrumb>
                <Breadcrumb.Item href=""><Icon type="home" /></Breadcrumb.Item>
                <Breadcrumb.Item href=""><span>品牌化</span></Breadcrumb.Item>
                <Breadcrumb.Item>样式库</Breadcrumb.Item>
              </Breadcrumb>
            </Col>

            <Col span={4} style={{ textAlign: "right" }}>
              <Button type="primary" onClick={this.onNewTheme}>新建样式</Button>
            </Col>
          </Row>
          <Row className="layout-body-container">
            {themeList}
          </Row>
        </Content>
        {
          this.state.bolNewTheme == false ? 
            <ThemeLayout 
              onColseTheme={this.onColseTheme} 
              binding={this.state.binding}
              objEditTheme={this.state.objEditTheme}
              onGetThemeList={this.onGetThemeList}
            /> 
            : 
            null
        }
      </div>
    );
  }

  componentWillMount(){
    this.setState({
      binding : getCookie("binding")
    })
  }

  componentDidMount() {
    this.onGetThemeList();
  }

  // 显示新建样式弹出层
  onNewTheme = ()=>{
    this.setState({
      bolNewTheme : false
    })
  }

  // 关闭新建样式弹出层
  onColseTheme = ()=>{
    this.setState({
      bolNewTheme : true
    })
  }

  // 获取编辑主题样式数据，显示新建样式弹出层
  onEditTheme = (event)=>{
    Request(EDITETHEME,this.state.binding,{
      "binding" : this.state.binding,
      "id" : event.target.id
    }).then((data)=>{
      this.setState({
        bolNewTheme : false,
      })
      this.setState({
        objEditTheme : data
      })
    })
  }

  // 删除样式，获取样式列表
  onDeleteTheme = (event)=>{
    Request(DELETETHEME,this.state.binding,{
      "binding" : this.state.binding,
      "id" : event.target.id
    }).then((data)=>{
      this.onGetThemeList();
      if(data.flag == "SUCCESS"){
        message.success("删除样式成功！",2)
      }else{
        message.error("删除样式失败！",2)
      }
    })
  }

  // 获取样式列表
  onGetThemeList = ()=>{
    Request(GETTHEMELIST, this.state.binding,{
      "binding": this.state.binding
    }).then((data) => {
      this.setState({
        objThemeList : data.flag == "SUCCESS" ? data.systemStyle : []
      })
    })
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

export default ThemeContainer;