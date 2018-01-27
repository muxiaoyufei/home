/**
|--------------------------------------------------
| @class 详情页高亮区组件
|--------------------------------------------------
*/
import React, { Component } from 'react';
import { Row, Col, Icon, Modal, Form, Button, Input, Menu, Dropdown, Table, Checkbox } from 'antd';
import { Request } from '../utils/fetch.js';
import { HIGHLIGHT,LOOKUP } from '../utils/Api.jsx';
import './style.css'
const Search = Input.Search;
const SubMenu = Menu.SubMenu;

class HighLight extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      loading: false,
      visible: false,
      holder: '',

      tableColumns: [],
      tableData: [],
      visiblecz: false,//查找
      InputType: "radio",//查找
      czvalue: '',//选择的数据
      inputval: '',//查找是输入的内容
      lookupObj: '005',//点击查找是传递过来
      rowselectid: '',//更改所有人id
      disabledsendemai: false,//是否发送电子邮件
      // ownerobj :{},//更改所有人选择后的值
      heightLight: []
    }
  };

  componentDidMount() {
    Request(HIGHLIGHT + "?binding=" + this.props.binding, {
      "id": this.props.id,
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          heightLight: [],
        })
      }else{
        this.setState({
          heightLight: json.heigthLight,
        })
      } 
    });
  }

  showModal = () => {
    this.setState({ 
      visible: true
    })
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({ 
      visible: false 
    })
  };

  // 保存更改所有人
  handleOkowner = () => {
    var obj = new Object();
    obj.id = this.props.id;
    obj.binding = this.props.binding;
    obj.ownerId = this.state.rowselectid.toString()
    obj.sendEmail = this.state.disabledsendemai
    this.props.handleclickOwner(obj)
    setTimeout(() => {
      this.setState({ visible: false, })
    }, 100);
  }
  handleInputval = (e) => {
    this.setState({
      holder: e.target.value
    })
  }
  showsearchModal = () => {
    this.setState({
      visiblecz:true
    })
    Request( LOOKUP +"?binding=473B16132890EC28E6A564538DCD79E7",{
      "prefix" : '005',
      "pageSize" : "50",
      "page" : "1",
      "keyword" : ''
    }).then((json)=>{
      if(json.flag=="ERROR"){
        this.setState({
          tableData : [],
          tableColumns : []
        })
      }else{
        const head = json.header.map((value,index)=>{
          return{
            "title":value.label,
            "dataIndex" : value.fieldName,
            "key":value.fieldName
          }
        })
        this.setState({
          tableData : json.data,
          tableColumns : head
        })
      } 
    });
  };

  handlesearchOk = () => {
    this.setState({ visiblecz: false })
  }
  // 点击ok确认
  handleOkcz = () => {
    this.setState({
      visiblecz: false
    })
  }
  // 点击取消关闭
  handleCancelcz = () => {
    this.setState({
      visiblecz: false
    })
  }
  // 点击清空是清空
  handleClickQK = () => {
    // czvalue为传递给input框的值，点击清空是清0
    this.setState({
      czvalue: "",
      visiblecz: false,//关闭模态框（可选为不关闭）
      holder: '',
    })
  }
  // 点击搜索是搜索输入的内容
  handleClickSearch = () => {
    // Request(_lookup+"?binding="+this.props.binding,{
    //   "prefix" : this.state.lookupObj,
    //   "pageSize" : "50",
    //   "page" : "1",
    //   "keyword" : this.state.inputval
    // }).then((json)=>{
    //   const head = json.header.map((value,index)=>{
    //           return{
    //             "title":value.label,
    //             "dataIndex" : value.fieldName,
    //             "key":value.fieldName
    //           }
    //         })
    //         this.setState({
    //           tableData : json.data,
    //           tableColumns : head
    //         })
    // });
  }
  // 搜索input输入的内容
  handleInput = (e) => {
    this.setState({
      inputval: e.target.value
    })
  }
  // checkbox是否发送电子邮件
  onChangesendemail = (e) => {
    this.setState({
      disabledsendemai: e.target.checked
    })
  }
  render() {
    const { visible, loading } = this.state;
    const heightLight = this.state.heightLight.map((item, index) => {
      // Col span={3}与类名lightingShow
      if (item.fieldName != "ownerid") {
        return(
          <Col className="lightingShow" key={index}>
            <p>{item.fieldLabel}</p>
            <a href="#">{item.fieldValue}</a>
          </Col>
        )
      } else {
        return(
          <Col className="lightingShow" key={index}>
            <p>{item.fieldLabel}</p>
            <a href="javascript:void(0)" onClick={this.showModal}>{item.fieldValue}<Icon type="user" /></a>
          </Col>
        )
      }
    })

    // 查找模态框内容
    var rowselect, rowselectid;
    const rowSelection = {
      type: this.state.InputType,
      onChange: (selectedRowKeys, selectedRows) => {
        rowselect = selectedRows.map((value, index) => {
          return value.name;
        })
        rowselectid = selectedRows.map((value, index) => {
          return value.id;
        })
        this.setState({
          czvalue: rowselect,
          holder: rowselect,
          rowselectid: rowselectid,
        })
      },
    };
    return (
      <div className="body-show" >
        <Row>
          {heightLight}
        </Row>

          <Modal className="Lant-modal Lant-modals"
            title="更改所有人"
            height="300px"
            visible={this.state.visible}
            onCancel={this.handleCancel}
          >
          <Form>
              <Row style={{padding:'20px 0 0 20px'}}>
                <Col span={3} style={{textAlign:'right',paddingRight:'10px',fontSize:'16px'}}>所有人</Col>
                <Col span={18}>
                  <Input
                    value={this.state.holder}
                    style={{ width: 300 }}
                  /> <a onClick={this.showsearchModal}>[查找]</a>
                </Col>
              </Row>
              <Row style={{padding:'10px 0 0 20px'}}>
                <Col span={3}></Col>
                <Col span={20} style={{fontSize:'16px'}}><Checkbox onChange={this.onChangesendemail} > 发送电子邮件</Checkbox></Col>
              </Row>
            <div className="base-info" style={{height:'45px'}}></div>
            {/*
              <div className="base_btn" >
                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>
                <Button key="submit" type="primary" htmlType="submit" size="large" loading={loading}  onClick={this.handleOkowner}>
                  确认
                </Button>
              </div>
            */}
          </Form>
        </Modal>

        <Modal className="Lant-modal Lant-modals"
            title="请选择值内容"
            visible={this.state.visiblecz}
            onOk={this.handleOkcz}
            onCancel={this.handleCancelcz}
            okText="确定"
            cancelText="取消"
            width="800px"
            height="600px"
            className="search-component"
          >
          <div style={{marginLeft:'10px'}}>
            <Row>
              <Col span={6}><Input onInput={this.handleInput}/></Col>
              <Col span={12}><Button onClick={this.handleClickSearch} style={{marginLeft:"10px",marginRight:"10px"}}>搜索</Button><Button onClick={this.handleClickQK}>清空</Button></Col>
            </Row>
          </div>
          <Table rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.state.tableData} pagination={{ pageSize: 50 }} scroll={{ y: 320 }}/>
        </Modal>
      </div>
    )
  }
};

export default HighLight;