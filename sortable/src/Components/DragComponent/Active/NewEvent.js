/**
 * 新建事件.
 */
import React, { Component } from 'react';
import { Input, DatePicker, Select, Button, Row, Col, Form, Icon, Checkbox, message, Modal, Table } from 'antd';
import { Request } from '../utils/fetch.js';
import { LOOKUP } from '../utils/Api.jsx';
import './active.css';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

const { TextArea } = Input;


class NewEvents extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      size: 'large',
      newevent: [],
      // 查找
      selectedRowKeysr: [],
      valuer: [],
      tableColumnsr: [],
      tableDatar: [],
      visibler: false,
      currentRecordtyper: '',
      recordtypesr: [],
      visibleczr: false,//查找
      rr: "radio",//查找
      czvaluer: '',//选择的数据
      inputvalr: '',//查找是输入的内容
      lookupObjr: '005',//点击查找是传递过来
      rowselectidr: '',
      tablePageczr: '',
      // 名称
      selectedRowKeys: [],
      value: [],
      tableColumns: [],
      tableData: [],
      visible: false,
      currentRecordtype: '',
      recordtypes: [],
      visiblecz: false,//查找
      InputType: "radio",//查找
      czvalue: '',//选择的数据
      inputval: '',//查找是输入的内容
      lookupObj: '003',//点击查找是传递过来
      rowselectid: '',
      fieldId: '',
      fieldname: '',
      tablePagecz: '',
      // 相关项
      visiblecorr: false,
      lookupObjcorrelation: '011',
      czvaluecorrelation: '',
      tableDatacorr: [],
      tableColumnscorr: [],
      fieldIdcorr: '',
      fieldnamecorr: "",
      inputvalcorr: '',
      czvaluecorr: '',
      rowselectidcorr: '',
      tablePagecorr: '',
    }
  }
  componentDidMount() {
    this.setState({
      newevent: [
        {
          "left": {
            "fined": "themeevent",
            "name": "主题",
            "type": "F",
            "edit": true,
            "required": true,
            "data": [
            ]
          },
          "right": {
            "fined": "distributionevent",
            "data": [
              {
                "id": "",
                "value": ""
              }
            ],
            "value": "",
            "edit": true,
            "helpText": "",
            "name": "被分配人",
            "required": true,
            "fieldId": "ffe20169A69127EbjAJZ",
            "type": "Y",
            "lookupObj": "005"
          }
        },
        {
          "left": {
            "fined": "namee",
            "name": "名称",
            "label": "名称event",
            "type": "F",
            "required": false,
            "edit": true
          },
          "right": {
            "fined": "relatede",
            "name": "相关项",
            "label": "相关项event",
            "type": "F",
            "required": false,
            "edit": true
          }
        },
        {
          "left": {
            "fined": "startTimeevent",
            "name": "开始日期",
            "type": "D",
            "required": true,
            "edit": true
          },
          "right": {
            "fined": "endTimeevent",
            "name": "结束日期",
            "type": "D",
            "required": true,
            "edit": true
          }
        },
        {
          "left": {
            "name": "",
            "type": ""
          },
          "right": {
            "fined": "stateevent",
            "name": "状态",
            "type": "S",
            "edit": true,
            "required": true,
            "data": [
              {
                "id": "1",
                "value": "未开始"
              },
              {
                "id": "2",
                "value": "进行中"
              },
              {
                "id": "3",
                "value": "已结束"
              }
            ]
          }
        }
      ]
    })

  }
  // ----------------------------------------
  // 查找相关项
  handleChangecorrelation = (value) => {
    this.setState({
      lookupObjcorrelation: value,
      czvaluecorrelation: '',
    })
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": value,
      "pageSize": "1000",
      "page": "1",
      "keyword": ''
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableDatacorr: [],
          tableColumnscorr: [],
          tablePagecorr: ''
        })
      }else{
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableDatacorr: json.data,
          tableColumnscorr: head,
          tablePagecorr: json.totalCount
        })
      }
    });
  }
  clickShowModalcorrelation = (id, name) => {
    this.setState({
      visiblecorr: true,
      fieldIdcorr: id,
      fieldnamecorr: name,
    });
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": this.state.lookupObjcorrelation,
      "pageSize": "1000",
      "page": "1",
      "keyword": ''
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableDatacorr: [],
          tableColumnscorr: [],
          tablePagecorr: ''
        })
      }else{
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableDatacorr: json.data,
          tableColumnscorr: head,
          tablePagecorr: json.totalCount
        })
      }
    });
  }
  // 点击ok确认
  handleOkcorr = () => {
    this.setState({
      visiblecorr: false,
      czvaluecorr: '',
      rowselectidcorr: '',
    })
  }
  // 点击取消关闭
  handleCancelcorr = () => {
    this.setState({
      visiblecorr: false,
      czvaluecorr: '',
      rowselectidcorr: '',
    })
  }
  // 搜索input输入的内容
  handleInputcorr = (e) => {
    this.setState({
      inputvalcorr: e.target.value
    })
  }
  // 点击搜索是搜索输入的内容
  handleClickSearchcorr = () => {
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": this.state.lookupObjcorrelation,
      "pageSize": "1000",
      "page": "1",
      "keyword": this.state.inputvalcorr
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableDatacorr: [],
          tableColumnscorr: [],
          tablePagecorr: ''
        })
      }else{
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableDatacorr: json.data,
          tableColumnscorr: head,
          tablePagecorr: json.totalCount
        })
      }
    });
  }
  // 点击清空是清空
  handleClickcorr = () => {
    // czvalue为传递给input框的值，点击清空是清0
    this.setState({
      czvaluecorrelation: "",
      visiblecorr: false,//关闭模态框（可选为不关闭）
    })
  }
  // -----------------------------------
  // 查找弹出模态框并请求查找数据
  clickShowModalr = (type) => {
    this.setState({
      visibleczr: true,
      // lookupObj:lookupObj,
    });
    if (type == "Y" || type == "M") {
      this.setState({
        InputTyper: "radio",
      });
    }
    if (type == "MR") {
      this.setState({
        InputType: "",
      });
    }
    fetch(LOOKUP + "?binding=" + this.props.binding, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "prefix": '005',
        "pageSize": "1000",
        "page": "1",
        "keyword": ''
      })
    }).then((response) => response.json())
      .then((json) => {
        if(json.flag=="ERROR"){
          this.setState({
            tableDatar: [],
            tableColumnsr:[],
            tablePageczr: '',
          })
        }else{
          const head = json.header.map((value, index) => {
            return {
              "title": value.label,
              "dataIndex": value.fieldName,
              "key": value.fieldName
            }
          })
          this.setState({
            tableDatar: json.data,
            tableColumnsr: head,
            tablePageczr: json.totalCount,
          })
        } 
      }).catch((err) => {
      });
  }
  // 点击ok确认
  handleOkczr = () => {
    this.setState({
      visibleczr: false
    })
  }
  // 点击取消关闭
  handleCancelczr = () => {
    this.setState({
      visibleczr: false
    })
  }
  // 点击清空是清空
  handleClickQKr = () => {
    // czvalue为传递给input框的值，点击清空是清0
    this.setState({
      czvaluer: "",
      visibleczr: false,//关闭模态框（可选为不关闭）
    })
  }
  // 点击搜索是搜索输入的内容
  handleClickSearchr = () => {
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": this.state.lookupObj,
      "pageSize": "1000",
      "page": "1",
      "keyword": this.state.inputval
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableDatar: [],
          tableColumnsr: [],
          tablePageczr: '',
        })
      }else{
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableDatar: json.data,
          tableColumnsr: head,
          tablePageczr: json.totalCount,
        })
      } 
    });

  }
  // 搜索input输入的内容
  handleInputr = (e) => {
    this.setState({
      inputvalr: e.target.value
    })
  }
  // 查找相关项 
  handleChange = (value) => {
    this.setState({
      lookupObj: `${value}`,
      czvalue: '',
    })
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": this.state.lookupObj,
      "pageSize": "1000",
      "page": "1",
      "keyword": ''
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableData: [],
          tableColumns: [],
          tablePagecz:'',
        })
      }else{
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableData: json.data,
          tableColumns: head,
          tablePagecz: json.totalCount,
        })
      }
    });
  }
  // 查找名称弹出模态框并请求查找数据
  clickShowModal = (id, name) => {
    this.setState({
      visiblecz: true,
      fieldId: id,
      fieldname: name,
    });
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": this.state.lookupObj,
      "pageSize": "1000",
      "page": "1",
      "keyword": ''
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableData: [],
          tableColumns:[],
          tablePagecz: '',
        })
      }else{
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableData: json.data,
          tableColumns: head,
          tablePagecz: json.totalCount,
        })
      }  
    });
  }
  // 点击ok确认
  handleOkcz = () => {
    this.setState({
      visiblecz: false,
      czvalue: '',
      rowselectid: '',
    })
  }
  // 点击取消关闭
  handleCancelcz = () => {
    this.setState({
      visiblecz: false,
      czvalue: '',
      rowselectid: '',
    })
  }
  // 点击清空是清空
  handleClickQK = () => {
    // czvalue为传递给input框的值，点击清空是清0
    this.setState({
      czvalue: "",
      visiblecz: false,//关闭模态框（可选为不关闭）
    })
  }
  // 点击搜索是搜索输入的内容
  handleClickSearch = () => {
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": this.state.lookupObj,
      "pageSize": "1000",
      "page": "1",
      "keyword": this.state.inputval
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableData: [],
          tableColumns: [],
          tablePagecz: '',
        })
      }else{
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableData: json.data,
          tableColumns: head,
          tablePagecz: json.totalCount,
        })
      }  
    });
  }
  // 搜索input输入的内容
  handleInput = (e) => {
    this.setState({
      inputval: e.target.value
    })
  }
  handleClickClear = (data, value, required, e) => {
    e.preventDefault();
    data.distributionevent = value
    required.map((item, index) => {
      for (var key in data) {
        if (key == item) {
          if (data[key] == undefined || data[key] == '') {
            document.getElementsByClassName(item)[0].style.display = 'block'
          } else {
            document.getElementsByClassName(item)[0].style.display = 'none'
          }
        }
      }
    })

    if (data.themeevent != undefined && data.startTimeevent != undefined && data.endTimeevent != undefined && data.distributionevent != undefined && data.stateevent != undefined) {
      this.props.handleSubmitsj(data, value)
      this.props.form.resetFields()
      this.setState({
        czvaluer: '',
        rowselectidr: '',
      })
    }
  }
  handleInputfoucs = () => {

  }
  render() {
    var required = [];
    const options = this.props.correlation.map((item, index) => {
      return (
        <Option value={item.prefix} key={index}>{item.label}</Option>
      )
    })
    const optionwhoid = this.props.whoObjs.map((item, index) => {
      return (
        <Option value={item.prefix} key={index}>{item.label}</Option>
      )
    })
    const { getFieldProps } = this.props.form;
    const forsc = this.props.forsc
    const data = this.state.newevent.map((item, index) => {
      const ltype = item.left.type
      const rtype = item.right.type
      const Lrequire = item.left.required
      const Rrequire = item.right.required
      var lcont, rcont;
      if (ltype == 'S') {
        var data = item.left.data.map((items, index) => {
          return (
            <Option value={items.value} key={index}>{items.value}</Option>
          )
        })
        if (Lrequire) {
          required.push(item.left.fined)
        }
        lcont = <InputGroup compact className="sel">
          <Select style={{ width: '100%' }} placeholder={item.left.value} {...getFieldProps(item.left.fined) }>
            {data}
          </Select>
        </InputGroup>
      }
      if (rtype == 'S') {
        var data = item.right.data.map((items, index) => {
          return (
            <Option value={items.value} key={index}>{items.value}</Option>
          )
        })
        if (Rrequire) {
          required.push(item.right.fined)
        }
        rcont = <InputGroup compact className="sel">
          <Select style={{ width: '100%' }} placeholder={item.right.value} {...getFieldProps(item.right.fined) }>
            {data}
          </Select>
        </InputGroup>
      }
      if (ltype == 'Y' || ltype == 'M') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        lcont = <div style={{ position: 'relative' }}>
          <Input placeholder={item.left.data[0].value} value={this.state.czvaluer} onFocus={this.handleInputfoucs} />
          <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalr.bind(this, ltype)}>[查找]</a>
        </div>
      }
      if (rtype == 'Y' || rtype == 'M') {
        if (Rrequire) {
          required.push(item.right.fined)
        }
        rcont = <div style={{ position: 'relative' }}>
          <Input placeholder={item.right.data[0].value} value={this.state.czvaluer} onFocus={this.handleInputfoucs} />
          <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalr.bind(this, rtype)} >[查找]</a>
        </div>
      }

      if (ltype == 'F') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        if (item.left.fined == "relatede") {
          lcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChangecorrelation} defaultValue='报价单'>
              {options}
            </Select>
            <Input placeholder={item.left.value} style={{ width: '75%' }} id={item.left.fined} />
            <Input style={{ width: '75%' }} id={item.left.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalcorrelation.bind(this, item.left.fined, item.left.label)}>[查找]</a>
          </div>
        } else if (item.left.fined == "namee") {
          lcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChange} defaultValue="003">
              {optionwhoid}
            </Select>
            <Input placeholder={item.left.value} style={{ width: '75%' }} id={item.left.fined} />
            <Input style={{ width: '75%' }} id={item.left.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, item.left.fined, item.left.label)}>[查找]</a>
          </div>
        } else {
          lcont = <Input placeholder={item.left.value} style={{ width: '100%' }}  {...getFieldProps(item.left.fined) } />
        }
      }
      if (rtype == 'F') {
        if (Rrequire) {
          required.push(item.right.fined)
        }
        if (item.right.fined == "relatede") {
          rcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChangecorrelation} defaultValue='报价单'>
              {options}
            </Select>
            <Input placeholder={item.right.value} style={{ width: '75%' }} id={item.right.fined} />
            <Input style={{ width: '75%' }} id={item.right.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalcorrelation.bind(this, item.right.fined, item.right.label)}>[查找]</a>
          </div>
        } else if (item.right.fined == "namee") {
          rcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChange} defaultValue="003">
              {optionwhoid}
            </Select>
            <Input placeholder={item.right.value} style={{ width: '75%' }} id={item.right.fined} />
            <Input style={{ width: '75%' }} id={item.right.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, item.right.fined, item.right.label)}>[查找]</a>
          </div>
        } else {
          rcont = <Input placeholder={item.right.value} ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined) } />
        }
      }
      if (ltype == 'D') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        const dateFormat = 'YYYY/MM/DD';
        lcont = <InputGroup compact>
          <DatePicker style={{ width: '100%' }} defaultValue={moment(item.left.value, dateFormat)} format={dateFormat} key={item.left.name} {...getFieldProps(item.left.fined) } />
        </InputGroup>
      }
      if (rtype == 'D') {
        if (Rrequire) {
          required.push(item.right.fined)
        }
        const dateFormat = 'YYYY/MM/DD';
        rcont = <InputGroup compact>
          <DatePicker style={{ width: '100%' }} defaultValue={moment(item.right.value, dateFormat)} format={dateFormat} key={item.right.name} {...getFieldProps(item.right.fined) } />
        </InputGroup>
      }
      return (
        <Row key={index}>
          <Col span={10}>
            <FormItem >
              {
                <div className="box">
                  <div className="sub">
                    {item.left.required ? <Icon type="star" className="iconReqire" /> : ''}
                    <span>{item.left.name}</span>
                    {item.left.required ? <span className={item.left.fined} style={{ display: 'none', float: 'right' }}> <i style={{ color: 'red', fontSize: 8 }}>&nbsp;  请输入{item.left.name}！</i></span> : ''}
                  </div>
                  <div className="main mains">
                    {lcont}
                  </div>
                </div>
              }
            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={10} >
            <FormItem>
              {
                <div className="box">
                  <div className="sub">
                    {item.right.required ? <Icon type="star" className="iconReqire" /> : ''}
                    <span>{item.right.name}</span>
                    {item.right.required ? <span className={item.right.fined} style={{ display: 'none', float: 'right' }}> <i style={{ color: 'red', fontSize: 8 }}>&nbsp;  请输入{item.right.name}！</i></span> : ''}
                  </div>
                  <div className="main mains">
                    {rcont}
                  </div>
                </div>
              }
            </FormItem>
          </Col>
        </Row>
      )
    })
    const datas = this.state.newevent.map((item, index) => {
      const ltype = item.left.type
      const rtype = item.right.type
      const Lrequire = item.left.required
      const Rrequire = item.right.required
      var lcont, rcont;
      if (ltype == 'S') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        var data = item.left.data.map((items, index) => {
          return (
            <Option value={items.value} key={index}>{items.value}</Option>
          )
        })
        lcont = <InputGroup compact className="sel">
          <Select style={{ width: '100%' }}  {...getFieldProps(item.left.fined) }>
            {data}
          </Select>
        </InputGroup>
      }
      if (rtype == 'S') {
        if (Rrequire) {
          required.push(item.right.fined)
        }
        var data = item.right.data.map((items, index) => {
          return (
            <Option value={items.value} key={index}>{items.value}</Option>
          )
        })
        rcont = <InputGroup compact className="sel">
          <Select style={{ width: '100%' }}  {...getFieldProps(item.right.fined) }>
            {data}
          </Select>
        </InputGroup>
      }
      if (ltype == 'Y' || ltype == 'M') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        lcont = <div style={{ position: 'relative' }}>
          <Input placeholder={item.left.data[0].value} value={this.state.czvaluer} />
          <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalr.bind(this, ltype)}>[查找]</a>
        </div>
      }
      if (rtype == 'Y' || rtype == 'M') {
        if (Rrequire) {
          required.push(item.right.fined)
        }
        rcont = <div style={{ position: 'relative' }}>
          <Input placeholder={item.right.data[0].value} value={this.state.czvaluer} />
          <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalr.bind(this, rtype)} >[查找]</a>
        </div>
      }

      if (ltype == 'F') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        if (item.left.fined == "relatede") {
          lcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChangecorrelation} defaultValue='报价单'>
              {options}
            </Select>
            <Input placeholder={item.left.value} style={{ width: '75%' }} id={item.left.fined} />
            <Input style={{ width: '75%' }} id={item.left.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalcorrelation.bind(this, item.left.fined, item.left.label)}>[查找]</a>
          </div>
        } else if (item.left.fined == "namee") {
          lcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChange} defaultValue="003">
              <Option value={'003'} >联系人</Option>
              <Option value={'004'} >潜在客户</Option>
            </Select>
            <Input placeholder={item.left.value} style={{ width: '75%' }} id={item.left.fined} />
            <Input style={{ width: '75%' }} id={item.left.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, item.left.fined, item.left.label)}>[查找]</a>
          </div>
        } else {
          lcont = <Input placeholder={item.left.value} style={{ width: '100%' }} key={item.left.fined} {...getFieldProps(item.left.fined) } />
        }
      }
      if (rtype == 'F') {
        if (Rrequire) {
          required.push(item.right.fined)
        }
        if (item.right.fined == "relatede") {
          rcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChangecorrelation} defaultValue='报价单'>
              {options}
            </Select>
            <Input placeholder={item.right.value} style={{ width: '75%' }} id={item.right.fined} />
            <Input style={{ width: '75%' }} id={item.right.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalcorrelation.bind(this, item.right.fined, item.right.label)}>[查找]</a>
          </div>
        } else if (item.right.fined == "namee") {
          rcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChange} defaultValue="003">
              <Option value={'003'} >联系人</Option>
              <Option value={'004'} >潜在客户</Option>
            </Select>
            <Input placeholder={item.right.value} style={{ width: '75%' }} id={item.right.fined} />
            <Input style={{ width: '75%' }} id={item.right.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, item.right.fined, item.right.label)}>[查找]</a>
          </div>
        } else {
          rcont = <Input placeholder={item.right.value} ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined) } />
        }
      }

      if (ltype == 'D') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        const dateFormat = 'YYYY/MM/DD';
        lcont = <InputGroup compact>
          <DatePicker style={{ width: '100%' }} format={dateFormat} key={item.left.name} {...getFieldProps(item.left.fined) } />
        </InputGroup>
      }
      if (rtype == 'D') {
        if (Rrequire) {
          required.push(item.right.fined)
        }
        const dateFormat = 'YYYY/MM/DD';
        rcont = <InputGroup compact>
          <DatePicker style={{ width: '100%' }} format={dateFormat} key={item.right.name} {...getFieldProps(item.right.fined) } />
        </InputGroup>
      }
      return (
        <Row key={index}>
          <Col span={24}>
            <FormItem >
              {
                <div className="box">
                  <div className="sub">
                    {item.left.required ? <Icon type="star" style={{ color: 'red', fontSize: 8 }} /> : ''}
                    <span> {item.left.name}</span>
                    {item.left.required ? <span className={item.left.fined} style={{ display: 'none', float: 'right' }}> <i style={{ color: 'red', fontSize: 8 }}>&nbsp;  请输入{item.left.name}！</i></span> : ''}
                  </div>
                  <div className="main mains">
                    {lcont}
                  </div>
                </div>
              }
            </FormItem>
          </Col>
          <Col span={24} >
            <FormItem>
              {
                <div className="box">
                  <div className="sub">
                    {item.right.required ? <Icon type="star" style={{ color: 'red', fontSize: 8 }} /> : ''}
                    <span>{item.right.name}</span>
                    {item.right.required ? <span className={item.right.fined} style={{ display: 'none', float: 'right' }}> <i style={{ color: 'red', fontSize: 8 }}>&nbsp;  请输入{item.right.name}！</i></span> : ''}
                  </div>
                  <div className="main mains">
                    {rcont}
                  </div>
                </div>
              }
            </FormItem>
          </Col>
        </Row>
      )
    })

    // 查找模态框内容
    var rowselectr, rowselectidr;
    const rowSelectionr = {
      type: this.state.InputTyper,
      onChange: (selectedRowKeys, selectedRows) => {
        rowselectr = selectedRows.map((value, index) => {
          return value.name;
        })
        rowselectidr = selectedRows.map((value, index) => {
          return value.id;
        })
        this.setState({
          czvaluer: rowselectr,
          rowselectidr: rowselectidr,
        })

      },
    };
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
        var fieldId = this.state.fieldId;
        var fieldname = this.state.fieldname;
        document.getElementById(fieldId).value = rowselect
        document.getElementById(fieldname).value = rowselectid
        this.setState({
          czvalue: rowselect,
          rowselectid: rowselectid,
        })
      },
    };
    // 查找模态框内容
    var rowselectcorr, rowselectidcorr;
    const rowSelectioncorr = {
      type: this.state.InputType,
      onChange: (selectedRowKeys, selectedRows) => {
        rowselectcorr = selectedRows.map((value, index) => {
          return value.name;
        })
        rowselectidcorr = selectedRows.map((value, index) => {
          return value.id;
        })
        var fieldId = this.state.fieldIdcorr;
        var fieldname = this.state.fieldnamecorr;
        document.getElementById(fieldId).value = rowselectcorr
        document.getElementById(fieldname).value = rowselectidcorr
        this.setState({
          czvaluecorr: rowselectcorr,
          rowselectidcorr: rowselectidcorr,
        })
      },
    };
    return (
      <div className="active">
        <Form onSubmit={this.handleClickClear.bind(this, this.props.form.getFieldsValue(), this.state.rowselectidr, required)} className="login-form">
          {forsc == 'full' ? data : datas}
          <div className="btn">
            <Button type="primary" htmlType="submit" size={this.state.size} >保存</Button>
          </div>
        </Form>
        <Modal
          title="请选择值内容"
          visible={this.state.visiblecorr}
          onOk={this.handleOkcorr}
          onCancel={this.handleCancelcorr}
          okText="确定"
          cancelText="取消"
          width="800px"
          className="search-component"
        >
          <div style={{ marginLeft: '10px' }}>
            <Row>
              <Col span={6}><Input onInput={this.handleInputcorr} /></Col>
              <Col span={12}><Button onClick={this.handleClickSearchcorr} style={{ marginLeft: "10px", marginRight: "10px" }}>搜索</Button><Button onClick={this.handleClickQK}>清空</Button></Col>
            </Row>
          </div>
          <Table 
            rowKey={record => record.id}
            rowSelection={rowSelectioncorr} 
            columns={this.state.tableColumnscorr} 
            dataSource={this.state.tableDatacorr} 
            pagination={{ pageSize: 50, total: this.state.tablePagecorr }} 
            scroll={{ y: 350 }} 
            />
        </Modal>
        <Modal
          title="请选择值内容"
          visible={this.state.visibleczr}
          onOk={this.handleOkczr}
          onCancel={this.handleCancelczr}
          okText="确定"
          cancelText="取消"
          width="800px"
          className="search-component"
        >
          <div style={{ marginLeft: '10px' }}>
            <Row>
              <Col span={6}><Input onInput={this.handleInputr} /></Col>
              <Col span={12}><Button onClick={this.handleClickSearchr} style={{ marginLeft: "10px", marginRight: "10px" }}>搜索</Button><Button onClick={this.handleClickQKr}>清空</Button></Col>
            </Row>
          </div>
          <Table rowKey={record => record.id} rowSelection={rowSelectionr} columns={this.state.tableColumnsr} dataSource={this.state.tableDatar} pagination={{ pageSize: 50, total: this.state.tablePageczr }} scroll={{ y: 350 }} />
        </Modal>
        <Modal
          title="请选择值内容"
          visible={this.state.visiblecz}
          onOk={this.handleOkcz}
          onCancel={this.handleCancelcz}
          okText="确定"
          cancelText="取消"
          width="800px"
          className="search-component"
        >
          <div style={{ marginLeft: '10px' }}>
            <Row>
              <Col span={6}><Input onInput={this.handleInput} /></Col>
              <Col span={12}><Button onClick={this.handleClickSearch} style={{ marginLeft: "10px", marginRight: "10px" }}>搜索</Button><Button onClick={this.handleClickQK}>清空</Button></Col>
            </Row>
          </div>
          <Table rowKey={record => record.id} rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.state.tableData} pagination={{ pageSize: 50, total: this.state.tablePagecz }} scroll={{ y: 350 }} />
        </Modal>
      </div>
    )
  }

};

const NewEvent = Form.create()(NewEvents);
export default NewEvent;