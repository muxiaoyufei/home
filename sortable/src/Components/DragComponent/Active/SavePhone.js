import React, { Component } from 'react';
import { Input, DatePicker, Select, Button, Row, Col, Form, Icon, Checkbox, message, Modal, Table } from 'antd';
import { Request } from '../utils/fetch.js';
import { LOOKUP } from '../utils/Api.jsx';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

const { TextArea } = Input;

class SavePhones extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      size: 'large',
      savephone: [],
      // 查找
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
    }
  }
  componentDidMount() {
    this.setState({
      savephone: [
        {
          "left": {
            "fined": "themephone",
            "name": "主题",
            "type": "F",
            "edit": true,
            "required": true,
            "data": [

            ]
          },
          "right": {
            "fined": "namep",
            "name": "名称",
            "type": "F",
            "label": "名称phone",
            "required": false,
            "edit": true
          }

        },
        {
          "left": {
            "fined": "relatedp",
            "name": "相关项",
            "label": "相关项phone",
            "type": "F",
            "required": false,
            "edit": true
          },
          "right": {
            "fined": "messagephone",
            "name": "留言",
            "type": "T",
            "edit": true,
            "required": true
          }
        }
      ]
    })

  }
  handleChange = (value) => {
    this.setState({
      lookupObj: `${value}`,
      czvalue: '',
    })
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": this.state.lookupObj,
      "pageSize": "50",
      "page": "1",
      "keyword": ''
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableData:[],
          tableColumns: []
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
          tableColumns: head
        })
      } 
    });
  }

  // 查找弹出模态框并请求查找数据
  clickShowModal = (id, name) => {
    this.setState({
      visiblecz: true,
      fieldId: id,
      fieldname: name,
    });

    fetch(LOOKUP + "?binding=" + this.props.binding, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "prefix": this.state.lookupObj,
        "pageSize": "50",
        "page": "1",
        "keyword": ''
      })
    }).then((response) => response.json())
      .then((json) => {
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableData: json.data,
          tableColumns: head
        })
      }).catch((err) => {
      });
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
    })
  }
  // 点击搜索是搜索输入的内容
  handleClickSearch = () => {
    fetch(LOOKUP + "?binding=" + this.props.binding, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "prefix": this.state.lookupObj,
        "pageSize": "50",
        "page": "1",
        "keyword": this.state.inputval
      })
    }).then((response) => response.json())
      .then((json) => {
        const head = json.header.map((value, index) => {
          return {
            "title": value.label,
            "dataIndex": value.fieldName,
            "key": value.fieldName
          }
        })
        this.setState({
          tableData: json.data,
          tableColumns: head
        })
      }).catch((err) => {
      });
  }
  // 搜索input输入的内容
  handleInput = (e) => {
    this.setState({
      inputval: e.target.value
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
      "pageSize": "50",
      "page": "1",
      "keyword": ''
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableDatacorr: [],
          tableColumnscorr: []
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
          tableColumnscorr: head
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
      "pageSize": "50",
      "page": "1",
      "keyword": ''
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableDatacorr: [],
          tableColumnscorr: []
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
          tableColumnscorr: head
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
      "pageSize": "50",
      "page": "1",
      "keyword": this.state.inputvalcorr
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableDatacorr: [],
          tableColumnscorr:[]
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
          tableColumnscorr: head
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


  handleClickClear = (data, required, e) => {
    e.preventDefault();
    data.id = document.getElementById('相关项phone').value;
    data.related = document.getElementById('相关项phone').value;
    data.name = document.getElementById('名称phone').value;
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

    if (data.themephone != undefined && data.messagephone != undefined) {
      this.props.handleSubmitjl(data)
      this.props.form.resetFields()
      this.setState({
        czvaluer: '',
        rowselectidr: '',
      })
    }
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

    const data = this.state.savephone.map((item, index) => {
      const ltype = item.left.type
      const rtype = item.right.type
      const Lrequire = item.left.required
      const Rrequire = item.right.required
      var lcont, rcont;

      if (ltype == 'F') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        if (item.left.fined == "relatedp") {
          lcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChangecorrelation} defaultValue='报价单'>
              {options}
            </Select>
            <Input placeholder={item.left.value} style={{ width: '75%' }} id={item.left.fined} />
            <Input style={{ width: '75%' }} id={item.left.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalcorrelation.bind(this, item.left.fined, item.left.label)}>[查找]</a>
          </div>
        } else if (item.left.fined == "namep") {
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
        if (item.right.fined == "relatedp") {
          rcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChangecorrelation} defaultValue='报价单'>
              {options}
            </Select>
            <Input placeholder={item.right.value} style={{ width: '75%' }} id={item.right.fined} />
            <Input style={{ width: '75%' }} id={item.right.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalcorrelation.bind(this, item.right.fined, item.right.label)}>[查找]</a>
          </div>
        } else if (item.right.fined == "namep") {
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
      if (ltype == 'T') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        lcont = <TextArea placeholder={item.left.value} ref="inputs" key={item.left.fined} {...getFieldProps(item.left.fined) } />
      }
      if (rtype == 'T') {
        if (Rrequire) {
          required.push(item.right.fined)
        }
        rcont = <TextArea placeholder={item.right.value} ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined) } />
      }
      return (
        <Row key={index}>
          <Col span={10}>
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
          <Col span={2}></Col>
          <Col span={10} >
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
    const datas = this.state.savephone.map((item, index) => {
      const ltype = item.left.type
      const rtype = item.right.type
      const Lrequire = item.left.required
      const Rrequire = item.right.required
      var lcont, rcont;

      if (ltype == 'F') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        if (item.left.fined == "relatedp") {
          lcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChangecorrelation} defaultValue='报价单'>
              {options}
            </Select>
            <Input placeholder={item.left.value} style={{ width: '75%' }} id={item.left.fined} />
            <Input style={{ width: '75%' }} id={item.left.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalcorrelation.bind(this, item.left.fined, item.left.label)}>[查找]</a>
          </div>
        } else if (item.left.fined == "namep") {
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
        if (item.right.fined == "relatedp") {
          rcont = <div style={{ position: 'relative' }}>
            <Select style={{ width: '25%' }} onChange={this.handleChangecorrelation} defaultValue='报价单'>
              {options}
            </Select>
            <Input placeholder={item.right.value} style={{ width: '75%' }} id={item.right.fined} />
            <Input style={{ width: '75%' }} id={item.right.label} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModalcorrelation.bind(this, item.right.fined, item.right.label)}>[查找]</a>
          </div>
        } else if (item.right.fined == "namep") {
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
      if (ltype == 'T') {
        if (Lrequire) {
          required.push(item.left.fined)
        }
        lcont = <TextArea placeholder={item.left.value} ref="inputs" key={item.left.fined} {...getFieldProps(item.left.fined) } />
      }
      if (rtype == 'T') {
        if (Rrequire) {
          required.push(item.right.fined)
        }
        rcont = <TextArea placeholder={item.right.value} ref="inputs" key={item.right.fined} {...getFieldProps(item.right.fined) } />
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
        <Form onSubmit={this.handleClickClear.bind(this, this.props.form.getFieldsValue(), required)} className="login-form">
          {forsc == 'full' ? data : datas}

          <div className="btn">
            <Button type="primary" htmlType="submit" size={this.state.size}>发送</Button>
          </div>
        </Form>
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
          <Table rowKey={record => record.id} rowSelection={rowSelection} columns={this.state.tableColumns} dataSource={this.state.tableData} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} />
        </Modal>
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
          <Table rowKey={record => record.id} rowSelection={rowSelectioncorr} columns={this.state.tableColumnscorr} dataSource={this.state.tableDatacorr} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} />
        </Modal>
      </div>
    )
  }
};

const SavePhone = Form.create()(SavePhones);
export default SavePhone;