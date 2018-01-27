/**
|--------------------------------------------------
| @class 组件拖拽
|--------------------------------------------------
*/

import React, { Component } from 'react';
import {Row,Col,Breadcrumb,Icon,Layout,Button,message} from 'antd';
import DragComponent from './DragComponent/Drag';
import { GETPAGELIST,GETPAGE,DELTEPAGE,COPYPAGE } from '../utils/Api';
import { Request } from '../utils/Request';

const { Content } = Layout;

class ListLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      bolShowDrag : true,
      bolEditDrag : true,
      binding: "E1183D212999D6E776D0AB12E7240C3D",
      arrList : [],
      objEditLayout : {},
      strListId : ""
    }
    this.onShowDrag = this.onShowDrag.bind(this)
    this.onEditDrag = this.onEditDrag.bind(this)
    this.onDeleteDrag = this.onDeleteDrag.bind(this)
    this.onCopyDrag = this.onCopyDrag.bind(this)
  }

  render() {
    // 遍历页面列表
    const list = this.state.arrList.map((value,index)=>{
      return(
        <li key={value.id}>
          <Row>
            <Col span={24}>
              <Col span={8}>{value.label}</Col>
              <Col span={12}>{value.memo}</Col>
              <Col span={4} style={{textAlign:"right"}}>
                <a href="javascript:void(0)" id={value.id} onClick={this.onEditDrag}>编辑</a>
                <a href="javascript:void(0)" id={value.id} name={value.label} onClick={this.onCopyDrag} style={{margin:"0 20px"}}>复制</a>
                <a href="javascript:void(0)" id={value.id} onClick={this.onDeleteDrag}>删除</a>
              </Col>
            </Col>
          </Row>
        </li>
      )
    })

    return (
      <div style={{width:"100%"}}>
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
              <Button type="primary" onClick={this.onShowDrag} >新建</Button>
            </Col>
          </Row>
          <Row className="layout-body-container">
            <ul className="listlayout-container">
              {list}
            </ul>
          </Row>
        </Content>
        {
          this.state.bolShowDrag == false ? 
            <DragComponent 
              onColseDrag={this.onColseDrag} 
              binding={this.state.binding}
              objEditLayout={this.state.objEditLayout}
              onGetPageList={this.onGetPageList}
              strListId={this.state.strListId}
            /> 
            : 
            null
        }
      </div>
    );
  }

  componentWillMount(){
    // this.setState({
    //   binding : getCookie("binding")
    // })
  }

  componentDidMount() {
    this.onGetPageList()
  }

  //获取页面数据
  onGetPageList = ()=>{
    Request(GETPAGELIST,this.state.binding,{
      "binding" : this.state.binding,
      "parttern" : "design"
    }).then((data)=>{
        this.setState({
          arrList : data.flag == "SUCCESS" ? data.layoutObject : []
        })
    })
  }
  //显示新建组件拖拽弹出框
  onShowDrag = ()=>{
    this.setState({
      bolShowDrag : false,
      strListId : randomString(16),
    })
  }

  //显示编辑组件拖拽弹出框
  onEditDrag = (value)=>{
    this.setState({
      bolShowDrag : false,
      strListId : value.target.id
    })

    // 获取编辑布局数据
    Request(GETPAGE,this.state.binding,{
      "binding" : this.state.binding,
      "id":value.target.id,
      "parttern":"design"
    }).then((data)=>{
      console.log(data)
      this.setState({
        objEditLayout : data
      })
    })
  }

  //关闭组件拖拽弹出框
  onColseDrag = ()=>{
    this.setState({
      bolShowDrag : true,
      bolEditDrag : true
    })
  }

  // 复制布局
  onCopyDrag = (value) =>{
    Request(COPYPAGE,this.state.binding,{
      id : value.target.id,
      name : value.target.name + "-副本"
    }).then((data)=>{
      console.log(data)
      if(data.flag == "SUCCESS"){
        message.success("复制成功",2)
        this.onGetPageList();
      }else{
        message.error("复制失败",2)
      }
    })
  }

  // 删除布局
  onDeleteDrag = (value) =>{
    Request(DELTEPAGE,this.state.binding,{
      id : value.target.id
    }).then((data)=>{
      if(data.flag == "SUCCESS"){
        message.success("删除页面成功！",2)
        this.onGetPageList();
      }else{
        message.error("删除页面失败！",2)
      }
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

// 发布，生成随机id
function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (let i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
  }

export default ListLayout;