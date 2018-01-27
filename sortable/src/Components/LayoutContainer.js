/**
|--------------------------------------------------
| @class 布局列表组件
|--------------------------------------------------
*/

import React, { Component } from 'react';
import NewLayout from './LayoutComponent/NewLayout';
import EditLayout from './LayoutComponent/EditLayout';
import { Request } from '../utils/Request';
import { LAYOUTLIST, DELETELAYOUT, GETLAYOUTSETTING } from '../utils/Api';
import { Modal, Button, Layout, Icon, Row, Col, Card, Breadcrumb, Radio,message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const ButtonGroup = Button.Group;

class LayoutContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      binding: "",
      bolNewModal: false,
      bolEditModal: false,
      arrLayoutData: [],
      objDataLayout: {},
      objEditLayout: {}
    }
    this.editLayout = this.editLayout.bind(this)
    this.deleteLayout = this.deleteLayout.bind(this)
  }

  render() {
    // 布局列表
    let layoutList = this.state.arrLayoutData.map((value, index) => {
      return (
        <Col className="layout-body-main" span={6} key={value.id}>
          <Card title={value.label} bordered={false}>
            <Icon id={value.id} type="edit" title="编辑布局" onClick={this.editLayout} />
            <Icon id={value.id} type="close" title="删除布局" onClick={this.deleteLayout} />
            <table dangerouslySetInnerHTML={{ __html: value.layout }}></table>
          </Card>
        </Col>
      )
    })
    return (
      <div style={{ width: "100%" }}>
        <Content>
          <Row className="bread-layout">
            <Col span={20}>
              <Breadcrumb>
                <Breadcrumb.Item href=""><Icon type="home" /></Breadcrumb.Item>
                <Breadcrumb.Item href=""><span>页面布局</span></Breadcrumb.Item>
                <Breadcrumb.Item>布局列表</Breadcrumb.Item>
              </Breadcrumb>
            </Col>

            <Col span={4} style={{ textAlign: "right" }}>
              <ButtonGroup>
                <Button type="primary" onClick={this.openModal}>新建布局</Button>
                <Button>上传布局</Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row className="layout-body-container">
            {layoutList}
          </Row>
        </Content>

        <Modal
          title="自定义布局"
          style={{ top: 50 }}
          className="layoutModal"
          width="900px"
          visible={this.state.bolNewModal}
          onCancel={this.onLayoutCancel}
          footer={null}
        >
          <NewLayout
            binding={this.state.binding}
            onLayoutCancel={this.onLayoutCancel}
            onLayoutSave={this.onLayoutSave}
            getLayoutList={this.getLayoutList}
            objDataLayout={this.state.objDataLayout}
          />
        </Modal>

        <Modal
          title="编辑布局"
          style={{ top: 50 }}
          width="900px"
          className="layoutModal"
          visible={this.state.bolEditModal}
          onCancel={this.onLayoutCancel}
          footer={null}
        >
          <EditLayout
            binding={this.state.binding}
            objEditLayout={this.state.objEditLayout}
            onLayoutCancel={this.onLayoutCancel}
            onLayoutSave={this.onLayoutSave}
            getLayoutList={this.getLayoutList}
          />
        </Modal>
      </div>
    );
  }

  componentWillMount() {
    this.setState({
      binding: getCookie("binding")
    })
  }

  componentDidMount() {
    this.getLayoutList();
  }

  // 关闭新建布局模态框
  onLayoutCancel = () => {
    this.setState({
      bolNewModal: false,
      bolEditModal: false
    })
  }

  // 保存新建布局，标题和表述
  onLayoutSave = () => {
    this.setState({
      bolNewModal: false,
    })
  }

  // 显示新建布局模态框
  openModal = () => {
    this.setState({
      bolNewModal: true,
      objDataLayout: {}
    })
  }

  //获取布局列表
  getLayoutList = () => {
    Request(LAYOUTLIST, this.state.binding, {
      "binding": this.state.binding
    }).then((data) => {
      this.setState({
        arrLayoutData: data.flag == "SUCCESS" ? data.layoutList : []
      })
    })
  }

  //删除布局
  deleteLayout = (value) => {
    Request(DELETELAYOUT, this.state.binding, {
      "binding": this.state.binding,
      "id": value.target.id
    }).then((data) => {
      if(data.flag == "SUCCESS"){
        message.success("删除页面成功！",2)
      }else{
        message.error("删除页面失败！",2)
      }
      this.getLayoutList();
    })
  }

  //编辑布局
  editLayout = (value) => {
    this.setState({
      bolEditModal: true
    })
    Request(GETLAYOUTSETTING, this.state.binding, {
      "binding": this.state.binding,
      "id": value.target.id
    }).then((data) => {
      console.log(data)
      this.setState({
        objEditLayout: data
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

export default LayoutContainer;