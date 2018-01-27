/**
 * Created by fanpf on 2017/5/23.
 */
import React, { Component } from 'react';
import { Popover, Tabs, Modal, Input, DatePicker, Select, Button, Form, Row, Rate, Col, Icon, Checkbox, message, Table, Tooltip, Affix, Radio, Cascader, InputNumber } from 'antd';
import SimEditor from './SimEditor.js';
import { Request } from '../utils/fetch.js';
import { OBJDETAIL,LOOKUP,LISTS,LEVELDATA,DELETEOBJ,BODY_DETAILSAVE,DEPENDENCYFIELDINFOS } from '../utils/Api.jsx';
import LinkData from './LinkData.css'
import Card from './Card.js';
import moment from 'moment';
const TabPane = Tabs.TabPane;
const InputGroup = Input.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class Lists extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      visible: false,
      loading: false,
      pagination: false,
      sectionLabel: '',
      sectionValue: [],
      systemLabel: '',
      systemValue: [],
      detailedInformation: [],
      listmessage: '',//详细信息保存时提示信息
      newModal: '',
      //查找
      visiblecz: false,//查找
      InputType: "radio",//查找
      czvalue: {},//选择的数据
      inputval: '',//查找是输入的内容
      lookupObj: '',//点击查找是传递过来
      objectApi: '',
      datatitle: '',
      listLayout : [],
      data : [],
      offinfo: false,
    }
  }
  // 相关列表编辑
  showModal = (value, name, id) => {
    var datas = new Object();
    datas.id = id;
    datas.objectApi = name;
    this.setState({
      newModal: datas,
    })
    Request(OBJDETAIL + "?binding=" + this.props.binding, {
      id: id,
      "objectApi": name
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          detailedInformation: []
        })
      }else{
        this.setState({
          detailedInformation: json.data
        })
      } 
    });

    this.setState({
      visible: true,
    });
  }
  showModalnew = (value, id, data) => {
    var datas = new Object();
    datas.id = id;
    datas.name = value.name;
    this.setState({
      newModal: datas,
      datatitle: data.label,
      objectApi: id
    })
    // 直接请求数据
    Request(OBJDETAIL + "?binding=" + this.props.binding, {
      id: "",
      objectApi: id,
      recordtype: '',
      operation: 'new',
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          detailedInformation:[],
          visible: false,
        })
      }else{
        this.setState({
          detailedInformation: json.data,
          visible: true,
        })
      }
    });
  }
  //相关列表新建对象
  handleOkList = (value, info, arr, required, textareaVal, objectApi, e) => {
    e.preventDefault();
    var data = value;
    var datas = []
    //| 地址类型LQ、日期类型DF、复选框B
    for (var key in data) {
      if (data[key] instanceof Array) {
        var dataobj00 = new Object();
        var dataobj11 = new Object();
        var dataobj22 = new Object();
        var dataobj33 = new Object();
        dataobj00.fieldName = key + '00'
        dataobj00.value = data[key][0]
        dataobj11.fieldName = key + '01'
        dataobj11.value = data[key][1]
        dataobj22.fieldName = key + '02'
        dataobj22.value = data[key][2]
        dataobj33.fieldName = key + '03'
        dataobj33.value = data[key][3]
        datas.push(dataobj00)
        datas.push(dataobj11)
        datas.push(dataobj22)
        datas.push(dataobj33)
      } else if (typeof (data[key]) != 'undefined') {
        var dataobj = new Object();
        dataobj.fieldName = key
        dataobj.value = data[key]
        datas.push(dataobj)
      } else {
        var dataobj = new Object();
        dataobj.fieldName = key
        dataobj.value = ""
        datas.push(dataobj)
      }
    }
    //| 单选Y M、多选 MR
    for (var i = 0; i < arr.length; i++) {
      var obj = new Object()
      obj.fieldName = arr[i]
      var str = document.getElementById(arr[i]).value
      var newstr = str.replace(/,/g, ';')
      obj.value = newstr
      datas.push(obj)
    }
    //| 富文本A、文本类型S V N P H E c ct U enc encd
    for (var i = 0; i < textareaVal.length; i++) {
      var textareaobj = new Object();
      if (textareaVal[i] == 'name') {
        textareaobj.fieldName = textareaVal[i]
        textareaobj.value = document.getElementById('zmidl').value
      } else {
        textareaobj.fieldName = textareaVal[i]
        textareaobj.value = document.getElementById(textareaVal[i]).value
      }
      datas.push(textareaobj)
    }
    var obj = new Object()
    obj.id = ""
    obj.objectApi = objectApi
    obj.data = datas
    var newdata = obj
    //| 检查必填项是否填写内容
    for (var i = 0; i < required.length; i++) {
      for (var j = 0; j < datas.length; j++) {
        if (required[i].name === datas[j].fieldName) {
          if (datas[j].value == '') {
            var message = '请输入 ' + required[i].label + ' 的值'
            this.setState({
              listmessage: message,
              offinfo: false
            })
          } else {
            this.setState({
              listmessage: '',
              offinfo: false
            })
          }
        }
      }
    }
    for (var j = 0; j < datas.length; j++) {
      if (required[required.length - 1].name === datas[j].fieldName && datas[j].value != '') {
        Request(BODY_DETAILSAVE + "?binding=" + this.props.binding, newdata).then((json) => {
          if (json.flag == "SUCCESS") {
            message.success(json.message, 8);
            this.setState({
              offinfo: true
            })
            // 相关列表布局
            Request(LISTS + "?binding=" + this.props.binding, {
              "id": this.props.id,
            }).then((json) => {
              if(json.flag=="ERROR"){
                this.setState({
                  listLayout: []
                })
              }else{
                const listLayout = json.data
                var data = listLayout.map((value, index) => {
                  this.pretreatmentListTab(value)
                  var datebtn = value.button
                  var lbiao = {
                    "name": "list",
                    "label": "列表",
                    "url": ""
                  }
                  datebtn.push(lbiao)
                  return (value)
                })
                this.setState({
                  listLayout: data
                })
              }
            });
          } else {
            message.error(json.message, 8);
            this.setState({
              offinfo: true
            })
          }
        });
      }
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // 查找弹出模态框并请求查找数据
  clickShowModal = (type, lookupObj, fieldId, name) => {
    this.setState({
      visiblecz: true,
      lookupObj: lookupObj,
      fieldId: fieldId,
      fieldname: name,
    });
    if (type == "Y" || type == "M") {
      this.setState({
        InputType: "radio",
      });
    }
    if (type == "MR") {
      this.setState({
        InputType: "",
      });
    }
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": lookupObj,
      "pageSize": "50",
      "page": "1",
      "keyword": ''
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableData: [],
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
    var fieldId = this.state.fieldId;
    var fieldname = this.state.fieldname;
    document.getElementById(fieldId).value = ''
    document.getElementById(fieldname).value = ''
    this.setState({
      visiblecz: false,//关闭模态框（可选为不关闭）
    })
  }
  // 点击搜索是搜索输入的内容
  handleClickSearch = () => {
    Request(LOOKUP + "?binding=" + this.props.binding, {
      "prefix": this.state.lookupObj,
      "pageSize": "50",
      "page": "1",
      "keyword": this.state.inputval
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          tableData: [],
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
  // 搜索input输入的内容
  handleInput = (e) => {
    this.setState({
      inputval: e.target.value
    })
  }
  render() {
    const { loading } = this.state;
    var arr = [];
    var textareaVal = [];
    var required = [];
    const radioStyle = {
      display: 'block',
      fontSize: '15px',
      height: '30px',
      lineHeight: '30px',
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
        this.setState({
          czvalue: rowselect,
          holder: rowselect,//更改所有人
          rowselectid: rowselectid,//更改所有人id
        })
        document.getElementById(fieldId).value = rowselect
        document.getElementById(fieldname).value = rowselectid
      },
    };
    const { getFieldProps } = this.props.form;
    const listLayout = this.state.listLayout.map((value, index) => {
      var values = value.objectApi
      // 操作按钮
      var datebtn = value.button
      var listbtn = datebtn.map((items, index) => {
        const content = (
          <div>
            <p><a href="javascript:void(0)" onClick={this.handleList.bind(this, values)}><Icon type="bars" style={{ fontSize: 14, color: '#08c' }} />  列表 {items.label == "列表" ? <Icon type="check" style={{ fontSize: 14, color: '#08c' }} /> : ''}</a></p>
            <p><a href="javascript:void(0)" onClick={this.handleCard.bind(this, values)}><Icon type="appstore-o" style={{ fontSize: 13, color: '#08c' }} />  卡片 {items.label == "卡片" ? <Icon type="check" style={{ fontSize: 14, color: '#08c' }} /> : ''}</a></p>
          </div>
        );
        if (items.label != "列表" && items.label != "卡片") {
          return (
            <Radio.Button style={{ 'marginLeft': 10 }} value={items.label} key={index} onClick={this.showModalnew.bind(this, items, value.objectApi, value)}>{items.label}</Radio.Button>
          )
        }
        if (items.label == "列表" || items.label == "卡片") {
          return (
            <Popover placement="bottom" content={content} key={index} style={{}} >
              <Icon type="setting" style={{ height: '28px', fontSize: 16, color: '#08c', 'marginLeft': 10, cursor: 'pointer' }} />
            </Popover>
          )
        }
      })
      var column = []
      var titleData = value.fieldInfo
      // 获取column的标头数组
      titleData.map((item, index) => {
        if (item.fieldName == "operate") {
          /**
          |--------------------------------------------------
          | @2017/12/19 zhouqm 新增fieldInfo表头operate字段 HTML字符串转html
          |--------------------------------------------------
          */
          var items = {
            title: item.fieldLabel,
            dataIndex: item.fieldName,
            render: (html) => <div dangerouslySetInnerHTML={html}></div>,
          }
          column.push(items)
        } else {
          var items = {
            title: item.fieldLabel,
            dataIndex: item.fieldName,
          }
          column.push(items)
        }
      })
      var data;
      var datas = value.dataList
      if (datas == '') {
        column = []
      }
      datas.map((item, index) => {
        var bj = <a href="javascript:void(0)" onClick={this.showModal.bind(this, item, item.operation, value.id)}>{item.operation}</a>
        item.operation = bj
        if (item.istask == '0') {
          var istask = <Checkbox disabled ></Checkbox>
          item.istask = istask
        }
        if (item.istask == '1') {
          var istask = <Checkbox defaultChecked disabled ></Checkbox>
          item.istask = istask
        }
      })
      if (datas.length > 10) {
        data = datas.slice(0, 10)
      } else {
        data = datas
      }
      // 渲染列表标题
      var lengths = datebtn.length - 1
      if (datebtn.length > 0 && JSON.stringify(datebtn[lengths]) != "{}") {
        if (datebtn[lengths].label == '卡片') {
          return (
            <div className="list-title" key={index}>
              <Col span={8}>
                <div className="title">
                  <span className="grap"><i className="icon-user"></i></span>
                  <h4>{value.label}(<span>{datas.length}</span>)</h4>
                </div>
              </Col>
              <Col span={16} style={{ textAlign: "right", position: 'relative', zIndex: '1' }} key={index}>
                {listbtn}
              </Col>
              <Row>
                <Card data={value} onClicks={this.showModal} onClickDel={this.onClickDel.bind(this)} />
              </Row>
              {datas.length > 6 ? <a href={value.morerecordsurl} style={{ "float": "right", fontSize: '12px', paddingTop: '10px' }}>查看更多</a> : ''}
            </div>
          )
        } else {
          return (
            <div className="list-title" key={index}>
              <Col span={8}>
                <div className="title">
                  <span className="grap"><i className="icon-user"></i></span>
                  <h4>{value.label}(<span>{datas.length}</span>)</h4>
                </div>
              </Col>
              <Col span={16} style={{ textAlign: "right", position: 'relative', zIndex: '1' }} key={index}>
                {listbtn}
              </Col>
              <Table 
                columns={column} 
                dataSource={data} 
                size='small' 
                checked={this.state.pagination} 
              />
              {datas.length > 10 ? <a href={value.morerecordsurl} style={{ "float": "right", fontSize: '12px', paddingTop: '10px' }}>查看更多</a> : ''}
            </div>
          )
        }
      } else {
        return (
          <div className="list-title" key={index}>
            <Col span={8}>
              <div className="title">
                <span className="grap"><i className="icon-user"></i></span>
                <h4>{value.label}(<span>{datas.length}</span>)</h4>
              </div>
            </Col>
            <Col span={16} style={{ textAlign: "right", position: 'relative', zIndex: '1' }} key={index}>
              {listbtn}
            </Col>
            <Table 
              columns={column} 
              dataSource={data} 
              size='small' 
              checked={this.state.pagination} 
            />
            {datas.length > 10 ? <a href={value.morerecordsurl} style={{ "float": "right", fontSize: '12px', paddingTop: '10px' }}>查看更多</a> : ''}
          </div>
        )
      }

    })
    const detailedInformation = this.state.detailedInformation.map((items, index) => {
      const basic_info_edit = items.data.map((item, index) => {
        const itle = item.left.edit
        const ltype = item.left.type
        const itre = item.right.edit
        const rtype = item.right.type
        var lcont, rcont, lconts, rconts;

        if (ltype == 'S' || ltype == 'V' || ltype == 'N' || ltype == 'P' || ltype == 'H' || ltype == 'E' || ltype == 'c' || ltype == 'ct' || ltype == 'U' || ltype == 'enc' || ltype == 'encd') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (itle == true) {
            textareaVal.push(item.left.name)
          }
          var infoid;
          if (item.left.name == 'name') {
            infoid = 'zmidl'
          } else {
            infoid = item.left.name
          }
          lcont = <div style={{ position: 'relative' }}>
            <Input defaultValue={item.left.value} key={item.left.name} id={infoid} />
          </div>
        }
        if (rtype == 'S' || rtype == 'V' || rtype == 'N' || rtype == 'P' || rtype == 'H' || rtype == 'E' || rtype == 'c' || rtype == 'ct' || rtype == 'U' || rtype == 'enc' || rtype == 'encd') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (itre == true) {
            textareaVal.push(item.right.name)
          }
          var infoid;
          if (item.right.name == 'name') {
            infoid = 'zmidl'
          } else {
            infoid = item.right.name
          }
          rcont = <div style={{ position: 'relative' }}>
            <Input defaultValue={item.right.value} key={item.right.name} id={infoid} />
          </div>
        }
        if (ltype == 'L' || ltype == 'Q') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          var select;
          /**
          |--------------------------------------------------
          | isControlField为true是控制字段，false不是控制字段
          |--------------------------------------------------
          */
          if (item.left.isControlField == true) {
            select = this.handleOnblurfind.bind(this, item.left.fieldId)
          } else {
            select = this.handleonselect
          }
          var itemsl;
          itemsl = item.left.value
          var data = item.left.data.map((items, index) => {
            return (
              <Option value={items.id} key={index} >{items.value}</Option>
            )
          })
          lcont = <InputGroup compact className="sel">
            <Select style={{ width: '100%' }} placeholder={itemsl} onSelect={select} {...getFieldProps(item.left.name) }>
              {data}
            </Select>
          </InputGroup>
        }
        if (rtype == 'L' || rtype == 'Q') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (item.right.isControlField == true) {
            select = this.handleOnblurfind.bind(this, item.right.fieldId)
          } else {
            select = this.handleonselect
          }
          var itemsr;
          itemsr = item.right.value
          var data = item.right.data.map((items, index) => {
            return (
              <Option value={items.id} key={index} >{items.value}</Option>
            )
          })
          rcont = <InputGroup compact className="sel">
            <Select style={{ width: '100%' }} placeholder={itemsr} onSelect={select} {...getFieldProps(item.right.name) }>
              {data}
            </Select>
          </InputGroup>
        }
        if (ltype == 'D' || ltype == 'F') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          const dateFormat = 'YYYY/MM/DD';
          lcont = <InputGroup compact>
            <DatePicker style={{ width: '100%' }} defaultValue={moment(item.left.value, dateFormat)} format={dateFormat} key={item.left.name} {...getFieldProps(item.left.name) } />
          </InputGroup>
        }
        if (rtype == 'D' || rtype == 'F') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          const dateFormat = 'YYYY/MM/DD';
          rcont = <InputGroup compact>
            <DatePicker style={{ width: '100%' }} defaultValue={moment(item.right.value, dateFormat)} format={dateFormat} key={item.right.name} {...getFieldProps(item.right.name) } />
          </InputGroup>
        }
        if (ltype == 'B') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (item.left.value) {
            lcont = <Checkbox defaultChecked style={{ float: 'left' }} key={item.left.name}  {...getFieldProps(item.left.name) }></Checkbox>
          } else {
            lcont = <Checkbox style={{ float: 'left' }} key={item.left.name} {...getFieldProps(item.left.name) }></Checkbox>
          }
        }
        if (rtype == 'B') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (item.right.value) {
            rcont = <Checkbox defaultChecked style={{ float: 'left' }} key={item.right.name} {...getFieldProps(item.right.name) }></Checkbox>
          } else {
            rcont = <Checkbox style={{ float: 'left' }} key={item.right.name} {...getFieldProps(item.right.name) }></Checkbox>
          }
        }
        if (ltype == 'SCORE') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          // textareaVal.push(item.left.name)
          lcont = <Rate count='10' style={{ fontSize: 12 }} defaultValue={Number(item.left.value)} {...getFieldProps(item.left.name) } />
        }
        if (rtype == 'SCORE') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          // textareaVal.push(item.right.name)
          rcont = <Rate count='10' style={{ fontSize: 12 }} defaultValue={Number(item.right.value)} {...getFieldProps(item.right.name) } />
        }
        if (ltype == 'AD') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          var data = item.left.children
          var items, itemsval;
          var itemval = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].type == 'L') {
              itemval.push(data[i].value)
            }
            if (data[i].type == 'S') {
              items = data[i].name
              itemsval = data[i].value
            }
          }
          textareaVal.push(items)
          lcont = <div>
            <Cascader style={{ textAlign: 'left' }} defaultValue={itemval} options={this.props.ldsj} {...getFieldProps(item.left.name) } />
            <br />
            <Input defaultValue={itemsval} id={items} />
          </div>
        }
        if (rtype == 'AD') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          var data = item.right.children
          var items, itemsval;
          var itemval = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].type == 'L') {
              itemval.push(data[i].value)
            }
            if (data[i].type == 'S') {
              items = data[i].name
              itemsval = data[i].value
            }
          }
          textareaVal.push(items)
          rcont = <div>
            <Cascader style={{ textAlign: 'left' }} defaultValue={itemval} options={this.props.ldsj} {...getFieldProps(item.right.name) } />
            <br /><Input defaultValue={itemsval} id={items} />
          </div>
        }
        if (ltype == 'X') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          textareaVal.push(item.left.name)
          lcont = <TextArea defaultValue={item.left.value} ref="inputs" key={item.left.name} id={item.left.name} />
        }
        if (rtype == 'X') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          textareaVal.push(item.right.name)
          rcont = <TextArea defaultValue={item.right.value} ref="inputs" key={item.right.name} id={item.right.name} />
        }
        if (ltype == 'A') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (itle) {
            textareaVal.push(item.left.name)
          }
          // lcont = <SimEditor textareaID={item.left.name} value={item.left.value} />
        }
        if (rtype == 'A') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (itre) {
            textareaVal.push(item.right.name)
          }
          // lcont = <SimEditor textareaID={item.right.name} value={item.right.value} />
        }
        if (ltype == 'Y' || ltype == 'M') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (item.left.edit == true) {
            var fieldName = item.left.name
            arr.push(fieldName)
          }

          lcont = <div style={{ position: 'relative' }}>
            <Input defaultValue={item.left.value} id={item.left.fieldId} />
            <Input type={item.left.name} id={item.left.name} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, ltype, item.left.lookupObj, item.left.fieldId, item.left.name)}>[查找]</a>
          </div>
        }
        if (rtype == 'Y' || rtype == 'M') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (item.right.edit == true) {
            var fieldName = item.right.name
            arr.push(fieldName)
          }
          rcont = <div style={{ position: 'relative' }}>
            <Input defaultValue={item.right.value} id={item.right.fieldId} key={item.right.name} />
            <Input type={item.right.name} id={item.right.name} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, rtype, item.right.lookupObj, item.right.fieldId, item.right.name)} >[查找]</a>
          </div>
        }
        if (ltype == 'MR') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          if (item.left.edit == true) {
            var fieldName = item.left.name
            arr.push(fieldName)
          }
          lcont = <div style={{ position: 'relative' }}>
            <Input id={item.left.fieldId} key={item.left.name} />
            <Input type={item.left.name} id={item.left.name} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, ltype, item.left.lookupObj, item.left.fieldId, item.left.name)} >[查找多选]</a>
          </div>
        }
        if (rtype == 'MR') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          if (item.right.edit == true) {
            var fieldName = item.right.name
            arr.push(fieldName)
          }
          rcont = <div style={{ position: 'relative' }}>
            <Input id={item.right.fieldId} key={item.right.name} />
            <Input type={item.right.name} id={item.right.name} style={{ display: 'none' }} />
            <a style={{ position: 'absolute', right: '5px', top: '0px' }} onClick={this.clickShowModal.bind(this, rtype, item.right.lookupObj, item.right.fieldId, item.right.name)} >[查找多选]</a>
          </div>
        }
        if (ltype == 'LT') {
          var obj = new Object()
          if (item.left.required == true) {
            obj.name = item.left.name
            obj.label = item.left.label
            required.push(obj)
          }
          var data = item.left.children
          textareaVal.push(data[0].name)
          textareaVal.push(data[1].name)
          lcont = <div style={{ paddingTop: '10px' }}>
            <Input style={{ width: "45%", float: "left", marginRight: '5%' }} defaultValue={data[0].value} ref="inputs" id={data[0].name} />
            <Input style={{ width: "45%", float: "left" }} defaultValue={data[1].value} ref="inputs" id={data[1].name} />
          </div>
        }
        if (rtype == 'LT') {
          var obj = new Object()
          if (item.right.required == true) {
            obj.name = item.right.name
            obj.label = item.right.label
            required.push(obj)
          }
          var data = item.right.children
          textareaVal.push(data[0].name)
          textareaVal.push(data[1].name)
          rcont = <div>
            <Input style={{ width: "45%", float: "left", marginRight: '5%' }} defaultValue={data[0].value} ref="inputs" id={data[0].name} />
            <Input style={{ width: "45%", float: "left" }} defaultValue={data[1].value} ref="inputs" id={data[1].name} />
          </div>
        }

        if (ltype == 'A') {
          let html = { __html: item.left.value }
          lconts = <div dangerouslySetInnerHTML={html} ></div>
        } else if (ltype == 'B') {
          lconts = <Checkbox checked={item.left.value} ></Checkbox>
        } else if (ltype == 'SCORE') {
          lconts = <Rate count='10' style={{ fontSize: 12 }} disabled defaultValue={item.left.value} />
        } else if (ltype == 'Y' || ltype == 'M') {
          if (item.left.name == "ownerid") {
            lconts = <span>{item.left.value} </span>
          } else if (item.left.name == "recordtype") {
            var leftval;
            for (var i = 0; i < item.left.data.length; i++) {
              if (item.left.value == item.left.data[i].id) {
                leftval = item.left.data[i].value
              }
            }
            lconts = <span>{leftval}  </span>
          } else {
            lconts = <span>{item.left.value} </span>
          }
        } else {
          lconts = <span>{item.left.value}</span>
        }
        if (rtype == 'A') {
          let html = { __html: item.right.value }
          rconts = <div dangerouslySetInnerHTML={html} ></div>
        } else if (rtype == 'B') {
          rconts = <Checkbox checked={item.right.value} ></Checkbox>
        } else if (rtype == 'SCORE') {
          rconts = <Rate count='10' style={{ fontSize: 12 }} disabled defaultValue={item.right.value} />
        } else if (rtype == 'Y' || rtype == 'M') {
          if (item.right.name == "ownerid") {
            rconts = <span>{item.right.value} </span>
          } else if (item.right.name == "recordtype") {
            var rightval;
            for (var i = 0; i < item.right.data.length; i++) {
              if (item.right.value == item.right.data[i].id) {
                rightval = item.right.data[i].value
              }
            }
            rconts = <span>{rightval} </span>
          } else {
            rconts = <span>{item.right.value} </span>
          }
        } else {
          rconts = <span>{item.right.value}</span>
        }

        var classname1, classname2, numbers, numberss;
        if (item.left.type == 'A') {
          classname1 = "main mainsA"
          classname2 = "boxA"
          numbers = 12
          numberss = 12
        } else if (item.right.name == undefined) {
          classname1 = "main mains"
          classname2 = "box100"
          numbers = 24
          numberss = 0
        } else {
          classname1 = "main mains"
          classname2 = "box"
          numbers = 12
          numberss = 12
        }

        return (
          <Row key={index}>
            <Col span={numbers}>
              <FormItem >
                {
                  <div className={classname2}>
                    <div className="sub">
                      {item.left.required ? <Icon type="star" className="iconReqire" /> : ''}<span>{item.left.label}</span>
                    </div>
                    <div className={classname1}>
                      {itle ? lcont : lconts}
                    </div>
                  </div>
                }
              </FormItem>
            </Col>
            <Col span={numberss} style={{ textAlign: '-webkit-right' }}>
              <FormItem>
                {
                  <div className="box">
                    <div className="sub">
                      {item.right.required ? <Icon type="star" className="iconReqire" /> : ''}<span>{item.right.label}</span>
                    </div>
                    <div className="main mains">
                      {itre ? rcont : rconts}
                    </div>
                  </div>
                }
              </FormItem>
            </Col>
          </Row>
        )
      })
      return (
        <div className="base-info">
          <a href="javascript:void(0)" className="title"><i className="icon-sort-down"></i>{items.title}</a>
          {basic_info_edit}
        </div>
      )
    })
    var display;
    if (this.state.listmessage != "") {
      display = 'block'
    } else {
      display = 'none'
    }
    var datatitle = "新建 " + this.state.datatitle
    return (
      <div className="objectList">
        {listLayout}
        {/*编辑模态框  */}
        <Modal className="Lant-modal Lant-modals"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          title={datatitle}
        >
          <div style={{ display: display, position: 'absolute', left: '25%', width: '50%', top: '10px', background: 'red', color: '#fff', fontSize: '16px', padding: '6px', borderRadius: '5px', zIndex: '1' }}>
            <Icon type="exclamation-circle" style={{ fontSize: 16, color: '#fff' }} />  {this.state.listmessage}
          </div>
          <Form onSubmit={this.handleOkList.bind(this, this.props.form.getFieldsValue(), this.state.detailedInformation, arr, required, textareaVal, this.state.objectApi)}>
            {detailedInformation}
            <div className="base-info" style={{ height: '45px' }}></div>
            <div className="base_btn" >
              <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>
              <Button key="submit" type="primary" htmlType="submit" size="large" loading={loading} onClick={this.handleOk}>
                确认
                </Button>
            </div>
          </Form>
        </Modal>
        {/*查找类型模态框  */}
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
              <Col span={0.5}></Col>
              <Col span={12}><Button onClick={this.handleClickSearch}>搜索</Button>&nbsp;&nbsp;<Button onClick={this.handleClickQK}>清空</Button></Col>
            </Row>
          </div>
          <Table 
            rowSelection={rowSelection} 
            columns={this.state.tableColumns} 
            dataSource={this.state.tableData} 
            pagination={{ pageSize: 50 }} 
            scroll={{ y: 350 }} 
          />
        </Modal>
      </div>
    )
  }

  componentDidMount() {
    // 相关列表布局
    Request(LISTS + "?binding=" + this.props.binding, {
      "id": this.props.id,
    }).then((json) => {
      if(json.flag=="ERROR"){
        this.setState({
          listLayout:[]
        })
      }else{
        var data = json.data.map((value, index) => {
          this.pretreatmentListTab(value)
          var datebtn = value.button
          var lbiao = {
            "name": "list",
            "label": "列表",
            "url": ""
          }
          datebtn.push(lbiao)
          return (value)
        })
        this.setState({
          listLayout: data
        })
      }  
    });

    // 获取联动数据
    Request( LEVELDATA + "?binding=" + this.props.binding, {
    }).then((json) => {
      this.setState({
        data: json.data
      })
    });
  }

  handleOk = () => {
    setTimeout(() => {
      if (this.props.offinfo) {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false })
        }, 500);
      }
    }, 800);
  }

  // 相关列表操作
  /**
   * 切换成列表
   */
  handleList = (values, e) => {
    const data = this.state.listLayout.map((item, index) => {
      if (item.objectApi != values) {
        return (item)
      } else {
        item.button[item.button.length - 1].label = '列表'
        return (item)
      }
    })
    this.setState({
      listLayout: data
    })
  }

  /**
   * 切换成卡片
   */
  handleCard = (values, e) => {
    const data = this.state.listLayout.map((item, index) => {
      if (item.objectApi != values) {
        return (item)
      } else {
        item.button[item.button.length - 1].label = '卡片'
        return (item)
      }
    })
    this.setState({
      listLayout: data
    })
  }

  // 全局按钮新建编辑
  // 编辑详细信息字段依赖
  handleOnblurfind = (controlFieldId, controlValueId) => {
    Request(DEPENDENCYFIELDINFOS + "?binding=" + this.props.binding, {
      "recordtype": this.state.currentRecordtype,
      "controlFieldId": controlFieldId,
      "controlValueId": controlValueId,
    }).then((json) => {
      var detailedInformation = this.state.detailedInformation
      detailedInformation.map((items, index1) => {
        items.data.map((item, index2) => {
          for (var i = 0; i < json.dependencyFields.length; i++) {
            if (json.dependencyFields[i].fieldId == item.left.fieldId) {
              detailedInformation[index1].data[index2].left.data = json.dependencyFields[i].dependencyValues
              detailedInformation[index1].data[index2].left.value = json.dependencyFields[i].value
            }
            if (json.dependencyFields[i].fieldId == item.right.fieldId) {
              detailedInformation[index1].data[index2].right.data = json.dependencyFields[i].dependencyValues
              detailedInformation[index1].data[index2].right.value = json.dependencyFields[i].value
            }
          }
        })
      })
      this.setState({
        detailedInformation: detailedInformation
      })
    });
  }

  /**
  |--------------------------------------------------
  | @method 相关列表对象删除
  |--------------------------------------------------
  */
  onClickDel = (value, objectApi, id, e) => {
    const listid = value.id
    Request(DELETEOBJ + "?binding=" + this.props.binding, {
      objectApi: objectApi,
      data: [{
        id: id,
      }]
    }).then((json) => {
      console.log("相关列表对象>>>",json)
      if (json.flag == "SUCCESS") {
        message.success(json.message, 8);
        // 更新数据
        Request(LISTS + "?binding=" + this.props.binding, {
          "id": this.props.id,
        }).then((json) => {
          if(json.flag=="ERROR"){
            this.setState({
              listLayout: []
            })
          }else{
            var data = json.data.map((value, index) => {
              this.pretreatmentListTab(value)
              var datebtn = value.button
              var lbiao = {
                "name": "list",
                "label": "列表",
                "url": ""
              }
              datebtn.push(lbiao)
              return (value)
            })
            this.setState({
              listLayout: data
            })
          }  
        });
      } else {
        message.error(json.message, 8);
      }
    });
  }

  /**
  |--------------------------------------------------
  | @2017/12/19 zhouqm  相关列表预处理pretreatmentListTab
  | fieldType == "Y"类型 fieldName加上ccname
  | fieldName == operate 时 value为html字符串需要转为HTML
  |--------------------------------------------------
  */
  pretreatmentListTab = (value) => {
    value.fieldInfo.map((items, index) => {
      if (items.fieldType == "Y") {
        items.fieldName = items.fieldName + "ccname"
      } else {
        items.fieldName = items.fieldName
      }
    })
    var arr = [];
    value.dataList.map((item, index) => {
      for (var key in item) {
        if (key == "operate") {
          item[key] = { __html: item[key] }
        } else {
          item[key] = item[key]
        }
      }
    })
    return value;
  }

};
const List = Form.create()(Lists);
export default List;