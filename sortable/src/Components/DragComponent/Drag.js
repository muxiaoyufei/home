import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sortable from 'sortablejs';
import { Request } from '../../utils/Request';
import { COMPONENTLIST, SAVEPAGE, LAYOUTLIST,GETTHEMELIST,PUBLISH } from '../../utils/Api';
import { Icon, Button, Row, Col, Input, Select, Collapse,message } from 'antd';
import CompWrap from './CompWrap';
import $ from 'jquery';
import './index.scss';
import Custom from './Custom'
import TabDrag from  './Tab'

const { TextArea } = Input;
const Option = Select.Option;
const Panel = Collapse.Panel;

class Drag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrComponent: [],
      title: "",
      strTbody: "",
      strSelId: "",
      memo: "",
      bolSetp: true,
      arrSelLayout: [],
      arrThemeList : [],
      strSelectName : "",
      currentIndex : 0,
    }
  }

  dragCompContainer = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let table = componentBackingInstance.getElementsByClassName("containerTable")[0];
      let cloneTable = componentBackingInstance.getElementsByClassName("dataHTML")[0];
      let td = table.getElementsByTagName("td");
      let cloneTd = cloneTable.getElementsByTagName("td");
      let thead = table.getElementsByTagName("thead");
      let cloneThead = cloneTable.getElementsByTagName("thead");
      thead[0].innerHTML = cloneThead[0].innerHTML;
      for (var i = 0; i < cloneTd.length; i++) {
        td[i].setAttribute("coord", cloneTd[i].getAttribute("coord"));
        td[i].setAttribute("colspan", cloneTd[i].getAttribute("colspan"));
        td[i].setAttribute("rowspan", cloneTd[i].getAttribute("rowspan"));
        td[i].setAttribute("style", cloneTd[i].getAttribute("style"));
        td[i].innerHTML = cloneTd[i].innerHTML;
      }

      const comp = $(".containerTable tr td .item");
      for(var i=0; i<comp.length; i++){
        if(comp[i].getAttribute('name') == "custom"){
          ReactDOM.render(
            <Custom />,
            comp[i]
          )
        }else{
          ReactDOM.render(
            CompWrap[comp[i].getAttribute('name')](),
            comp[i]
          )
        }
      } 

      $(".anticon-close").on('click',function(){
        $(this).parent().remove()
      })
      let options = {
        handle : '.group',
      };
      Sortable.create(componentBackingInstance)
    }
  }

  dragCompList = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        draggable: ".item",
        group: {
          name : '.box',
          pull: 'clone',
          put : false
        },
        sort : false,
        animation: 150,
        onEnd : (event)=>{
          if(event.item.getAttribute("name") == "custom"){
            const comp = $(".containerTable tr td .item .wrap");
            for(var i=0; i<comp.length; i++){
              ReactDOM.render(
                <Custom />,
                comp[i]
              )
            } 
          }
          if(event.item.getAttribute("name") == "task"){
            const comp = $(".containerTable tr td .item .task");
            for(var i=0; i<comp.length; i++){
              ReactDOM.render(
                <TabDrag />,
                comp[i]
              )
            } 
          }
        }
      }
      Sortable.create(componentBackingInstance, options)
    }
  }

  dragCompTd = (componentBackingInstance) =>{
    if(componentBackingInstance){
      let option = {
        draggable: ".item",
        group: {
          name : ".box",
          put: true,
        },
        sort : true,
        animation: 150,
      }
      
      Sortable.create(componentBackingInstance, option)
    }
  }

  render() {
    const { arrComponent,arrThemeList } = this.state;

    // 遍历样式设置
    const themeItem = arrThemeList.map((value,index)=>{
      let style = index === this.state.currentIndex ? "1px solid #7ea0ff" : "";
      return(
        <li key={index} id={index} onClick={this.onGetColor.bind(this,index)} style={{border:style}}>
          <ul>
            <li style={{background:value.style.textColor}}></li>
            <li style={{background:value.style.detailColor}}></li>
            <li style={{background:value.style.linkColor}}></li>
            <li style={{background:value.style.operationColor}}></li>
            <li style={{background:value.style.btnTextColor}}></li>
            <li style={{background:value.style.borderColor}}></li>
          </ul>
        </li>
      )
    })

    // 遍历组件列表
    const componentGroup = arrComponent.map((value, index) => {
      return(
        <Panel header={value.groupLabel} key={index}>
          {
            value.component.map((val,ind)=>{
              return (
                <div className="box" ref={this.dragCompList} key={ind}>
                  <div className="item" name={val.name} >
                    {CompWrap[val.name]()}
                  </div>
                </div>
              )
            })
           }
        </Panel>
      )
    })

    return (
      <div>
        {
          this.state.bolSetp == true ?
            <div className="sel-layout">
              <div className="title">
                <h3>选择布局</h3>
                <Icon type="close" onClick={() => this.props.onColseDrag()} />
              </div>
              <div className="drag-input">
                <div className="title"><span>标题</span><Input type="text" onChange={this.onTitle} placeholder="请输入标题" value={this.state.title} /></div>
                <div className="mome"><span>描述</span><TextArea placeholder="请输入描述内容" autosize={{ minRows: 2, maxRows: 2 }} onChange={this.onMome} value={this.state.memo} /></div>
                <div className="select"><span>布局选择</span>
                  <Select placeholder="请选择布局" onChange={this.onSelectLayout} value={this.state.strSelectName}>
                    {
                      this.state.arrSelLayout.map((value, index) => {
                        return (
                          <Option value={value.id} key={index}>{value.label}</Option>
                        )
                      })
                    }
                  </Select>
                </div>
              </div>
              <div className="layout-preview">
                <span>布局预览</span>
                <div dangerouslySetInnerHTML={{ __html: this.state.strTbody }}></div>
              </div>
              <div className="footer">
                <Button type="primary" onClick={this.onNextStep}>下一步</Button>
                <Button onClick={() => this.props.onColseDrag()}>关闭</Button>
              </div>
            </div>
            :
            <div className="container" ref={this.dragCompContainer}>
              <div className="title">
                <h3>自定义组件</h3>
                <Icon type="close" onClick={() => this.props.onColseDrag()} />
              </div>
              <div className="group">
                <div className="componentList box">
                  <Collapse>
                    {componentGroup}
                    <Panel header="样式选择">
                      <ul className="themenList">
                        {themeItem}
                      </ul>
                    </Panel>
                  </Collapse>
                </div>
                <div className="containerDrag">
                  <table className="containerTable">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                      </tr>
                      <tr>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                      </tr>
                      <tr>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                      </tr>
                      <tr>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                        <td className="box" ref={this.dragCompTd}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="dataHTML">
                  <table dangerouslySetInnerHTML={{ __html: this.state.strTbody }}></table>
                </div>
              </div>
              <div className="footer">
                <Button onClick={this.onUpStep}>上一步</Button>
                <Button onClick={this.onPreview}>预览</Button>
                <Button type="primary" onClick={this.onPublish}>发布</Button>
                <Button type="primary" onClick={this.onSaveDrag}>保存</Button>
                <Button onClick={() => this.props.onColseDrag()}>关闭</Button>
              </div>
            </div>
        }
        
      </div>
    );
  }

  // 预览
  onPreview = () =>{
    console.log("goujianyemian>>>",this.props.strListId)
    window.open(`#/disignpreview?id=${this.props.strListId}`,"_blank");
    
    let table = document.getElementsByClassName("containerDrag")[0];
    let cloneTable = document.getElementsByClassName("dataHTML")[0];
    cloneTable.innerHTML = table.innerHTML;

    const item = $(".dataHTML table tr td").find(".item");
    item.each(function(index,value){
      $(this).replaceWith("<comp class='item' name="+value.getAttribute('name')+" id=" + Math.random().toString(36).substr(2) + "></comp>")
    })

    let compId = [];
    for (var i = 0; i < item.length; i++) {
        compId.push(Math.random().toString(36).substr(2));
    }
    // 保存布局与布局里的组件
    Request(SAVEPAGE, this.props.binding,{
      "binding" : this.props.binding,
      "id": this.props.strListId,
      "label": this.state.title,
      "memo": this.state.memo,
      "layout": cloneTable.innerHTML,
      "systemStyle": "",
      "parameters": [],
      "componentIDs": compId,
      "layoutID": this.state.strSelId,
      "layoutName" : this.state.strSelectName
    }).then((data) => {
      if(data.flag == "SUCCESS"){
        message.success("页面保存成功！",2)
      }else{
        message.error("页面保存失败！",2)
      }
      this.setState({
        title : "",
        memo : ""
      })
      this.props.onColseDrag()
      // 保存后 刷新布局列表
      this.props.onGetPageList()
    })
  }

  // 发布
  onPublish = () =>{
    let table = document.getElementsByClassName("containerDrag")[0];
    let cloneTable = document.getElementsByClassName("dataHTML")[0];
    cloneTable.innerHTML = table.innerHTML;

    const item = $(".dataHTML table tr td").find(".item");
    item.each(function(index,value){
      $(this).replaceWith("<comp class='item' name="+value.getAttribute('name')+" id=" + Math.random().toString(36).substr(2) + "></comp>")
    })
    
    const arr = $(".containerTable tr td")
    let compId = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].firstChild) {
        compId.push(Math.random().toString(36).substr(2))
      }
    }
    // 保存布局与布局里的组件
    Request(SAVEPAGE, this.props.binding,{
      "binding" : this.props.binding,
      "id": this.props.strListId,
      "label": this.state.title,
      "memo": this.state.memo,
      "layout": cloneTable.innerHTML,
      "systemStyle": "",
      "parameters": [],
      "componentIDs": compId,
      "layoutID": this.state.strSelId,
      "layoutName":this.state.title
    }).then((data) => {
      if(data.flag == "SUCCESS"){
        message.success("发布保存成功！",2)
        Request(PUBLISH,this.props.binding,{
          binding : this.props.binding,
          id : this.props.strListId
        }).then((data)=>{
          if(data.flag == "SUCCESS"){
            message.success("发布页面成功！",2)
          }else{
            message.error("发布页面失败！",2)
          }
        })
      }else{
        message.error("页面保存失败！",2)
      }
      this.setState({
        title : "",
        memo : ""
      })
      // 保存后 刷新布局列表
      this.props.onGetPageList()
    })
  }

  // 保存按钮点击事件
  onSaveDrag = () => {
    let table = document.getElementsByClassName("containerDrag")[0];
    let cloneTable = document.getElementsByClassName("dataHTML")[0];
    cloneTable.innerHTML = table.innerHTML;

    const item = $(".dataHTML table tr td").find(".item");
    item.each(function(index,value){
      $(this).replaceWith("<comp class='item' name="+value.getAttribute('name')+" id=" + Math.random().toString(36).substr(2) + "></comp>")
    })

    let compId = [];
    for (var i = 0; i < item.length; i++) {
      compId.push(Math.random().toString(36).substr(2));
    }
    // 保存布局与布局里的组件
    Request(SAVEPAGE, this.props.binding,{
      "binding" : this.props.binding,
      "id": this.props.strListId,
      "label": this.state.title,
      "memo": this.state.memo,
      "layout": cloneTable.innerHTML,
      "systemStyle": "",
      "parameters": [],
      "componentIDs": compId,
      "layoutID": this.state.strSelId,
      "layoutName" : this.state.strSelectName
    }).then((data) => {
      if(data.flag == "SUCCESS"){
        message.success("页面保存成功！",2)
      }else{
        message.error("页面保存失败！",2)
      }
      this.setState({
        title : "",
        memo : ""
      })
      // 保存后 刷新布局列表
      this.props.onGetPageList()
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.objEditLayout) {
      this.setState({
        title: nextProps.objEditLayout.label,
        memo: nextProps.objEditLayout.memo,
        strSelId: nextProps.objEditLayout.layoutID,
        strTbody: nextProps.objEditLayout.layout,
        strSelectName : nextProps.objEditLayout.layoutName
      })
    }
  }

  componentDidMount() {
    // 布局列表
    Request(LAYOUTLIST,this.props.binding,{
      "binding" : this.props.binding,
    }).then((data) => {
      this.setState({
        arrSelLayout: data.flag == "SUCCESS" ? data.layoutList : []
      })
    })

    // 组件列表
    Request(COMPONENTLIST,this.props.binding,{
      "binding" : this.props.binding,
    }).then((data) => {
      this.setState({
        arrComponent: data.flag == "SUCCESS" ? data.data : []
      })
    })

    // 样式列表
    Request(GETTHEMELIST,this.props.binding,{
      "binding" : this.props.binding,
    }).then((data) => {
      this.setState({
        arrThemeList: data.flag == "SUCCESS" ? data.systemStyle : []
      })
    })
  }

  // 新建布局与编辑布局 下一步
  onNextStep = () => {
    if(this.state.strSelId !== "" && this.state.title !== ""){
      this.setState({
        bolSetp: false
      })
    }else{
      alert('标题与选择布局不能为空')
    }
  }

  // 新建布局与编辑布局 上一步
  onUpStep = () => {
    this.setState({
      bolSetp: true
    })
  }

  // 新建布局与编辑布局 下拉框
  onSelectLayout = (id) => {
    this.setState({
      strSelId: id,
    })
    this.state.arrSelLayout.map((value, index) => {
      if (id == value.id) {
        console.log(value)
        this.setState({
          strTbody: value.layout,
          strSelectName : value.label
        })
      }
    })
  }

  // 新建布局与编辑布局 标题
  onTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  // 新建布局与编辑布局 描述
  onMome = (e) => {
    this.setState({
      memo: e.target.value
    })
  }

  // 获取指定样式的颜色对象
  onGetColor = (e) => {
    // const current = this.state.arrThemeList[e.target.parentNode.parentNode.id];
    this.setState({
      currentIndex : e
      // strTextColor : current.style.textColor,
      // strDetailedColor : current.style.detailColor,
      // strOperationColor : current.style.operationColor,
      // strLinkColor : current.style.linkColor,
      // strBtnTextColor : current.style.btnTextColor,
      // strBorderColor : current.style.borderColor,
    })
  }
}

export default Drag;
